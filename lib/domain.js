var utils = require('./utils'),
    jquery = require('jquery');

module.exports = {

  getDomainPricing: function (tld, type, callback) {
    var options = {};

    options.action = 'getdomainpricing';
    options.tld = tld;

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;
    if(type !== undefined) {
      options.type = type;
    }

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  }

};

