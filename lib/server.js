'use strict';

let os = require('os');

function getIp() {
  var interfaces = os.networkInterfaces();
  //var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return '127.0.0.1';
}

module.exports = function (options) {

  var express = require("express");
  var bodyParser = require("body-parser");
  var path = require("path");

  // require the page rendering logic
  var Renderer = options.prerender ?
    require("../build/prerender/main.js") :
    require("../config/SimpleRenderer.js");

  // load bundle information from stats
  var stats = require("../build/stats.json");

  var publicPath = stats.publicPath;

  var mainRenderer = new Renderer({
    styleUrl: options.separateStylesheet && (publicPath + "main.css?" + stats.hash),
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName.main)[0],
    commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
  });

  var specialRenderer = new Renderer({
    styleUrl: options.separateStylesheet && (publicPath + "main.css?" + stats.hash),
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName.special)[0],
    commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
  });

  var indexRenderer = new Renderer({
    styleUrl: options.separateStylesheet && (publicPath + "main.css?" + stats.hash),
    scriptUrl: publicPath + [].concat(stats.assetsByChunkName.index)[0],
    commonsUrl: publicPath + [].concat(stats.assetsByChunkName.commons)[0]
  }, 'react');

  var app = express();

  // serve the static assets
  app.use("/_assets", express.static(path.join(__dirname, "..", "build", "public"), {
    maxAge: "200d" // We can cache them as they include hashes
  }));
  app.use("/static", express.static(path.join(__dirname, "..", "static"), {
  }));

  // artifical delay and errors
  //app.use(function(req, res, next) {
  //	if(Math.random() < 0.05) {
  //		// Randomly fail to test error handling
  //		res.statusCode = 500;
  //		res.end("Random fail! (you may remove this code in your app)");
  //		return;
  //	}
  //	setTimeout(next, Math.ceil(Math.random() * 1000));
  //});

  app.use(bodyParser.json());

  // load REST API
  require("./api")(app);

  // application
  app.get("/*", function (req, res) {
    let renderer = indexRenderer;
    if (req.path.indexOf('/mall/') === 0) {
      renderer = mainRenderer;
    } else if (req.path.indexOf('/special/') === 0) {
      renderer = specialRenderer;
    }

    renderer.render(
      function (err, html) {
        if (err) {
          res.statusCode = 500;
          res.contentType = "text; charset=utf8";
          res.end(err.message);
          return;
        }
        res.contentType = "text/html; charset=utf8";
        res.end(html);
      }
    );
  });


  var port = process.env.PORT || options.defaultPort || 8080;
  app.listen(port, function () {
    console.log("Server listening on http://" + getIp() + ":" + port);
  });
};
