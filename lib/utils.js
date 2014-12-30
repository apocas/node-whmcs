var request = require('request');

module.exports = {
  /**
   * Effectuate HTTP request
   * @param options {*}
   * @param callback
   */
  modem: function(options, callback) {
    var requestBody, client;

    client = options.client;
    requestBody = options.body;

    if (!requestBody.responsetype) {
      requestBody.responsetype = 'json';
    }

    requestBody.username = client.config.username;
    requestBody.password = client.config.password;

    if (client.config.apiKey) {
      requestBody.accesskey = client.config.apiKey;
    }

    var serverOptions = {
      uri: client.config.serverUrl,
      method: 'POST',
      headers: {}
    };

    serverOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    serverOptions.body = require('querystring').stringify(requestBody);

    request(serverOptions, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      var statusCode = res.statusCode.toString();

      var data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        return callback(new Error('JSON failed to parse: ' + e + ' -> ' + body));
      }

      if (!data || !data.result || (data.result != 'success' && data.result != 'SUCCESS')) {
        return callback(new Error('WHMCS Error (' + statusCode + '): ' + data.message));
      } else {
        return callback(undefined, data);
      }
    });
  },

  /**
   * Pass in `arguments` to get back a proper Array
   * @returns {Array.<T>}
   */
  getArgs: function() {
    return Array.prototype.slice.call(arguments);
  }
};
