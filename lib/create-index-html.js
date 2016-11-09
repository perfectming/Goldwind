var Renderer = require("../config/SimpleRenderer.js");
var fs = require('fs');
var path = require('path');
var stats = require("../build/prod/stats.json");
var mkdirp = require('mkdirp');

var publicPath = stats.publicPath;


var renderHtml = function (fileName, routerType) {
  var renderer = new Renderer({
    styleUrl: publicPath + [].concat(stats.assetsByChunkName[routerType])[1],
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName[routerType])[0],
    commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
  }, fileName);

  renderer.render(
    function (err, html) {
      if (err) {
        throw err;
      }

      var logDir = path.join(__dirname, '../build/prod/public-html');
      if (!fs.existsSync(logDir)) {
        mkdirp.sync(logDir);
      }
      fs.writeFileSync(path.join(logDir, fileName + '.html'), html);
    }
  );
};

renderHtml('index', 'main');
renderHtml('special', 'special');
renderHtml('react', 'index');
