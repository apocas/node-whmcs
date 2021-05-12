var utils = require('./utils'),
  request = require('request'),
  xml2js = require('xml2js'),
  HttpsProxyAgent = require('https-proxy-agent');

class WhmcsHttpClient {
  #username = null;
  #password = null;
  #serverUrl = null;
  #apiKey = null;
  #Promise = global.Promise;
  #responseType = 'json';
  #userAgent = null;
  #proxyUrl = null;

  constructor(configs = {}) {
    this.#username = (configs.username != null) ? configs.username : this.#username;
    this.#password = (configs.password != null) ? configs.password : this.#password;
    this.#serverUrl = (configs.serverUrl != null) ? configs.serverUrl : this.#serverUrl;
    this.#apiKey = (configs.apiKey != null) ? configs.apiKey : this.#apiKey;
    this.#Promise = (configs.Promise != null) ? configs.Promise : this.#Promise;
    this.#responseType = (configs.responseType != null) ? configs.responseType : this.#responseType;
    this.#proxyUrl = (configs.proxyUrl != null) ? configs.proxyUrl : this.#proxyUrl;
  }

  /**
   * Executes a WHMCS' API action with given parameters.
   * WHMCS' official action list available here: https://developers.whmcs.com/api/api-index/
   * @param {String} action Command name
   * @param {Object} parameters Request parameters (JSON Object)
   * @param {*} callback Optional callback. If not set the method returns a Promise
   */
  callApi(action, parameters, callback) {
    var _this = this;
    var bodyParams = {
      action: action,
      username: this.#username,
      password: this.#password,
      responsetype: this.#responseType
    };

    if (this.#apiKey) {
      bodyParams.accesskey = this.#apiKey;
    }

    if (typeof parameters === 'function' && callback == null) {
      callback = parameters;
    } else {
      bodyParams = utils.extend(bodyParams, parameters);
    }

    function startRequest(callback) {
      _this.#httpRequest(bodyParams, function (err, data, httpStatusCode) {
        console.log(err);
        console.log(require('util').inspect(data, { depth: null }));
        if (err) {
          callback(err);
        } else if (data.result && data.result == 'error' || data.status && data.status == 'error') {
          var whmcsError = new Error('WHMCS Error (' + httpStatusCode + '): ' + data.message);
          callback(whmcsError);
        } else {
          callback(null, data);
        }
      });
    }

    if (callback === undefined) {
      return new this.#Promise(function (resolve, reject) {
        startRequest(function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    } else {
      startRequest(callback);
    }
  }

  #httpRequest(bodyParams, callback) {
    var serverOptions = {
      uri: this.#serverUrl,
      method: 'POST',
      headers: {}
    };

    if (typeof this.#userAgent != null) {
      serverOptions.headers['User-Agent'] = this.#userAgent;
    }

    if (this.#proxyUrl != null) {
      serverOptions.agent = new HttpsProxyAgent(this.#proxyUrl);
      serverOptions.followRedirect = true;
    }

    serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    serverOptions.body = require('querystring').stringify(bodyParams);

    request(serverOptions, function (err, res, body) {
      if (err) {
        return callback(err);
      }

      var httpStatusCode = res.statusCode.toString();

      var data;

      if (bodyParams.responsetype === 'xml') {
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
            callback(null, parsedXml.whmcsapi, httpStatusCode)
          }
        });
      } else {
        try {
          data = JSON.parse(body);
        } catch (e) {
          return callback(new Error('JSON failed to parse: ' + e + ' -> "' + body + '"'));
        }
        callback(null, data, httpStatusCode);
      }
    });
  }
}

module.exports = WhmcsHttpClient;