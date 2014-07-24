var utils = require('./utils'),
  _ = require('underscore');


var Customers = function(config) {
  this.config = config;
};

Customers.prototype.createCustomer = function (ocustomer, callback) {
  var self = this;
  var options = {};

  _.extend(options, ocustomer);

  options.action = 'addclient';

  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.updateCustomer = function (clientid, ocustomer, callback) {
  var self = this;
  var options = {};

  _.extend(options, ocustomer);

  options.action = 'updateclient';

  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }
  options.clientid = clientid;

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.updateCustomerDomain = function (domainid, opts, callback) {
  var self = this;
  var options = {};

  _.extend(options, opts);

  options.action = 'updateclientdomain';

  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }
  options.domainid = domainid;

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getContacts = function (userid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getcontacts';
  options.userid = userid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomer = function (clientid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getclientsdetails';
  options.clientid = clientid;
  options.stats = true;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerByEmail = function (email, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getclientsdetails';
  options.email = email;
  options.stats = true;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.deleteCustomer = function (clientid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'deleteclient';
  options.clientid = clientid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerProducts = function (clientid, serviceid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getclientsproducts';

  if(clientid !== undefined) {
    options.clientid = clientid;
  }
  if(serviceid !== undefined) {
    options.serviceid = serviceid;
  }

  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
},


Customers.prototype.updateCustomerProduct = function (serviceid, oservice, callback) {
  var self = this;
  var options = {};

  _.extend(options, oservice);

  options.action = 'updateclientproduct';
  options.serviceid = serviceid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.sendEmail = function (id, email, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'sendemail';
  options.id = id;
  options.messagename = email;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }


  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerDomains = function (clientid, domainid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getclientsdomains';
  options.clientid = clientid;
  if(domainid !== undefined) {
    options.domainid = domainid;
  }
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerEmails = function (clientid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getemails';
  options.clientid = clientid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerInvoices = function (clientid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getinvoices';
  options.userid = clientid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getCustomerOrders = function (clientid, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'getorders';
  options.userid = clientid;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.getTickets = function (clientid, status, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'gettickets';
  options.clientid = clientid;
  if(status) {
    options.status = status;
  }
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Customers.prototype.validateLogin = function (email, password, opts, callback) {
  var self = this;
  var options = {};

  if (!callback && typeof(opts) === 'function') {
    callback = opts;
    opts = undefined;
  }

  if(opts) {
    _.extend(options, opts);
  }

  options.action = 'validatelogin';
  options.email = email;
  options.password2 = password;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.password;
  if(typeof this.config.apiKey != 'undefined'){
    options.accesskey = this.config.apiKey;  
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };
  utils.modem(createOptions, callback);
};

module.exports = Customers;
