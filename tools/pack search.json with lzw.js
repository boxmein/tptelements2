// Turns JSON into a compressed LZW file
// ...strips indenting and then LZW compresses and outputs to stdout.
// usage: node jsonpack.js <json file>
// 


// LZW-compress a string
function lzw_encode(s) {
  var dict = {};
  var data = (s + "").split("");
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i=1; i<data.length; i++) {
    currChar=data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    }
    else {
      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase=currChar;
    }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i=0; i<out.length; i++) {
    out[i] = String.fromCharCode(out[i]);
  }
  return out.join("");
}

var fs = require('fs');

process.stdout.write(
  lzw_encode(
    JSON.stringify(
      JSON.parse(fs.readFileSync(process.argv[2]))
    )
  )
);