var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function(router, config) {
  'use strict';

  var editors = config.editors || [];

  var editor_dir = config.editor_dir.replace('!', '..');
  console.log('setting up editor with root directory', 
    path.resolve(editor_dir));

  if (editors.length == 0) 
    return -1;

  router.get('/editor', function(req, res) {
    res.redirect('/editor/' + editors[0]);
  });

  router.get('/editor/:language', function(req, res) {

    if (editors.indexOf(req.params.language) === -1)
      return res.redirect('/editor');

    fs.readFile( path.join(__dirname, 
      editor_dir, 
      req.params.language),
    function(err, data) {
      if (err) {
        return res.render('error', {
          error: err, 
          message: "Error reading editor template, which exists though!"
        });
      }

      // C / C++ use "c_cpp" as the ace mode
      if (req.params.language !== 'lua') 
        req.params.language = 'c_cpp';

      return res.render('editor', {
        language: req.params.language,
        template: data
      });
    });
  });
};