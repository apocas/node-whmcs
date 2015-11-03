var utils = require('../lib/utils');
var extend = utils.extend;

var Utilities = function(config) {
  this.config = config;
};


Utilities.prototype.getToDoItems = function(status, offset, limit, callback) {
  var options = {
    action: 'gettodoitems'
  };


  if (typeof status !== 'undefined') {
    options.status = status;
  }
  if (typeof offset !== 'undefined') {
    options.limitstart = offset;
  }
  if (typeof limit !== 'undefined') {
    options.limitnum = limit;
  }

  var createOptions = {
    client: this,
    body: options
  };

  utils.modem(createOptions, callback);
};

module.exports = Utilities;