// Compatibility with previous tptelements iterations
module.exports = function(router) {

  // Creates a redirect between a and b.
  // Validate the routes yourself!
  function redirectify(a, b) {
    router.get(a, function(req, res) {
      res.redirect(b);
    });
  }
  
  redirectify('/OPS-reference.html', '/reference/save-format.html');
  redirectify('/lua-reference.html', '/reference/lua-reference.html');
  redirectify('/experiments/ops_viewer', '/tools/save-viewer');
  redirectify('/data/*', '/reference/entries/*');
};