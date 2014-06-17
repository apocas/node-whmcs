var utils = require('./utils');

var Domains = function(config) {
  this.config = config;
};

Domains.prototype.getDomainPricing = function (tld, type, callback) {
  var options = {};

  options.action = 'getdomainpricing';
  options.tld = tld;

  options.responsetype = "json";
  options.username = this.config.username;
  options.password = this.config.apiKey;
  if(type !== undefined) {
    options.type = type;
  }

  var createOptions = {
    method: 'POST',
    uri: '',
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Domains.prototype.getDomainLockStatus = function (domainid, callback) {
  var options = {};

  options.action = 'domaingetlockingstatus';
  options.domainid = domainid;

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
};

Domains.prototype.setDomainLockStatus = function (domainid, status, callback) {
  var options = {};

  options.action = 'domainupdatelockingstatus';
  options.domainid = domainid;
  options.lockstatus = status;

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
};

Domains.prototype.getDomainNameservers = function (domainid, callback) {
  var options = {};

  options.action = 'domaingetnameservers';
  options.domainid = domainid;

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
};

Domains.prototype.setDomainNameservers = function (domainid, nameservers, callback) {
  var options = {};

  options.action = 'domainupdatenameservers';
  options.domainid = domainid;

  for (var i = 0; i < nameservers.length; i++) {
    options['ns' + (i+1)] = nameservers[i];
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
};

module.exports = Domains;
