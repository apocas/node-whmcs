const utils = require('./utils'),
  WhmcsError = require('./whmcserror'),
  axios = require('axios'),
  xml2js = require('xml2js'),
  HttpsProxyAgent = require('https-proxy-agent'),
  querystring = require('querystring'),
  crypto = require('crypto');

class WhmcsHttpClient {
  #apiSecret = null;
  #apiIdentifier = null;
  #username = null;
  #password = null;
  #accessKey = null;
  #serverUrl = null;
  #Promise = global.Promise;
  #responseType = 'json';
  #userAgent = null;
  #proxyUrl = null;
  #axiosInstance = null;
  #timeout = 0;

  constructor(configs = {}) {
    this.#username = (configs.username != null) ? configs.username : this.#username;
    this.#password = (configs.password != null) ? crypto.createHash('md5').update(configs.password).digest('hex') : this.#password;
    this.#serverUrl = (configs.serverUrl != null) ? configs.serverUrl : this.#serverUrl;
    this.#timeout = (configs.timeout != null) ? configs.timeout : this.#timeout;
    this.#apiIdentifier = (configs.apiIdentifier != null) ? configs.apiIdentifier : this.#apiIdentifier;
    this.#apiSecret = (configs.apiSecret != null) ? configs.apiSecret : this.#apiSecret;
    this.#accessKey = (configs.accessKey != null) ? configs.accessKey : this.#accessKey;
    this.#Promise = (configs.Promise != null) ? configs.Promise : this.#Promise;
    this.#responseType = (configs.responseType != null) ? configs.responseType : this.#responseType;
    this.#userAgent = (configs.userAgent != null) ? configs.userAgent : this.#userAgent;
    this.#proxyUrl = (configs.proxyUrl != null) ? configs.proxyUrl : this.#proxyUrl;

    if (this.#Promise != null && typeof this.#Promise.resolve !== 'function') {
      throw new Error('Invalid promise library.');
    }

    let axiosConf = {
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
    let bodyParams = {
      action: action,
      username: this.#username,
      password: this.#password,
      identifier: this.#apiIdentifier,
      secret: this.#apiSecret,
      accesskey: this.#accessKey,
      responsetype: this.#responseType
    };

    if (typeof parameters === 'function' && callback == null) {
      callback = parameters;
    } else {
      bodyParams = utils.extend(bodyParams, parameters);
    }

    return new this.#Promise((resolve, reject) => {
      return this.#post(bodyParams).then(res => {
        let whmcsError;
        if (res.data.result && res.data.result == 'error' || res.data.status && res.data.status == 'error') {
          whmcsError = new WhmcsError(res.data.message);
          whmcsError.setHttpCode(res.httpStatus);
        }
        if (typeof callback === 'function') {
          whmcsError ? callback(whmcsError) : callback(null, res.data);
        } else {
          return whmcsError ? reject(whmcsError) : resolve(res.data);
        }
      }).catch(e => {
        if (typeof callback === 'function') {
          callback(e);
        } else {
          return reject(e);
        }
      });
    });
  }

  async #post(bodyParams) {
    const qs = querystring.stringify(bodyParams);

    try {
      let resp = await this.#axiosInstance.post('/includes/api.php', qs);

      return new Promise((resolve, reject) => {
        if (resp.headers['content-type'].indexOf('application/xml') > -1) {
          xml2js.parseString(resp.data, {
            'explicitArray': false
          }, function (err, parsedXml) {
            if (err) {
              return reject(new Error('Error parsing xml'));
            } else if (!parsedXml) {
              return reject(new Error('Empty HTTP response'));
            } else if (!parsedXml.whmcsapi || parsedXml.whmcsapi.constructor != ({}).constructor) {
              return reject(new Error('Unexpected XML response'));
            } else {
              return resolve({
                data: parsedXml.whmcsapi,
                httpStatus: resp.status
              });
            }
          });
        } else {
          return resolve({
            data: resp.data,
            httpStatus: resp.status
          });
        }
      });
    } catch (err) {
      return Promise.reject(err);
    };
  }
}

module.exports = WhmcsHttpClient;