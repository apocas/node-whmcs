var utils = require('./utils'),
    jquery = require('jquery');


module.exports = {

  createCustomer: function (ocustomer, callback) {
    var templateId, self = this;
    var options = {};

    jquery.extend(true, options, ocustomer);

    options.action = 'addclient';

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


  getCustomer: function (clientid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getclientsdetails';
    options.clientid = clientid;
    options.stats = true;
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


  getCustomerProducts: function (clientid, productid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getclientsproducts';
    options.clientid = clientid;
    if(productid !== undefined) {
      options.serviceid = productid;
    }
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


  getCustomerDomains: function (clientid, domainid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getclientsdomains';
    options.limitnum = 999999;
    options.clientid = clientid;
    if(domainid !== undefined) {
      options.domainid = domainid;
    }
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


  getCustomerEmails: function (clientid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getemails';
    options.limitnum = 999999;
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


  getCustomerInvoices: function (clientid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getinvoices';
    options.limitnum = 999999;
    options.userid = clientid;
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


  getTickets: function (clientid, status, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'gettickets';
    options.clientid = clientid;
    options.limitnum = 500;
    if(status) {
      options.status = status;
    }
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


  validateLogin: function (email, password, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'validatelogin';
    options.email = email;
    options.password2 = password;
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