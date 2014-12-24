var utils = require('./../lib/utils');


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

Support.prototype.replyTicket = function (data, callback) {
  var self = this;
  var options = {};

  options.action = 'addticketreply';

  options.ticketid = data.ticketid;
  options.message = data.message;
  options.adminusername = data.adminusername || 'Auto-response';

  if(typeof data.clientid !== 'undefined'){
      options.clientid = data.clientid;
  }

  if(data.status){
      options.status = data.status;
  }

  if(data.email){
      options.email = data.emails;
  }

  if(data.name){
      options.name = data.name;
  }

  if(data.customfields){
      options.customfields = data.customfields;
  }

  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Support;
