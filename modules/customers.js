var utils = require('../lib/utils');
var extend = utils.extend;

var Customers = function(config) {
  this.config = config;
};

/**
 * Create customer - http://docs.whmcs.com/API:Add_Client
 * @param customer Object
 * @param customer.firstname] String
 * @param customer.lastname] String
 * @param customer.email] String
 * @param customer.address1] String
 * @param customer.city] String
 * @param customer.state] String
 * @param customer.postcode] String
 * @param customer.country] String Two letter ISO country code
 * @param customer.phonenumber] String
 * @param customer.password2] String
 * @param [customer.companyname] String
 * @param [customer.address2] String
 * @param [customer.currency] String
 * @param [customer.clientip] String
 * @param [customer.language] String
 * @param [customer.groupid] String
 * @param [customer.securityqid] String
 * @param [customer.securityqans] String
 * @param [customer.notes] String
 * @param [customer.cctype] String
 * @param [customer.cardnum] String
 * @param [customer.expdate] String
 * @param [customer.startdate] String
 * @param [customer.issuenumber] String
 * @param [customer.customfields] String Base64 encoded string custom field values
 * @param [customer.noemail] Boolean
 * @param [customer.skipvalidation] Boolean
 * @param callback
 */
Customers.prototype.createCustomer = function(customer, callback) {
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

/**
 * Create contact - http://docs.whmcs.com/API:Add_Contact
 * @param contact Object
 * @param contact.clientid String
 * @param [contact.firstname] String
 * @param [contact.lastname] String
 * @param [contact.companyname] String
 * @param [contact.email] String Must be unique if creating a sub-account
 * @param [contact.address1] String
 * @param [contact.address2] String
 * @param [contact.city] String
 * @param [contact.state] String
 * @param [contact.postcode] String
 * @param [contact.country] String Two letter ISO country code
 * @param [contact.phonenumber] String
 * @param [contact.password2] String
 * @param [contact.permissions] String manageproducts, managedomains, etc.
 * @param [contact.generalemails] Boolean
 * @param [contact.productemails] Boolean
 * @param [contact.domainemails] Boolean
 * @param [contact.invoiceemails] Boolean
 * @param [contact.supportemails] Boolean
 * @param callback
 */
Customers.prototype.createContact = function(contact, callback) {
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

/**
 * Upgrade product - http://docs.whmcs.com/API:Upgrade_Product
 * @param serviceid String
 * @param data Object
 * @param data.clientid String
 * @param data.serviceid String
 * @param data.type String product or configoptions
 * @param data.newproductid String
 * @param data.newproductbillingcycle
 * @param data.configoptions String|Array Array of config options if upgrade type is configoptions
 * @param data.paymentmethod String
 * @param [data.promocode] String
 * @param [data.calconly] Boolean Set true to just validate upgrade and get price, false to create order
 * @param [data.ordernotes] String
 * @param callback
 */
Customers.prototype.updateService = function(serviceid, data, callback) {
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

/**
 * Delete contact - http://docs.whmcs.com/API:Delete_Contact
 * @param contactid String
 * @param callback
 */
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

/**
 * Update contact - http://docs.whmcs.com/API:Update_Contact
 * @param contactid String
 * @param contact Object
 * @param contact.clientid String
 * @param [contact.firstname] String
 * @param [contact.lastname] String
 * @param [contact.companyname] String
 * @param [contact.email] String Must be unique if creating a sub-account
 * @param [contact.address1] String
 * @param [contact.address2] String
 * @param [contact.city] String
 * @param [contact.state] String
 * @param [contact.postcode] String
 * @param [contact.country] String Two letter ISO country code
 * @param [contact.phonenumber] String
 * @param [contact.password2] String
 * @param [contact.permissions] String manageproducts, managedomains, etc.
 * @param [contact.generalemails] Boolean
 * @param [contact.productemails] Boolean
 * @param [contact.domainemails] Boolean
 * @param [contact.invoiceemails] Boolean
 * @param [contact.supportemails] Boolean
 * @param callback
 */
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

/**
 * Update customer - http://docs.whmcs.com/API:Update_Client
 * @param clientid String
 * @param customer Object
 * @param[customer.firstname] String
 * @param[customer.lastname] String
 * @param[customer.companyname] String
 * @param[customer.email] String
 * @param[customer.address1] String
 * @param[customer.address2] String
 * @param[customer.city] String
 * @param[customer.state] String
 * @param[customer.postcode] String
 * @param[customer.country] String Two letter ISO country code
 * @param[customer.phonenumber] String
 * @param[customer.password2] String
 * @param[customer.credit] String Credit balance
 * @param[customer.taxexempt] Boolean
 * @param[customer.notes] String
 * @param[customer.cardtype] String
 * @param[customer.cardnum] String CC number
 * @param[customer.expdate] String CC expiry date
 * @param[customer.startdate] String CC start date
 * @param[customer.issuenumber] String CC issue number
 * @param[customer.clearcreditcard] Boolean
 * @param[customer.language] String
 * @param[customer.customfields] String Base64 encoded string of custom field values
 * @param[customer.status] Boolean
 * @param[customer.taxexempt] Boolean
 * @param[customer.latefeeoveride] Boolean
 * @param[customer.overideduenotices] Boolean
 * @param[customer.separateinvoices] Boolean
 * @param[customer.disableautocc] Boolean
 * @param callback
 */
Customers.prototype.updateCustomer = function(clientid, customer, callback) {
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

/**
 * Update customer domain - http://docs.whmcs.com/API:Update_Client_Domain
 * @param domainid String|Number Pass in domain id or name
 * @param [opts] Object
 * @param [opts.type] String Register or Transfer
 * @param [opts.autorecalc] Boolean
 * @param [opts.regdate] String Update the registration date yyyymmdd
 * @param [opts.domain] String Update the domain name
 * @param [opts.firstpaymentamount] String Set the first payment amount. No symbol, just xx.xx
 * @param [opts.recurringamount] String Setup fee cost. No symbol, just xx.xx
 * @param [opts.registrar] String Update the registrar assigned to the domain
 * @param [opts.billingcycle] String One of Free Account, One Time, Monthly, Quarterly, Semi-Annually, Annually, Biennially or Triennially
 * @param [opts.status] String One of Active, Pending, Pending Transfer, Expired, Cancelled, Fraud
 * @param [opts.nextduedate] String Update the next due date yyyymmdd
 * @param [opts.nextinvoicedate] String Update the next invoice date yyyymmdd
 * @param [opts.expirydate] String Update the expiry date yyyymmdd
 * @param [opts.regperiod] String Update the reg period for the domain. 1-10
 * @param [opts.paymentmethod] String set the payment method
 * @param [opts.subscriptionid] String allocate a subscription ID
 * @param [opts.dnsmanagement] Boolean
 * @param [opts.emailforwarding] Boolean
 * @param [opts.idprotection] Boolean
 * @param [opts.donotrenew] Boolean
 * @param [opts.updatens] Boolean Set to true to update Nameservers
 * @param [opts.ns1] String
 * @param [opts.ns2] String
 * @param [opts.ns3] String
 * @param [opts.ns4] String
 * @param [opts.ns5] String
 * @param [opts.notes] String
 * @param callback
 */
Customers.prototype.updateCustomerDomain = function(domainid, opts, callback) {
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

/**
 * Get contacts - http://docs.whmcs.com/API:Get_Contacts
 * @param userid String
 * @param [opts] Object
 * @param [opts.limitstart] String
 * @param [opts.limitnum] String Default is 25
 * @param [opts.userid] String
 * @param [opts.firstname] String
 * @param [opts.lastname] String
 * @param [opts.companyname] String
 * @param [opts.email] String
 * @param [opts.address1] String
 * @param [opts.address2] String
 * @param [opts.city] String
 * @param [opts.state] String
 * @param [opts.postcode] String
 * @param [opts.country] String
 * @param [opts.phonenumber] String
 * @param [opts.subaccount] Boolean
 * @param callback
 */
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

/**
 * Get customer - http://docs.whmcs.com/API:Get_Clients_Details
 * @param clientid String Client ID or email
 * @param [opts] Object
 * @param callback
 */
Customers.prototype.getCustomer = function(clientid, opts, callback) {
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
