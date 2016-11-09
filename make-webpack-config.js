var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var loadersByExtension = require("./config/loadersByExtension");
var os = require('os');
var autoprefixer = require('autoprefixer');

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
  var buildPath = options.buildPath || path.join(__dirname, "build");

  var entry = {
    // main: options.prerender ? "./config/mainPrerenderer" : "./config/mainApp",
    // special: "./config/specialApp",
    index: './config/reactApp',
    // second: options.prerender ? "./config/secondPrerenderer" : "./config/secondApp"
  };
  var loaders = {
    "jsx": options.hotComponents ? ["react-hot-loader", "babel-loader?stage=0"] : "babel-loader?stage=0",
    "js": {
      loader: "babel-loader?stage=0",
      include: path.join(__dirname, "app")
    },
    "json": "json-loader",
    "coffee": "coffee-redux-loader",
    "json5": "json5-loader",
    "txt": "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader",
    "wav|mp3": "file-loader",
    "html": "html-loader",
    "md|markdown": ["html-loader", "markdown-loader"]
  };
  var cssLoader = options.minimize ? "css-loader?module" : "css-loader?module&localIdentName=[path][name]---[local]---[hash:base64:5]";
  var stylesheetLoaders = {
    "css": cssLoader,
    "less": [cssLoader, "less-loader"],
    "styl": [cssLoader, "stylus-loader"],
    "scss|sass": [cssLoader, "postcss-loader", "sass-loader"],
    "gscss": ['css-loader', "postcss-loader", "sass-loader"]
  };
  var additionalLoaders = [
    // { test: /some-reg-exp$/, loader: "any-loader" }
  ];
  var alias = {};
  var aliasLoader = {};
  var externals = {
    jquery: "jQuery",
    fastclick: "FastClick",
    lodash: '_',
    bluebird: 'Promise'
  };
  var modulesDirectories = ["web_modules", "node_modules"];
  var extensions = ["", ".web.js", ".js", ".jsx"];
  var root = path.join(__dirname, "app");
  var publicPath = options.devServer ? "http://" + getIp() + ":2992/_assets/" :
    "//mws.fengjr.com/public/dist/mobile-web/mall/";
  var output = {
    path: path.join(buildPath, options.prerender ? "prerender" : "public"),
    publicPath: publicPath,
    filename: "[name]" + ((options.longTermCaching && !options.prerender ) ? "-[chunkhash]" : "" ) + ".js",
    chunkFilename: (options.devServer ? "[id]" : "[name]") + (options.longTermCaching && !options.prerender ? "-[chunkhash]" : "") + '.js',
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: options.prerender ? "commonjs2" : undefined,
    pathinfo: options.debug || options.prerender
  };
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/,
    /node_modules[\\\/]items-store[\\\/]/
  ];
  var plugins = [
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ];
  if (options.prerender) {
    plugins.push(new StatsPlugin(path.join(buildPath, "stats.prerender.json"), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
    aliasLoader["react-proxy$"] = "react-proxy/unavailable";
    aliasLoader["react-proxy-loader$"] = "react-proxy-loader/unavailable";
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      "superagent",
      "async"
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1}));
  } else {
    plugins.push(new StatsPlugin(path.join(buildPath, "stats.json"), {
      chunkModules: true,
      exclude: excludeFromStats
    }));
  }
  if (options.commonsChunk) {
    // plugins.push(new webpack.optimize.CommonsChunkPlugin("commons",
    //   "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['commons'],
      children: true,
      minChunks: 2,
      // async: true,
    }));
  }
  var asyncLoader = {
    test: [].map(function (name) {
      return path.join(__dirname, "app", "route-handlers", name);
    }),
    loader: options.prerender ? "react-proxy-loader/unavailable" : "react-proxy-loader"
  };


  Object.keys(stylesheetLoaders).forEach(function (ext) {
    var stylesheetLoader = stylesheetLoaders[ext];
    if (Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!");
    if (options.prerender) {
      stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, "css-loader/locals");
    } else if (options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", stylesheetLoader);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader;
    }
  });
  if (options.separateStylesheet && !options.prerender) {

    plugins.push(new ExtractTextPlugin("[name]" + (options.longTermCaching ? "-[contenthash]" : "" ) + ".css"));
  }
  if (options.minimize && !options.prerender) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
          drop_console: true,
        }
      }),
      new webpack.optimize.DedupePlugin()
    );
  }
  if (options.minimize) {
    plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }
  var webpackConfig = {
    entry: entry,
    output: output,
    target: options.prerender ? "node" : "web",
    module: {
      loaders: [asyncLoader].concat(loadersByExtension(loaders)).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
    },
    postcss: function () {
      return [autoprefixer];
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, "node_modules"),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };
  return webpackConfig;
};
