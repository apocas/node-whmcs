exports.createClient = function (options) {
  return new Client(options);
};

var Client = function (options) {
  ['username','apiKey','serverUrl'].forEach(function (required) {
    if (!options[required]) throw new Error('options.' + required + ' is a required argument.');
  });

  this.config = options;
  this.authorized = false;

  this.customers = require('./customer');
  this.customers.config = this.config;
  this.domains = require('./domain');
  this.domains.config = this.config;
  this.billing = require('./billing');
  this.billing.config = this.config;
  this.products = require('./product');
  this.products.config = this.config;
  this.support = require('./support');
  this.support.config = this.config;
};












