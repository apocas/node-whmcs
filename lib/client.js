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