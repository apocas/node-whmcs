var utils = require('../lib/utils');
var extend = utils.extend;

var Billing = function(config) {
  this.config = config;
};

//https://developers.whmcs.com/api-reference/addorder/
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

//https://developers.whmcs.com/api-reference/createinvoice/
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

//https://developers.whmcs.com/api-reference/acceptorder/
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

//https://developers.whmcs.com/api-reference/deleteorder/
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

//https://developers.whmcs.com/api-reference/cancelorder/
Billing.prototype.cancelOrder = function (orderid, opts, callback) {
  var options = {
    action: 'cancelorder',
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

//https://developers.whmcs.com/api-reference/addcredit/
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

//https://developers.whmcs.com/api-reference/applycredit/
Billing.prototype.applyCredit = function (invoiceid, amount, callback) {
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


//https://developers.whmcs.com/api-reference/getinvoice/
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

//https://developers.whmcs.com/api-reference/getinvoices/
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

//https://developers.whmcs.com/api-reference/updateinvoice/
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

//https://developers.whmcs.com/api-reference/getpaymentmethods/
Billing.prototype.getPaymentMethods = function (callback) {
  var options = {
    action: 'getpaymentmethods',
  };


  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//https://developers.whmcs.com/api-reference/capturepayment/
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