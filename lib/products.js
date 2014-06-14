var utils = require('./utils');


module.exports = {

  getProduct: function (id, callback) {
    var self = this;
    var options = {};

    options.action = 'getproducts';
    options.pid = id;
    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    //console.log(createOptions);

    utils.modem(createOptions, callback);
  },


  getProducts: function (gid, callback) {
    var self = this;
    var options = {};

    options.action = 'getproducts';
    if(gid !== undefined) {
      options.gid = gid;
    }

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback);
  },

  getOrders: function (id, status, limit, callback) {
    var self = this;
    var options = {};

    options.action = 'getorders';

    if(id) {
      options.id = id;
    }

    if(status) {
      options.status = status;
    }

    if(limit) {
      options.limitnum = limit;
    }

    options.responsetype = "json";
    options.username = this.config.username;
    options.password = this.config.apiKey;

    var createOptions = {
      method: 'POST',
      uri: '',
      client: this,
      body: options
    };

    utils.modem(createOptions, callback);
  }

};