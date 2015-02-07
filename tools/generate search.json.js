// Old generator for JSON search data. 
// Uses a weird file format I made up for entries.

// file format:
//    NAME <function signature> \r\n
//    DESCRIPTION <function description> \r\n 
//    LINK #anchor-to-lua-reference.html \r\n 
//    DETAILS \r\n
//    <markdown text for details until end of file>

// usage: node generatesearchjson.js <path to lua script entry directory>

var fs = require('fs')
  , md = require('markdown').markdown
  , path = require('path')
  // regexes
  , namerx = /^NAME (.+)\s*$/
  , descrx = /^DESCRIPTION (.+)\s*$/
  , linkrx = /^LINK (.+)\s*$/
  , commentrx = /^#/
  , entryrx = /\.entry$/i

  , entries = {stuff: []};

// parse .entry files to objects

var parsetoobj = function (file) {
  var data = fs.readFileSync(file, 'UTF8').replace('\r', '').split('\n');
  
  var obj = {};
  // console.log(data);

  // parse the first few lines
  for (var i=0;i<data.length;i++) {

    // # comments
    if (commentrx.test(data[i])) 
      continue; 

    // NAME nil tpt.test () 
    if (namerx.test(data[i])) {
      obj.name = data[i].match(namerx)[1];
      obj.shortname = obj.name.match(/^(.+?) (.+?) /)[2];
    }

    // DESCRIPTION A test function. Doesn't really do anything.
    else if (descrx.test(data[i])) {
      obj.description = data[i].match(descrx)[1];
    }

    // LINK #tpt.test
    else if (linkrx.test(data[i])) {
      obj.link = data[i].match(linkrx)[1];
    }
  }
  // details could be a bit too long o.o
  // obj.details = md.toHTML(data.slice(i+1).join('\n'));
  entries.stuff.push(obj);
  // console.log(obj);

  fs.writeFile(path.join(directory, obj.shortname + '.html'),
             md.toHTML(data.slice(i+1).join('\n')));
};

// entry point
if (!process.argv[2] || process.argv[2] == '--help') {
  console.log('entry file -> JSON processor\nfile format:\nNAME <function signature>\\r\\n\nDESCRIPTION <function description\\r\\n\nLINK #anchor-to-lua-reference.html\\r\\n\nDETAILS\\r\\nmarkdown text for details until end of file\nusage: ' + process.argv[1] + ' <path to lua script entry files>');
  process.exit(0);
}

// inb5 race conditions
if (!fs.existsSync(process.argv[2])) {
  console.log('directory ' + process.argv[2] + ' does not exist! see --help for help.');
}

var directory = path.resolve(process.argv[2]);
fs.readdirSync(directory).map(function(each) {
  if (entryrx.test(each)) {
    parsetoobj( path.join(directory, each) );
  }
});

process.stdout.write(JSON.stringify(entries));