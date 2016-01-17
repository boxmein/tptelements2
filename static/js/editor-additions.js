var startup = function($, ace){
  'use strict';
  
  var language = location.hash.toLowerCase().slice(1);
  var editor_language =  language || 'c_cpp';

  if (language === 'c++' || language === 'c') 
    editor_language = 'c_cpp';

  var editor = ace.edit('editor');

  fetch_template(language, editor); 
  
  editor.setTheme('ace/theme/mysolarized');
  editor.getSession().setMode('ace/mode/' + editor_language);
  
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

var fetch_template = function(lang, editor) {
  var xhr = new XMLHttpRequest();
  
  console.log("fetching editor template for language", lang);
  
  xhr.open("GET", "editors/" + lang);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      editor.setValue(xhr.responseText, -1);
    } else if (xhr.readyState == 4 && xhr.status !== 200) {
      console.error("failed to fetch editor template: ", xhr);
    }
  };

  xhr.send();
};
