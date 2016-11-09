var request = require('request');
var config = require('config');

var proxy = function (toBaseUrl) {
  return function (req, res) {
    var url = toBaseUrl + req.path;
    var opts = {
      followRedirect: false,
      url: url,
      qs: req.query,
      method: req.method,
      headers: {
        cookie: req.get('cookie')
      }
    };

    var contentType = req.get('content-type');
    if (contentType) {
      if (contentType.indexOf('application/json') > -1) {
        opts.json = req.body;
      }
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        opts.form = req.body;
      }
    }

    request(opts).on('error', function (err) {
      console.error(err);
    }).pipe(res);
  };
};

module.exports = function (app) {
  app.use('/h5', proxy(config.h5Url));
  app.use('/api/cms', proxy(config.cmsApiUrl));
  app.use('/api', proxy(config.serviceBaseUrl + '/api'));
  app.use('/weixin', proxy(config.serviceBaseUrl + '/weixin'));
};
