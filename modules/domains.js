var utils = require('../lib/utils');
var extend = utils.extend;

var Domains = function(config) {
  this.config = config;
};

/**
 * Get domain lock status - http://docs.whmcs.com/API:Domain_Locking_Status
 * @param domainid String|Number
 * @param callback
 */
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

/**
 * Set domain lock status - http://docs.whmcs.com/API:Domain_Update_Lock
 * @param domainid String|Number
 * @param [status] String|Number 1 to lock, 0 to unlock, defaults to 0
 * @param callback
 */
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

/**
 * Get domain nameservers - http://docs.whmcs.com/API:Domain_Nameservers
 * @param domainid String|Number
 * @param callback
 */
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

/**
 * Set domain nameservers - http://docs.whmcs.com/API:Domain_Update_Nameservers
 * @param domainid String|Number
 * @param nameservers Object|Array Pass in an object with ns* properties, or an array of nameservers
 * @param nameservers.ns1 String
 * @param nameservers.ns2 String
 * @param [nameservers.ns3] String
 * @param [nameservers.ns4] String
 * @param [nameservers.ns5] String
 * @param callback
 */
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

/**
 * Obtain the WHOIS of a domain from the registrar - http://docs.whmcs.com/API:Get_Domain_WHOIS
 * @param domainid String|Number
 * @param callback
 */
Domains.prototype.getDomainWHOIS = function (domainid, callback) {
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

/**
 * Set the contact information on a domain - http://docs.whmcs.com/API:Domain_Update_WHOIS
 * @param domainid String|Number
 * @param xml XML
 * @param callback
 */
Domains.prototype.setDomainWHOIS = function (domainid, xml, callback) {
  var options = {
    action: 'domainupdatewhoisinfo',
    domainid: domainid,
    xml: xml
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Send a transfer command to the registrar - http://docs.whmcs.com/API:Transfer_Domain
 * @param domainid String|Number Pass in domain id or name
 * @param eppcode String
 * @param callback
 */
Domains.prototype.setDomainTransfer = function (domainid, eppcode, callback) {
  var options = {
    action: 'domaintransfer'
  };

  if (isNaN(parseInt(domainid, 10))) {
    options.domain = domainid;
  } else {
    options.domainid = domainid;
  }

  if (typeof eppcode === 'function') {
    callback = eppcode;
  } else {
    options.eppcode = eppcode;
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Domains;
