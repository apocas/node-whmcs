var http = require('http'),
    url = require('url'),
    request = require('request'),
    utils = require('./utils');

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