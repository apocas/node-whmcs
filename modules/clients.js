var utils = require('../lib/utils');
var extend = utils.extend;

var Clients = function(config) {
  this.config = config;
};

//https://developers.whmcs.com/api-reference/addclient/
Clients.prototype.addClient = function(customer, callback) {
  var options = {
    action: 'addclient'
  };

  options = extend(options, customer);

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/addcontact/
Clients.prototype.addContact = function(contact, callback) {
  var options = {
    action: 'addcontact'
  };

  options = extend(options, contact);

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/upgradeproduct/
Clients.prototype.upgradeProduct = function(serviceid, data, callback) {
  var options = {
    action: 'upgradeproduct',
    serviceid: serviceid
  };

  options = extend(options, data);

  var updateOptions = {
    client: this,
    body: options
  };

  utils.modem(updateOptions, callback);
};

//https://developers.whmcs.com/api-reference/deletecontact/
Clients.prototype.deleteContact = function(contactid, callback) {
  var options = {
    action: 'deletecontact',
    contactid: contactid
  };

  var deleteOptions = {
    client: this,
    body: options
  };

  utils.modem(deleteOptions, callback);
};

//https://developers.whmcs.com/api-reference/getcredits/
Clients.prototype.getCredits = function(userid, callback) {
  var options = {
    action: 'getcredits',
    clientid: userid
  };

  var creditOptions = {
    client: this,
    body: options
  };

  utils.modem(creditOptions, callback);
};

//https://developers.whmcs.com/api-reference/updatecontact/
Clients.prototype.updateContact = function(contactid, contact, callback) {
  var options = {
    action: 'updatecontact',
    contactid: contactid
  };

  options = extend(options, contact);

  var updateOptions = {
    client: this,
    body: options
  };

  utils.modem(updateOptions, callback);
};

//https://developers.whmcs.com/api-reference/updateclient/
Clients.prototype.updateClient = function(clientid, customer, callback) {
  var options = {
    action: 'updateclient',
    clientid: clientid
  };

  options = extend(options, customer);

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/updateclientdomain/
Clients.prototype.updateClientDomain = function(domainid, opts, callback) {
  var options = {
    action: 'updateclientdomain'
  };

  if (isNaN(parseInt(domainid, 10))) {
    options.domain = domainid;
  } else {
    options.domainid = domainid;
  }

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getcontacts/
Clients.prototype.getContacts = function(userid, opts, callback) {
  var options = {
    action: 'getcontacts',
    userid: userid
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getclientsdetails/
Clients.prototype.getClientsDetails = function(clientid, opts, callback) {
  var options = {
    action: 'getclientsdetails',
    stats: true
  };

  if (typeof clientid === 'number' || clientid.indexOf('@') === -1) {
    options.clientid = clientid;
  } else {
    options.email = clientid;
  }

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getclientsdetails/
Clients.prototype.getClientByEmail = function(email, opts, callback) {
  var options = {
    action: 'getclientsdetails',
    stats: true,
    email: email
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/deleteclient/
Clients.prototype.deleteClient = function(clientid, callback) {
  var options = {
    action: 'deleteclient',
    clientid: clientid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getclientsproducts/
Clients.prototype.getClientProducts = function(clientid, opts, callback) {
  var options = {
    action: 'getclientsproducts',
    clientid: clientid
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/updateclientproduct/
Clients.prototype.updateClientProduct = function(serviceid, service, callback) {
  var options = {
    action: 'updateclientproduct',
    serviceid: serviceid
  };

  if (typeof service === 'function') {
    callback = service;
  } else {
    options = extend(options, service);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/sendemail/
Clients.prototype.sendEmail = function(id, opts, callback) {
  var options = {
    action: 'sendemail',
    id: id
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getclientsdomains/
Clients.prototype.getClientDomains = function(clientid, opts, callback) {
  var options = {
    action: 'getclientsdomains',
    clientid: clientid
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getemails/
Clients.prototype.getClientEmails = function(clientid, opts, callback) {
  var options = {
    action: 'getemails',
    clientid: clientid
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getinvoices/
Clients.prototype.getClientInvoices = function(userid, opts, callback) {
  var options = {
    action: 'getinvoices',
    userid: userid
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getorders/
Clients.prototype.getClientOrders = function(opts, callback) {
  var options = {
    action: 'getorders'
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/validatelogin/
Clients.prototype.validateLogin = function(email, password, callback) {
  var options = {
    action: 'validatelogin',
    email: email,
    password2: password
  };

  var createOptions = {
    client: this,
    body: options
  };
  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getclientsaddons/
Clients.prototype.getClientsAddons = function(opts, callback) {
  var options = {
    action: 'GetClientsAddons'
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/getquotes/
Clients.prototype.getQuotes = function(opts, callback) {
  var options = {
    action: 'GetQuotes'
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/gettransactions/
Clients.prototype.getTransactions = function(opts, callback) {
  var options = {
    action: 'GetTransactions'
  };

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};


module.exports = Clients;
