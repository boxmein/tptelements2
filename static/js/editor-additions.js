var startup = function($, ace, language){
  'use strict';
  
  var editor = ace.edit('editor');
  
  editor.setTheme('ace/theme/mysolarized');
  editor.getSession().setMode('ace/mode/' + language);
  
  editor.setOptions({
    maxLines: 10000
  });

  editor.resize();
  editor.focus();

  var $aside = $('#aside');

  // aside-bar is click-to-hide
  // still shows when necessary though.
  $aside.click(function() { 
    $aside.fadeOut(500)
          .addClass('hidden'); 
  });
};
