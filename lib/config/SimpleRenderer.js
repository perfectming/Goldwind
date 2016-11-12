var fs = require("fs");
var path = require("path");
var minify = require('html-minifier').minify;

function SimpleRenderer(options, fileName) {
  var templatePath = "../app/" + (fileName === 'react' ? 'index' : 'simple') + ".html";
  
  var html = fs.readFileSync(path.resolve(__dirname, templatePath), "utf-8")
    .replace("SCRIPT_URL", options.scriptUrl)
    .replace("STYLE_URL", options.styleUrl)
    .replace("COMMON_URL", options.commonsUrl);
  this.html = minify(html, {
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true
  });
}

SimpleRenderer.prototype.render = function (callback) {
  callback(null, this.html);
};

module.exports = SimpleRenderer;
