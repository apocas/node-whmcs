var utils = require('../lib/utils');
var extend = utils.extend;

var Support = function(config) {
  this.config = config;
};

/**
 * Open ticket - http://docs.whmcs.com/API:Open_Ticket
 * @param clientid String|Number
 * @param department Number
 * @param subject String
 * @param message String
 * @param [opts] Object
 * @param [opts.priority] String Low, Medium, High, etc. (Default = Low)
 * @param [opts.contactid] String|Number ID of the contact to associate the ticket with
 * @param [opts.name] String Required if not a registered client (clientid must be set to 0)
 * @param [opts.email] String Rquired if not a registered client
 * @param [opts.admin] String
 * @param [opts.serviceid] String
 * @param [opts.domainid] String
 * @param [opts.customfields] String Base 64 serialized array of field IDs => values
 * @param [opts.noemail] Boolean
 * @param callback
 */
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

/**
* Delete ticket - http://docs.whmcs.com/API:Delete_Ticket
* @param ticketid String|Number
* @param callback
*/
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

/**
 * Get ticket - http://docs.whmcs.com/API:Get_Ticket
 * @param ticketid String|Number
 * @param callback
 */
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

/**
 * Reply to ticket - http://docs.whmcs.com/API:Reply_Ticket
 * @param ticketid String|Number
 * @param message String
 * @param [opts] Object
 * @param [opts.clientid] String|Number Required if adding reply as a client
 * @param [opts.contactid] String|Number ID of contact for client if replying as a client
 * @param [opts.name] String Required to be set to 0 if not a registered client
 * @param [opts.email] String Required if not a registered client
 * @param [opts.adminusername] String Name to show on message
 * @param [opts.status] String
 * @param [opts.customfields] String Base64 encoded serialized array of custom fields
 * @param callback
 */
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

/**
* Get tickets - http://docs.whmcs.com/API:Get_Tickets
* @param [opts] Object
* @param [opts.limitstart] String where to start the records. Used for pagination
* @param [opts.limitnum] String the number of records to retrieve. Default = 25
* @param [opts.clientid] String
* @param [opts.email] String
* @param [opts.deptid] String
* @param [opts.status] String
* @param [opts.subject] String
* @param [opts.ignore_dept_assignments] Boolean
* @param callback
*/
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

/**
* Update ticket - http://docs.whmcs.com/API:Update_Ticket
* @param opts Object
* @param opts.ticketid String ID of the ticket to update
* @param [opts.deptid] String Update the assigned department
* @param [opts.subject] String Update the subject of the ticket
* @param [opts.priority] String Low, Medium, High
* @param [opts.status] String Open, Answered, Closed, etc.
* @param [opts.userid] String Change the user that the ticket is assigned to
* @param [opts.email] String Change the email address that opened the ticket (only when userid is not used)
* @param [opts.cc] String Add CC emails to the ticket
* @param [opts.flag] String Flag to an adminid
* @param callback
*/
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

module.exports = Support;
