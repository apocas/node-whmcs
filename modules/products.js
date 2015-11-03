var utils = require('../lib/utils');

var Products = function(config) {
  this.config = config;
};

/**
 * Get a product by ID
 * @param id
 * @todo Deprecate this in favor of getProductsByType
 * @param callback
 */
Products.prototype.getProduct = function(id, callback) {
  this.getProductsByType('product', id, callback);
};

/**
 * Get product group by ID
 * @param gid
 * @todo Deprecate this in favor of getProductsByType
 * @param callback
 */
Products.prototype.getProducts = function(gid, callback) {
  this.getProductsByType('group', gid, callback);
};

/**
 * Get products by type and ID
 * @param type String product|group|module
 * @param id String|Number
 * @param callback
 */
Products.prototype.getProductsByType = function(type, id, callback) {
  var options = {
    action: 'getproducts'
  };

  switch (type) {
    case 'product':
      options.pid = id;
      break;
    case 'group':
      options.gid = id;
      break;
    case 'module':
      options.module = id;
      break;
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

/**
 * Get orders by a specific method like id, userid, or status
 * @param method String id|userid|status
 * @param id String
 * @param [offset] String|Number Default is 0
 * @param [limit] String|Number Default is 25
 * @param callback
 */
Products.prototype.getOrders = function(method, id, offset, limit, callback) {
  var options = {
    action: 'getorders'
  };

  var args = utils.getArgs(arguments);

  // Remove first 2 args
  args.shift();
  args.shift();

  // Pop off the callback, what remains is offset and limit
  callback = args.pop();

  // Shift the rest, returns undefined if nothing left
  offset = args.shift();
  limit = args.shift();

  if (typeof offset !== 'undefined') {
    options.limitstart = offset;
  }

  if (typeof limit !== 'undefined') {
    options.limitnum = limit;
  }

  switch (method) {
    case 'id':
      options.id = id;
      break;
    case 'userid':
      options.userid = id;
      break;
    case 'status':
      options.status = id;
      break;
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Products;
