var utils = require('./utils'),
    jquery = require('jquery');

module.exports = {

  getDomainPricing: function (tld, type, callback) {
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

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  getDomainLockStatus: function (domainid, callback) {
    var options = {};

    options.action = 'domaingetlockingstatus';
    options.domainid = domainid;

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

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  setDomainLockStatus: function (domainid, status, callback) {
    var options = {};

    options.action = 'domainupdatelockingstatus';
    options.domainid = domainid;
    options.status = status;

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

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  getDomainNameservers: function (domainid, callback) {
    var options = {};

    options.action = 'domaingetnameservers';
    options.domainid = domainid;

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

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  },


  setDomainNameservers: function (domainid, nameservers, callback) {
    var options = {};

    options.action = 'domainupdatenameservers';
    options.domainid = domainid;

    for (var i = 0; i < nameservers.length; i++) {
      options['ns' + (i+1)] = nameservers[i];
    }

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

    utils.modem(createOptions, callback, function(body, response) {
      callback(JSON.parse(body));
    });
  }

};

