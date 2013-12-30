var utils = require('./utils');


module.exports = {


  openTicket: function (clientid, department, subject, message, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'openticket';
    options.clientid = clientid;
    options.deptid = department;
    options.subject = subject;
    options.message = message;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(undefined, JSON.parse(body));
    });
  },


  getTicket: function (ticketid, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'getticket';
    options.ticketid = ticketid;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(undefined, JSON.parse(body));
    });
  },


  replyTicket: function (clientid, ticketid, message, callback) {
    var templateId, self = this;
    var options = {};

    options.action = 'addticketreply';
    options.clientid = clientid;
    options.ticketid = ticketid;
    options.message = message;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback, function(body, response) {
      callback(undefined, JSON.parse(body));
    });
  }

};