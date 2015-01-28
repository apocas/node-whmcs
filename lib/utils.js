var request = require('request');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var xml2js = require('xml2js');

module.exports = {
  /**
   * Effectuate HTTP request
   * @param options Object
   * @param callback Function
   * @param [isLicense] Boolean
   */
  modem: function(options, callback, isLicense) {
    var requestBody, client;

    client = options.client;
    requestBody = options.body;

    if (!requestBody.responsetype) {
      requestBody.responsetype = 'json';
    }

    if (isLicense === true) {
      requestBody.email = client.config.username;
      requestBody.apikey = client.config.apiKey;
    } else {
      requestBody.username = client.config.username;
      requestBody.password = client.config.password;

      if (client.config.apiKey) {
        requestBody.accesskey = client.config.apiKey;
      }
    }

    var serverOptions = {
      uri: client.config.serverUrl,
      method: 'POST',
      headers: {}
    };

    serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    serverOptions.body = require('querystring').stringify(requestBody);


    function send(statusCode, data, callback) {
      if(!data || !data.result || data.result.toLowerCase() != 'success') {
        return callback(new Error('WHMCS Error (' + statusCode + '): ' + data.message));
      } else {
        return callback(null, data);
      }
    }

    request(serverOptions, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      var statusCode = res.statusCode.toString();

      var data;

      if (requestBody.responsetype === 'xml') {
        xml2js.parseString(body, {
          'explicitArray': false
        }, function(err, result) {

          if (err) return callback(new Error('error parsing xml'));
          send(statusCode, result.licenseapi, callback);
        });
      } else {
        try {
          data = JSON.parse(body);
        } catch (e) {
          return callback(new Error('JSON failed to parse: ' + e + ' -> "' + body + '"'));
        }
        send(statusCode, data, callback);
      }
    });
  },

  /**
   * Pass in `arguments` to get back a proper Array
   * @returns {Array.<T>}
   */
  getArgs: function() {
    return Array.prototype.slice.call(arguments);
  },

  /**
   * Extend properties of one object with one or more Objects
   * Copied from Underscore - http://underscorejs.org/
   * @param obj Object
   * @returns Object
   */
  extend: function(obj) {
    if (typeof obj !== 'object') return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};
