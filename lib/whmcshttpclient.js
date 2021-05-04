var utils = require('./utils'),
  request = require('request'),
  xml2js = require('xml2js'),
  HttpsProxyAgent = require('https-proxy-agent');

var WhmcsHttpClient = function (config) {
  this.config = config;
  this.config.responsetype = this.config.responsetype || 'json';
};

/**
 * Executes a WHMCS' API action with given parameters.
 * WHMCS' official action list available here: https://developers.whmcs.com/api/api-index/
 * @param {String} action Command name
 * @param {Object} parameters Request parameters (JSON Object)
 * @param {*} callback Optional callback. If not set the method returns a Promise
 */
WhmcsHttpClient.prototype.callApi = function (action, parameters, callback) {
  var _this = this;

  console.log(this);

  var requestBody = {
    username: this.config.username,
    password: this.config.password,
    action: action
  };

  if (typeof parameters === 'function') {
    callback = parameters;
  } else {
    requestBody = utils.extend(requestBody, parameters);
  }

  if (this.config.apiKey) {
    requestBody.accesskey = this.config.apiKey;
  }

  function _startRequest(callback) {
    _httpRequest(_this.config, requestBody, function (err, data, httpStatusCode) {
      if (err) {
        callback(err);
      } else if (data.result.toLowerCase() != 'success') {
        var whmcsError = new Error('WHMCS Error (' + httpStatusCode + '): ' + data.message);
        callback(whmcsError);
      } else {
        callback(undefined, data);
      }
    });
  }

  if (callback === undefined) {
    return new this.config.Promise(function (resolve, reject) {
      _startRequest(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  } else {
    _startRequest(callback);
  }
};

function _httpRequest(config, requestBody, callback) {
  requestBody.responsetype = config.responsetype;

  var serverOptions = {
    uri: config.serverUrl,
    method: 'POST',
    headers: {}
  };

  if (typeof config.userAgent !== 'undefined') {
    serverOptions.headers['User-Agent'] = config.userAgent;
  }

  if (config.proxyUrl) {
    serverOptions.agent = new HttpsProxyAgent(config.proxyUrl);
    serverOptions.followRedirect = true;
  }

  serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  serverOptions.body = require('querystring').stringify(requestBody);

  request(serverOptions, function (err, res, body) {
    if (err) {
      return callback(err);
    }

    var httpStatusCode = res.statusCode.toString();

    var data;

    if (requestBody.responsetype === 'xml') {
      xml2js.parseString(body, {
        'explicitArray': false
      }, function (err, parsedXml) {
        if (err) {
          callback(new Error('Error parsing xml'));
        } else if (!parsedXml) {
          callback(new Error('Empty HTTP response'));
        } else if (!parsedXml.whmcsapi || !parsedXml.whmcsapi.result) {
          callback(new Error('Unexpected XML response'));
        } else {
          callback(undefined, parsedXml.whmcsapi, httpStatusCode)
        }
      });
    } else {
      try {
        data = JSON.parse(body);
      } catch (e) {
        return callback(new Error('JSON failed to parse: ' + e + ' -> "' + body + '"'));
      }
      callback(undefined, data, httpStatusCode);
    }
  });
};

module.exports = WhmcsHttpClient;