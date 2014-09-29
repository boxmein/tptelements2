var fs = require('fs');
var path = require('path');

module.exports = function(router, config) {

  var refs = config.references || [];
  var refs_dir = config.reference_dir.replace('!', '.');
  var absolute_rd = path.resolve(refs_dir);

  console.log('setting up references with root directory', 
    absolute_rd);

  var sendfileopts = {
    "root": absolute_rd
  };

  if (refs.length == 0) 
    return -1;

  router.get('/reference', function(req, res) {
    res.redirect('/reference/' + refs[0]);
  });

  router.get('/reference/:type', function(req, res) {
    
    if (refs.indexOf(req.params.type) === -1) 
      return res.redirect('/reference');

    // if we're dealing with a .html file, send it whole without templates
    if (req.params.type.indexOf('.html') !== -1)
      return res.sendFile(req.params.type, 
        sendfileopts);


    fs.readFile(path.join(absolute_rd, req.params.type), 
      function(err, data) {
        if (err) {
          return res.render('error', {
            error: err, 
            message: "Error reading reference, but the reference exists!"
          });
        }
      });
  });
};