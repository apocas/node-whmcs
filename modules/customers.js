var utils = require('../lib/utils');
var extend = utils.extend;

var Customers = function(config) {
  this.config = config;
};

//https://developers.whmcs.com/api-reference/addclient/
Customers.prototype.addClient = function(customer, callback) {
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
Customers.prototype.addContact = function(contact, callback) {
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
Customers.prototype.upgradeProduct = function(serviceid, data, callback) {
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
Customers.prototype.deleteContact = function(contactid, callback) {
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
Customers.prototype.getCredits = function(userid, callback) {
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
Customers.prototype.updateContact = function(contactid, contact, callback) {
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
Customers.prototype.updateClient = function(clientid, customer, callback) {
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
Customers.prototype.updateClientDomain = function(domainid, opts, callback) {
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
Customers.prototype.getContacts = function(userid, opts, callback) {
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
Customers.prototype.getClientsDetails = function(clientid, opts, callback) {
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

/**
 * Get customer - http://docs.whmcs.com/API:Get_Clients_Details
 * @param email String
 * @param [opts] Object
 * @param callback
 */
Customers.prototype.getCustomerByEmail = function(email, opts, callback) {
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

/**
 * Delete customer - http://docs.whmcs.com/API:Delete_Client
 * @param clientid String
 * @param callback
 */
Customers.prototype.deleteCustomer = function(clientid, callback) {
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

/**
 * Get customer products - http://docs.whmcs.com/API:Get_Clients_Products
 * @param clientid String
 * @param [opts] Object
 * @param [opts.clientid] String
 * @param [opts.serviceid] String
 * @param [opts.domain] String
 * @param [opts.pid] String
 * @param [opts.username2] String
 * @param [opts.limitstart] String Used for pagination
 * @param [opts.limitnum] String Number of records to retrieve, Default = 999999
 * @param callback
 */
Customers.prototype.getCustomerProducts = function(clientid, opts, callback) {
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

/**
 * Update customer product - http://docs.whmcs.com/API:Update_Client_Product
 * @param serviceid String
 * @param [service] Object
 * @param [service.pid] String
 * @param [service.serverid] String
 * @param [service.regdate] String Format: YYYY-MM-DD
 * @param [service.nextduedate] String Format: YYYY-MM-DD
 * @param [service.domain] String
 * @param [service.firstpaymentamount] String
 * @param [service.recurringamount] String
 * @param [service.billingcycle] String
 * @param [service.paymentmethod] String
 * @param [service.status] String
 * @param [service.serviceusername] String
 * @param [service.servicepassword] String] String
 * @param [service.subscriptionid] String
 * @param [service.promoid] String
 * @param [service.overideautosuspend] Boolean
 * @param [service.overidesuspenduntil] String Format: YYYY-MM-DD
 * @param [service.ns1] String
 * @param [service.ns2] String
 * @param [service.dedicatedip] String
 * @param [service.assignedips] String
 * @param [service.notes] String
 * @param [service.autorecalc] Boolean
 * @param [service.customfields] String Base64 encoded string of custom field values
 * @param [service.configoptions] String Base64 encoded string of configurable options values
 * @param callback
 */
Customers.prototype.updateCustomerProduct = function(serviceid, service, callback) {
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

/**
 * Send email - http://docs.whmcs.com/API:Send_Email
 * @param id String
 * @param opts Object
 * @param [opts.messagename] String Unique name of the email template to send from WHMCS
 * @param [opts.customtype] String Type of email: general, product, domain, invoice, support or affiliate
 * @param [opts.customsubject] String
 * @param [opts.custommessage] String
 * @param [opts.customvars] String Base64 encoded serialized string of custom message variables
 * @param callback
 */
Customers.prototype.sendEmail = function(id, opts, callback) {
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

/**
 * Get customer domains - http://docs.whmcs.com/API:Get_Clients_Domains
 * @param [opts] Object
 * @param [opts.clientid] String
 * @param [opts.domainid] String
 * @param [opts.domain] String
 * @param [opts.limitstart] String Used for pagination
 * @param [opts.limitnum] String Number of records to retrieve. Default = 25
 * @param [opts.getnameservers] Boolean
 * @param callback
 */
Customers.prototype.getCustomerDomains = function(clientid, opts, callback) {
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

/**
 * Get emails - http://docs.whmcs.com/API:Get_Emails
 * @param clientid String
 * @param [opts] Object
 * @param [opts.date] String Can be YYYYMMDD, YYYYMM, MMDD, DD or MM
 * @param [opts.subject] String
 * @param [opts.limitstart] String where to start the records. Used for pagination
 * @param [opts.limitnum] String the number of records to retrieve. Default = 25
 * @param callback
 */
Customers.prototype.getCustomerEmails = function(clientid, opts, callback) {
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

/**
 * Get invoices - http://docs.whmcs.com/API:Get_Invoices
 * @param [opts] Object
 * @param [opts.userid] String
 * @param [opts.status] String Paid, Unpaid, Cancelled, Overdue, etc.
 * @param [opts.limitstart] String where to start the records. Used for pagination
 * @param [opts.limitnum] String the number of records to retrieve. Default = 25
 * @param callback
 */
Customers.prototype.getCustomerInvoices = function(userid, opts, callback) {
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

/**
 * Get customer orders - http://docs.whmcs.com/API:Get_Orders
 * @param [opts] Object
 * @param [opts.userid] String
 * @param [opts.status] String Paid, Unpaid, Cancelled, Overdue, etc.
 * @param [opts.limitstart] String where to start the records. Used for pagination
 * @param [opts.limitnum] String the number of records to retrieve. Default = 25
 * @param callback
 */
Customers.prototype.getCustomerOrders = function(opts, callback) {
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

/**
 * Validate login - http://docs.whmcs.com/API:Validate_Login
 * @param email String
 * @param password String
 * @param callback
 */
Customers.prototype.validateLogin = function(email, password, callback) {
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

/**
 * Obtain the Clients Product Addons that match passed criteria - https://developers.whmcs.com/api-reference/getclientsaddons/
 * @param [opts] Object
 * @param [opts.serviceid] Int - The service id(s) to obtain the client product addons for. Single number or comma separated list
 * @param [opts.clientid] Int - The client to obtain the client product addons for
 * @param [opts.addonid] Int - The predefined addon id to obtain the client product addons for
 * @param callback
 */
Customers.prototype.getClientsAddons = function(opts, callback) {
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

/**
 * Obtain quotes matching the passed criteria - https://developers.whmcs.com/api-reference/getquotes/
 * @param [opts] Object
 * @param [opts.limitstart] Int - The offset for the returned quote data (default: 0)
 * @param [opts.limitnum] Int - The number of records to return (default: 25)
 * @param [opts.quoteid] Int - Obtain a specific quote id
 * @param [opts.userid] Int - Find quotes for a specific client id
 * @param [opts.subject] String - Find quotes for a specific subject
 * @param [opts.stage] String - Find quotes for a specific stage (‘Draft’,‘Delivered’,‘On Hold’,‘Accepted’,‘Lost’,‘Dead’)
 * @param [opts.datecreated] String - Find quotes for a specific created date. Format: Y-m-d
 * @param [opts.lastmodified] String - Find quotes for a specific last modified date. Format: Y-m-d
 * @param [opts.validuntil] String - Find quotes for a specific valid until date. Format: Y-m-d
 * @param callback
 */
Customers.prototype.getQuotes = function(opts, callback) {
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

/**
 * Obtain transactions matching the passed criteria - https://developers.whmcs.com/api-reference/gettransactions/
 * @param [opts] Object
 * @param [opts.invoiceid] Int - Obtain transactions for a specific invoice id
 * @param [opts.clientid] Int - Find transactions for a specific client id
 * @param [opts.transid] String - Find transactions for a specific transaction id
 * @param callback
 */
Customers.prototype.getTransactions = function(opts, callback) {
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


module.exports = Customers;
