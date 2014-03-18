var request = require('request');

var utils = exports;

var failCodes = {
  403: "The request is correct, but could not be process.",
  404: "The requested URL is incorrect or the resource does not exist.",
  422: "The sent parameters are erroneous",
  500: "An error occurred. Please contact support"
};

utils.failCodes = failCodes;

utils.modem = function() {
  var args = Array.prototype.slice.call(arguments),
      callback = (typeof(args[args.length - 1]) === 'function') && args.pop(),
      uri, method, requestBody, client, headers = {};

  if(args.length == 1) {
    method = args[0]['method'] || 'GET';
    uri = args[0]['uri'];
    requestBody = args[0]['body'];
    client = args[0]['client'];
  } else if(args.length === 2) {
    method = 'GET';
    uri = args[0];
    client = args[1];
  } else {
    method = args[0];
    uri = args[1];
    client = args[2];
  }

  function makeRequest() {

    var serverOptions = {
      uri: uri,
      method: method,
      headers: headers
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
        return callback(new Error('JSON failed to parse.'));
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

  uri = client.config.serverUrl + "/" + uri;
  makeRequest();
};