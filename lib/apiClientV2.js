var $ = require('jquery');
var Promise = require('bluebird');
var baseUrl = '/api';

import FengjrApp from "./FengjrApp";
import BrowserEnv from "./BrowserEnv";
import util from "./util"
var analysis = require('./analysis');
let {JSEncrypt}  = require("jsencrypt");

require('jquery.cookie');

function parseResponse(jqResult, url) {
  return Promise.resolve(jqResult).then(function (result) {
    const originError = result.error;

    if (!originError) {
      return result.data;
    }

    let error = new Error(originError.message);
    error.code = originError.code;

    if (error.code === 102) {
      // 需要登录
      if (BrowserEnv.isInApp()) {
        FengjrApp.login(function () {
          FengjrApp.getUser(function (user) {
            $.cookie('token', user.token, {path: '/'});
            location.reload();
          });
        });
        throw error;
      } else {
        location.href = `/re/account/login?rd=${encodeURIComponent(location.href)}`;
      }
    } else {
      throw error;
    }
  }, function (error) {
    var status = error.status;
    analysis.trackEventValue('re_apiv2_status_error', {url, status});

    error = new Error('网络异常');
    error.code = 0;
    throw error;
  });
}


export default {

  getEncrypted(body) {
    return this.get("/v2/common/getPublicKey").then((publicKey)=> {
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      let rawDataStr = JSON.stringify(body);
      let mode = 117;

      let strItems = util.spliteStrByByteLength(rawDataStr, mode);
      let encryptItems = strItems.map((item)=> {
        return encrypt.encrypt(item);
      })
      return {
        publicKey,
        encryptedData: encryptItems
      };
    }).catch(()=> {
      return body;
    });
  },

  post(url, data) {

    return parseResponse($.ajax(baseUrl + url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(data),
      timeout: 1000 * 30,
    }), url);
  },

  get (url, data) {
    return parseResponse($.ajax(baseUrl + url, {
      dataType: 'json',
      data: data,
      timeout: 1000 * 30,
    }), url);
  },

  getCms (url, data) {
    return this.get('/cms' + url, data)
  },

  encryptPost(url, data) {
    let that = this;
    return this.getEncrypted(data).then(function (body) {
      return that.post(url, body);
    });
  }

};
