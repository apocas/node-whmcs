var utils = require('./../lib/utils');


var Products = function(config) {
  this.config = config;
};

Products.prototype.getProduct = function (id, callback) {
  var self = this;
  var options = {};

  options.action = 'getproducts';
  options.pid = id;
  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  //console.log(createOptions);

  utils.modem(createOptions, callback);
};


Products.prototype.getProducts = function (gid, callback) {
  var self = this;
  var options = {};

  options.action = 'getproducts';
  if(gid !== undefined) {
    options.gid = gid;
  }

  options.responsetype = "json";

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

Products.prototype.getOrders = function (id, status, limit, callback) {
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

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Products;
