var utils = require('./utils');


var Support = function(config) {
  this.config = config;
};

Support.prototype.openTicket = function (clientid, department, subject, message, callback) {
  var self = this;
  var options = {};

  options.action = 'openticket';
  options.clientid = clientid;
  options.deptid = department;
  options.subject = subject;
  options.message = message;
  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Support.prototype.getTicket = function (ticketid, callback) {
  var self = this;
  var options = {};

  options.action = 'getticket';
  options.ticketid = ticketid;
  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Support.prototype.replyTicket = function (clientid, ticketid, message, callback) {
  var self = this;
  var options = {};

  options.action = 'addticketreply';
  options.clientid = clientid;
  options.ticketid = ticketid;
  options.message = message;
  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Support;
