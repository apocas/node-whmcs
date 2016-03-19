var utils = require('../lib/utils');
var extend = utils.extend;

var Billing = function(config) {
  this.config = config;
};

/**
 * Add order - http://docs.whmcs.com/API:Add_Order
 * @param clientid String|Number
 * @param order Object
 * @param order.clientid String|Number client id for order
 * @param order.pid String|Number product id
 * @param order.domain String domain name
 * @param order.billingcycle String
 * @param order.domaintype String Set for domain registration, register or transfer
 * @param order.regperiod String
 * @param order.eppcode String
 * @param order.paymentmethod String
 * @param [order.customfields] String Base64 encoded serialized array of custom field values
 * @param [order.configoptions] String Base64 encoded serialized array of configurable product options
 * @param [order.priceoverride] String
 * @param [order.promocode] String
 * @param [order.promooverride] String
 * @param [order.affid] String
 * @param [order.noinvoice] Boolean
 * @param [order.noinvoiceemail] Boolean
 * @param [order.noemail] Boolean
 * @param [order.clientip] String
 * @param [order.addons] String Comma separated list of addon ids
 * @param [order.hostname] String Hostname of the server
 * @param [order.ns1prefix] String Prefix to be used for the NS1 nameserver
 * @param [order.ns2prefix] String Prefix to be used for the NS2 nameserver
 * @param [order.rootpw] String Root password for the server
 * @param [order.contactid] String the ID of a contact to use for the domain registrant details
 * @param [order.dnsmanagement] Boolean True to enable
 * @param [order.domainfields] String Base64 encoded serialized array of the TLD specific field values
 * @param [order.emailforwarding] Boolean True to enable
 * @param [order.idprotection] Boolean True to enable
 * @param [order.nameserver1] String Domain registration only
 * @param [order.nameserver2] String Domain registration only
 * @param [order.nameserver3] String Domain registration only
 * @param [order.nameserver4] String Domain registration only
 * @param [order.domainrenewals] Object Name:value of domain to regperiod
 * @param callback
 */
Billing.prototype.addOrder = function (clientid, order, callback) {
  var options = {
    action: 'addorder',
    clientid: clientid
  };

  options = extend(options, order);

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Billing.prototype.createInvoice = function (clientid, invoice, callback) {
  var options = {
    action: 'createinvoice',
    userid: clientid
  };

  options = extend(options, invoice);

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Accept order - http://docs.whmcs.com/API:Accept_Order
 * @param orderid String|Number
 * @param [opts] Object
 * @param [opts.serverid] String
 * @param [opts.serviceusername] String
 * @param [opts.servicepassword] String
 * @param [opts.registrar] String
 * @param [opts.autosetup] Boolean
 * @param [opts.sendregistrar] Boolean
 * @param [opts.sendemail] Boolean
 * @param callback
 */
Billing.prototype.acceptOrder = function (orderid, opts, callback) {
  var options = {
    action: 'acceptorder',
    orderid: orderid
  };

  if(typeof opts === 'function'){
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
* Delete order - http://docs.whmcs.com/API:Cancel_Order
* @param orderid String|Number
* @param callback
*/
Billing.prototype.deleteOrder = function (orderid, callback) {
  var options = {
    action: 'deleteorder',
    orderid: orderid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Cancel order - http://docs.whmcs.com/API:Cancel_Order
 * @param orderid String|Number
 * @param callback
 */
Billing.prototype.cancelOrder = function (orderid, callback) {
  var options = {
    action: 'cancelorder',
    orderid: orderid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Add credit - http://docs.whmcs.com/API:Add_Credit
 * @param clientid String|Number
 * @param amount String|Number
 * @param description String
 * @param callback
 */
Billing.prototype.addCredit = function (clientid, amount, description, callback) {
  var options = {
    action: 'addcredit',
    clientid: clientid,
    amount: amount,
    description: description || 'Added via API'
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Pay invoice - http://docs.whmcs.com/API:Apply_Credit
 * @param invoiceid String|Number
 * @param [amount] String|Number
 * @param callback Function
 * @todo Deprecate this in favor of applyCredit
 */
Billing.prototype.payInvoice = function (invoiceid, amount, callback) {
  var options = {
    action: 'applycredit',
    invoiceid: invoiceid,
    amount: typeof amount !== 'undefined'? amount : 'full'
  };

  if(typeof amount === 'function'){
    callback = amount;
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Copy of payInvoice to reflect actual name of the API function found at http://docs.whmcs.com/API:Apply_Credit
 * @type {Function}
 */
Billing.prototype.applyCredit = Billing.prototype.payInvoice;

/**
 * Get invoice - http://docs.whmcs.com/API:Get_Invoice
 * @param invoiceid
 * @param callback
 */
Billing.prototype.getInvoice = function (invoiceid, callback) {
  var options = {
    action: 'getinvoice',
    invoiceid: invoiceid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Get invoices - http://docs.whmcs.com/API:Get_Invoices
 * @param userid String|Number
 * @param [opts] Object
 * @param [opts.userid] String
 * @param [opts.status] String Status to filter for: Paid, Unpaid, Cancelled, Overdue, etc.
 * @param [opts.limitstart] String
 * @param [opts.limitnum] String Default is 25
 * @param callback
 */
Billing.prototype.getInvoices = function (opts, callback) {
  var options = {
    action:'getinvoices'
  };

  if(typeof opts === 'function'){
    callback = opts;
  } else {
    options = extend(options,opts);
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Update invoice - http://docs.whmcs.com/API:Update_Invoice
 * @param invoiceid String|Number Invoice ID
 * @param [opts] object
 * @param [opts.itemdescription] Array Array of existing line item descriptions to update. Line ID from database needed, itemamount and itemtaxed should be passed when updating the description
 * @param [opts.itemamount] Array Array of existing line item amounts to update
 * @param [opts.itemtaxed] Array Array of existing line items taxed or not
 * @param [opts.newitemdescription] Array Array of new line item descriptipons to add
 * @param [opts.newitemamount] Array Array of new line item amounts
 * @param [opts.newitemtaxed] Array Array of new line items taxed or not
 * @param [opts.date] String Date of invoice format yyyymmdd
 * @param [opts.duedate] String Due date of invoice format yyyymmdd
 * @param [opts.datepaid] String Date invoice was paid format yyyymmdd
 * @param [opts.status] String Unpaid, Paid, Cancelled, Collection, Refunded, etc.
 * @param [opts.paymentmethod] String
 * @param [opts.notes] String
 * @param [opts.deletelineids] Array Array of line IDs for the current invoice to remove (tblinvoiceitems.id)
 * @param callback
 */
Billing.prototype.updateInvoice = function (invoiceid, opts, callback) {
  var options = {
    action: 'updateinvoice',
    invoiceid: invoiceid
  };

  if(typeof opts === 'function'){
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
 * Capture payment - http://docs.whmcs.com/API:Capture_Payment
 * @param invoiceid String|Number
 * @param [opts] Object
 * @param [opts.cvv] String
 * @param callback
 */
Billing.prototype.capturePayment = function (invoiceid, opts, callback) {
  var options = {
    action:'capturepayment',
    invoiceid:invoiceid
  };

  if(typeof opts === 'function'){
    callback = opts;
  } else {
    options = extend(options,opts);
  }

  var createOptions = {
    client: this,
    body: options
  };
  
  utils.modem(createOptions, callback);
};

module.exports = Billing;