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
  #axiosConf = null;
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

    this.#axiosConf = {
      baseURL: this.#serverUrl,
      timeout: this.#timeout,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    if (this.#userAgent != null) {
      this.#axiosConf.headers['User-Agent'] = this.#userAgent;
    }

    if (this.#proxyUrl != null) {
      this.#axiosConf.httpsAgent = new HttpsProxyAgent(this.#proxyUrl);
    }
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

    if (typeof callback === 'function') {
      this.#postWithCallback(bodyParams, callback);
    } else {
      return new this.#Promise((resolve, reject) => {
        this.#post(bodyParams).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }

  #getAxiosInstance() {
    return axios.create(this.#axiosConf);
  }

  #postWithCallback(bodyParams, callback) {
   this.#post(bodyParams)
	  .then(res => {
	    callback(null, res);
    }, e => {
      callback(e);
    });
  }

  async #post(bodyParams) {
    const qs = querystring.stringify(bodyParams);
    const axios = this.#getAxiosInstance();
    let axiosResp = await axios.post('/includes/api.php', qs);
    let parsedData = axiosResp.data;

      if (axiosResp.headers['content-type'].indexOf('application/xml') > -1) {
        parsedData = await new Promise((resolve, reject) => {
          xml2js.parseString(axiosResp.data, {
            'explicitArray': false
          }, function (err, parsedXml) {
            if (err) {
              return reject(new Error('Error parsing xml'));
            } else if (!parsedXml) {
              return reject(new Error('Empty HTTP response'));
            } else if (!parsedXml.whmcsapi || parsedXml.whmcsapi.constructor != ({}).constructor) {
              return reject(new Error('Unexpected XML response'));
            } else {
              return resolve(parsedXml.whmcsapi);
            }
          });
        });
      }

    if (parsedData.result && parsedData.result == 'error' || parsedData.status && parsedData.status == 'error') {
      const whmcsError = new WhmcsError(parsedData.message, axiosResp.status, axiosResp.headers);
      return Promise.reject(whmcsError);
    } else {
      return Promise.resolve(parsedData);
    }
  }
}

module.exports = WhmcsHttpClient;