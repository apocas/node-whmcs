var utils = require('../lib/utils');
var extend = utils.extend;

var Support = function(config) {
  this.config = config;
};

//http://docs.whmcs.com/API:Open_Ticket
Support.prototype.openTicket = function (clientid, department, subject, message, opts, callback) {
  var options = {
    action: 'openticket',
    clientid: clientid,
    deptid: department,
    subject: subject,
    message: message
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

//http://docs.whmcs.com/API:Delete_Ticket
Support.prototype.deleteTicket = function (ticketid, callback) {
  var options = {
    action: 'deleteticket',
    ticketid: ticketid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//http://docs.whmcs.com/API:Get_Ticket
Support.prototype.getTicket = function (ticketid, callback) {
  var options = {
    action: 'getticket',
    ticketid: ticketid
  };

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//http://docs.whmcs.com/API:Reply_Ticket
Support.prototype.replyTicket = function (ticketid, message, opts, callback) {
  var options = {
    action: 'addticketreply',
    ticketid: ticketid,
    message: message
  };

  if(typeof opts === 'function'){
    callback = opts;
  } else {
    options = extend(options, opts);
  }

  if(typeof options.adminusername === 'undefined' && typeof options.clientid === 'undefined'){
    options.adminusername = 'Auto-response';
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

//http://docs.whmcs.com/API:Get_Tickets
Support.prototype.getTickets = function (opts, callback) {
  var options = {
    action: 'gettickets'
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

//http://docs.whmcs.com/API:Update_Ticket
Support.prototype.updateTicket = function (opts, callback) {
  var options = {
    action: 'updateticket'
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

//https://developers.whmcs.com/api-reference/getticketattachment/
Support.prototype.getTicketAttachment = function (relatedId, type, index, opts, callback) {
  var options = {
    action: 'getticketattachment',
    relatedid: relatedId,
    type: type,
    index: index
  }

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
}

//https://developers.whmcs.com/api-reference/getsupportdepartments/
Support.prototype.getSupportDepartments = function(opts, callback) {
  var options = {
    action: 'getsupportdepartments'
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
}

module.exports = Support;
