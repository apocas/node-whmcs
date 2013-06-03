var http = require('http'),
    url = require('url'),
    request = require('request'),
    utils = require('./utils'),
    jquery = require('jquery');

var serverUrl = '';

exports.createClient = function (options) {
  return new Client(options);
};

var Client = exports.Client = function (options) {
  ['username','apiKey','serverUrl'].forEach(function (required){
    if (!options[required]) throw new Error('options.' + required + ' ia a required argument.');
  });

  this.config = options;
  this.authorized = false;
};


Client.prototype.addOrder = function (clientid, order, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'validatelogin';
  options.clientid = clientid;
  
  jquery.merge(true, options, order);

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
};

Client.prototype.validateLogin = function (email, password, callback) {
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
};

Client.prototype.getCustomer = function (clientid, callback) {
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
};

Client.prototype.getTickets = function (clientid, status, callback) {
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
};

Client.prototype.openTicket = function (clientid, department, subject, message, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'openticket';
  options.clientid = clientid;
  options.deptid = department;
  options.subject = subject;
  options.message = message;
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
};

Client.prototype.getTicket = function (ticketid, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'getticket';
  options.ticketid = ticketid;
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
};

Client.prototype.replyTicket = function (clientid, ticketid, message, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'addticketreply';
  options.clientid = clientid;
  options.ticketid = ticketid;
  options.message = message;
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
};

Client.prototype.getProduct = function (id, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'getproducts';
  options.pid = id;
  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.apiKey;

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  //console.log(createOptions);

  utils.modem(createOptions, callback, function(body, response) {
    callback(JSON.parse(body));
  });
};

Client.prototype.getCustomerProducts = function (clientid, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'getclientsproducts';
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
};

Client.prototype.getCustomerDomains = function (clientid, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'getclientsdomains';
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
};

Client.prototype.getCustomerInvoices = function (clientid, callback) {
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
};

Client.prototype.getCustomerEmails = function (clientid, callback) {
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
};


Client.prototype.getProducts = function (gid, callback) {
  var templateId, self = this;
  var options = {};

  options.action = 'getproducts';
  if(gid !== undefined) {
    options.gid = gid;
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
};