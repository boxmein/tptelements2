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

  // Double click on a thing to display info about it.
  $('#editor').on('keypress', function(evt) {
    if (!(evt.ctrlKey && evt.charCode === 32)) return; 

    evt.preventDefault(); 
    
    var kw = editor.getCopyText();

    // Trim string
    kw.replace(/(^\s+|\s+$)/, '');

    // basic crap filter!
    if (kw && kw.length > 4) {
      $.getJSON('/describe/'+kw).then(
      function(success) {
        // What the hell do I do with the description
        // tooltips are *hard*
        $aside
          .removeClass('hidden')
          .fadeIn(500)
          // 10/10 best HTML templating ever
          .html('<a href="'+success.link+'"><h1>'+success.keyword+
                '</h1></a><p>'+success.description+'</p>');
      }, 
      function(failure) { 
        console.err(failure); 
      });
    }
  });

};
