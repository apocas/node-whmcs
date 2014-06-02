var utils = require('./utils'),
  _ = require('underscore');


module.exports = {

  createCustomer: function (ocustomer, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },

  updateCustomer: function (clientid, ocustomer, callback) {
    var self = this;
    var options = {};

    _.extend(options, ocustomer);

    options.action = 'updateclient';

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;
    options.clientid = clientid;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback);
  },


  updateCustomerDomain: function (domainid, opts, callback) {
    var self = this;
    var options = {};

    _.extend(options, opts);

    options.action = 'updateclientdomain';

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;
    options.domainid = domainid;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback);
  },


  getContacts: function (userid, callback) {
    var self = this;
    var options = {};

    options.action = 'getcontacts';
    options.userid = userid;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback);
  },


  getCustomer: function (clientid, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  getCustomerByEmail: function (email, callback) {
    var self = this;
    var options = {};

    options.action = 'getclientsdetails';
    options.email = email;
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

    utils.modem(createOptions, callback);
  },


  deleteCustomer: function (clientid, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  getCustomerProducts: function (clientid, serviceid, callback) {
    var self = this;
    var options = {};

    options.action = 'getclientsproducts';

    if(clientid !== undefined) {
      options.clientid = clientid;
    }
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

    utils.modem(createOptions, callback);
  },


  updateCustomerProduct: function (serviceid, oservice, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  sendEmail: function (id, email, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },

  getCustomerDomains: function (clientid, domainid, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  getCustomerEmails: function (clientid, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  getCustomerInvoices: function (clientid, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  getCustomerOrders: function (clientid, callback) {
    var self = this;
    var options = {};

    options.action = 'getorders';
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

    utils.modem(createOptions, callback);
  },


  getTickets: function (clientid, status, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  },


  validateLogin: function (email, password, callback) {
    var self = this;
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

    utils.modem(createOptions, callback);
  }

};
