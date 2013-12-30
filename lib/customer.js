var utils = require('./utils'),
  _ = require('underscore');


module.exports = {

  createCustomer: function (ocustomer, callback) {
    var templateId, self = this;
    var options = {};

    _.extend(options, ocustomer);

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
      callback(undefined, JSON.parse(body));
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
      callback(undefined, JSON.parse(body));
    });
  },


  deleteCustomer: function (clientid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'deleteclient';
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


  getCustomerProducts: function (clientid, serviceid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getclientsproducts';
    options.clientid = clientid;
    if(serviceid !== undefined) {
      options.serviceid = serviceid;
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
      callback(undefined, JSON.parse(body));
    });
  },


  updateCustomerProduct: function (serviceid, oservice, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'updateclientproduct';
    options.serviceid = serviceid;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    _.extend(options, oservice);

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


  sendEmail: function (id, email, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'sendemail';
    options.id = id;
    options.messagename = email;
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
      callback(undefined, JSON.parse(body));
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
      callback(undefined, JSON.parse(body));
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
      callback(undefined, JSON.parse(body));
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
      callback(undefined, JSON.parse(body));
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
      callback(undefined, JSON.parse(body));
    });
  }

};