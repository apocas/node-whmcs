var utils = require('./utils');
var _ = require('underscore');

module.exports = {
    /**
     * Get a list of tickets
     * @param options {*} See http://docs.whmcs.com/API:Get_Tickets for list of available params
     * @param callback function
     */
    getTickets:function(options,callback){
        var defaults = {
            action: 'gettickets',
            responsetype: 'json',
            username: this.config.username,
            password: this.config.apiKey
        };

        options = _.extend(defaults,options);

        var createOptions = {
            method:'POST',
            uri:'',
            client:this,
            body:options
        };

        utils.modem(createOptions,callback);
    },

    openTicket:function(clientid,department,subject,message,callback){
        var self = this;
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
            method:'POST',
            uri:'',
            client:this,
            body:options
        };

        utils.modem(createOptions,callback);
    },

    getTicket:function(ticketid,callback){
        var self = this;
        var options = {};

        options.action = 'getticket';
        options.ticketid = ticketid;
        options.responsetype = "json";
        options.username = this.config.username;
        options.password = this.config.apiKey;

        var createOptions = {
            method:'POST',
            uri:'',
            client:this,
            body:options
        };

        utils.modem(createOptions,callback);
    },

    addNote: function(data,callback){
        var self = this;
        var options = {};

        options.action = 'addticketnote';
        options.ticketid = data.ticketid;
        options.message = data.message;

        options.responsetype = "json";
        options.username = this.config.username;
        options.password = this.config.apiKey;

        var createOptions = {
            method:'POST',
            uri:'',
            client:this,
            body:options
        };

        utils.modem(createOptions,callback);
    },

    replyTicket:function(data,callback){
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
        options.username = this.config.username;
        options.password = this.config.apiKey;

        var createOptions = {
            method:'POST',
            uri:'',
            client:this,
            body:options
        };

        utils.modem(createOptions,callback);
    }
};