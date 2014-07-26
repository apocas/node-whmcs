var request = require('request');

var utils = exports;

var failCodes = {
  403: "The request is correct, but could not be process.",
  404: "The requested URL is incorrect or the resource does not exist.",
  422: "The sent parameters are erroneous",
  500: "An error occurred. Please contact support"
};

utils.failCodes = failCodes;

utils.modem = function(options, callback) {
  var requestBody, client;

  client = options.client;
  requestBody = options.body;

  requestBody.username = client.config.username;
  requestBody.password = client.config.password;
  if(client.config.apiKey){
    requestBody.accesskey = client.config.apiKey;
  }

  function makeRequest() {

    var serverOptions = {
      uri: client.config.serverUrl,
      method: 'POST',
      headers: {}
    };

    if(typeof requestBody !== 'undefined') {
      serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      serverOptions.body = require('querystring').stringify(requestBody);
    }

    request(serverOptions, function (err, res, body) {
      if(err) {
        return callback(err);
      }

      var statusCode = res.statusCode.toString();
      if(Object.keys(failCodes).indexOf(statusCode) !== -1) {
        return callback(new Error('WHMCS Error (' + statusCode + '): ' + failCodes[statusCode]));
      }

      var data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        return callback(new Error('JSON failed to parse: ' + e + ' -> ' + body));
      }

      if(!data || !data.result || (data.result != 'success' && data.result != 'SUCCESS')) {
        return callback(new Error('WHMCS Error (' + statusCode + '): ' + data.message));
      } else {
        return callback(undefined, data);
      }
    });
  }

  function toBase64 (str) {
    return (new Buffer(str || "", "ascii")).toString("base64");
  }

  makeRequest();
};
