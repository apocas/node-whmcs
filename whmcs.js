var fs = require('fs');
var libPath = __dirname + '/modules';

/**
 * WHMCS client
 * @param options {{username:String,serverUrl:String,password:String,apiKey:[String]}}
 */
var WHMCS = function(options) {
  var _this = this;

  this.utils = require('./lib/utils');

  ['username', 'serverUrl', 'password'].forEach(function(required) {
    if (!options[required]) {
      throw new Error('options.' + required + ' is a required argument.');
    }
  });

  if (typeof options.password !== 'string' && typeof options.apiKey === 'string') {
    throw new Error('You must specify a password with your apiKey');
  }

  this.config = options;
  this.authorized = false;

  // Add all the modules
  var files = fs.readdirSync(libPath);
  var i = 0;
  var len = files.length;
  while (i < len) {
    var name = files[i].replace('.js', '');
    var Item = require(libPath + '/' + name);
    _this[name] = new Item();
    _this[name].config = _this.config;

    i++;
  }
};

module.exports = WHMCS;
