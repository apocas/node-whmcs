exports.createClient = function (options) {
  return new Client(options);
};

var Client = function (options) {
  ['username','apiKey','serverUrl'].forEach(function (required) {
    if (!options[required]) throw new Error('options.' + required + ' is a required argument.');
  });

  this.config = options;
  this.authorized = false;

  this.utils = require('./utils');

  this.customers = new Customers(this.config);
  this.domains = new Domains(this.config);
  this.billing = new Billing(this.config);
  this.products = new Products(this.config);
  this.support = new Support(this.config);
};
