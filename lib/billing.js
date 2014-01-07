var utils = require('./utils'),
  _ = require('underscore');

module.exports = {

  addOrder: function (clientid, order, callback) {
    var self = this;
    var options = {};

    _.extend(options, order);

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
      callback(undefined, JSON.parse(body));
    });
  },


  acceptOrder: function (orderid, opts, callback) {
    var self = this;
    var options = {};

    _.extend(options, opts);

    options.action = 'acceptorder';
    options.orderid = orderid;

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
      callback(undefined, JSON.parse(body));
    });
  },


  payInvoice: function (invoiceid, callback) {
    var self = this;
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
      callback(undefined, JSON.parse(body));
    });
  },


  getInvoice: function (invoiceid, callback) {
    var self = this;
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
      callback(undefined, JSON.parse(body));
    });
  }

};