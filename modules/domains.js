var utils = require('../lib/utils');
var extend = utils.extend;

var Domains = function(config) {
  this.config = config;
};

//https://developers.whmcs.com/api-reference/domaingetlockingstatus/
Domains.prototype.getDomainLockStatus = function (domainid, callback) {
  var options = {
    action: 'domaingetlockingstatus',
    domainid: domainid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//http://docs.whmcs.com/API:Domain_Update_Lock
Domains.prototype.setDomainLockStatus = function (domainid, status, callback) {
  if(typeof status === 'function'){
    callback = status;
    status = 0;
  }

  var options = {
    action: 'domainupdatelockingstatus',
    domainid: domainid,
    lockstatus: status
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/domaingetwhoisinfo/
Domains.prototype.getWhoisInfo = function (domainid, callback) {
  var options = {
    action: 'domaingetwhoisinfo',
    domainid: domainid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/domaingetnameservers/
Domains.prototype.getDomainNameservers = function (domainid, callback) {
  var options = {
    action: 'domaingetnameservers',
    domainid: domainid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//http://docs.whmcs.com/API:Domain_Update_Nameservers
Domains.prototype.setDomainNameservers = function (domainid, nameservers, callback) {
  var options = {
    action: 'domainupdatenameservers',
    domainid: domainid
  };

  if(Array.isArray(nameservers)){
    var len = nameservers.length;
    for(var i = 0; i < len; i++){
      options['ns' + (i + 1)] = nameservers[i];
    }
  } else if(typeof nameservers === 'object') {
    options = extend(options,nameservers);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Domains;
