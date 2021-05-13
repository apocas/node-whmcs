var utils = require('./utils'),
  axios = require('axios'),
  xml2js = require('xml2js'),
  HttpsProxyAgent = require('https-proxy-agent'),
  querystring = require('querystring');

class WhmcsHttpClient {
  #username = null;
  #password = null;
  #serverUrl = null;
  #apiKey = null;
  #Promise = global.Promise;
  #responseType = 'json';
  #userAgent = null;
  #proxyUrl = null;
  #axiosInstance = null;
  #timeout = 0;

  constructor(configs = {}) {
    this.#username = (configs.username != null) ? configs.username : this.#username;
    this.#password = (configs.password != null) ? configs.password : this.#password;
    this.#serverUrl = (configs.serverUrl != null) ? configs.serverUrl : this.#serverUrl;
    this.#timeout = (configs.timeout != null) ? configs.timeout : this.#timeout;
    this.#apiKey = (configs.apiKey != null) ? configs.apiKey : this.#apiKey;
    this.#Promise = (configs.Promise != null) ? configs.Promise : this.#Promise;
    this.#responseType = (configs.responseType != null) ? configs.responseType : this.#responseType;
    this.#userAgent = (configs.userAgent != null) ? configs.userAgent : this.#userAgent;
    this.#proxyUrl = (configs.proxyUrl != null) ? configs.proxyUrl : this.#proxyUrl;

    if (this.#Promise != null && typeof this.#Promise.resolve !== 'function') {
      throw new Error('Invalid promise library.');
    }

    var axiosConf = {
      baseURL: this.#serverUrl,
      timeout: this.#timeout,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    if (this.#userAgent != null) {
      axiosConf.headers['User-Agent'] = this.#userAgent;
    }

    if (this.#proxyUrl != null) {
      serverOptions.httpsAgent = new HttpsProxyAgent(this.#proxyUrl);
    }

    this.#axiosInstance = axios.create(axiosConf);
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
      _this.#post(bodyParams, function (err, data, httpStatusCode) {
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

  #post(bodyParams, callback) {
    var qs = querystring.stringify(bodyParams);
    this.#axiosInstance.post('/includes/api.php', qs)
      .then(resp => {
        if (resp.headers['content-type'].indexOf('application/xml') > -1) {
          xml2js.parseString(resp.data, {
            'explicitArray': false
          }, function (err, parsedXml) {
            if (err) {
              callback(new Error('Error parsing xml'));
            } else if (!parsedXml) {
              callback(new Error('Empty HTTP response'));
            } else if (!parsedXml.whmcsapi || !parsedXml.whmcsapi.result) {
              callback(new Error('Unexpected XML response'));
            } else {
              callback(null, parsedXml.whmcsapi, resp.status);
            }
          });
        } else {
          callback(null, resp.data, resp.status);
        }
      }).catch(err => {
        callback(err);
      });
  }
}

module.exports = WhmcsHttpClient;