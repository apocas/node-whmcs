var utils = require('./utils'),
    jquery = require('jquery');

module.exports = {

  addOrder: function (clientid, order, callback) {
    var templateId, self = this;
    var options = {};

    jquery.extend(true, options, order);

    options.action = 'addorder';
    options.clientid = clientid;

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  payInvoice: function (invoiceid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'applycredit';
    options.invoiceid = invoiceid;
    options.amount = 'full';

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  getInvoice: function (invoiceid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getinvoice';
    options.invoiceid = invoiceid;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

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