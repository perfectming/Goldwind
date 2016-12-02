var $ = require('jquery');
var Promise = require('bluebird');
let baseUrl = require('../../config/default');
console.log(baseUrl.serviceBaseUrl);

function parseResponse(jqResult) {
    return Promise.resolve(jqResult).then(function (result) {
        return result;
    }, function (error) {
        return error;
    });
}

export default {
    post(url, data) {
        return parseResponse($.ajax(url, {
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify(data),
            timeout: 1000 * 30,
        }));
    },
    get (data) {
        console.log(baseUrl.serviceBaseUrl + 'api/backendGet');
        return parseResponse($.ajax(baseUrl.serviceBaseUrl + 'api/backendGet', {
            dataType: 'json',
            data: data,
            timeout: 1000 * 30,
        }));
    },
};
