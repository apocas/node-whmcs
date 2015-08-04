var WHMCS = require('../whmcs');

var validConfig = {
  username: process.env.WHMCS_USER || 'username',
  password: process.env.WHMCS_KEY || 'password',
  apiKey: process.env.WHMCS_AK || 'accessKey',
  serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1/includes/api.php',
  userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs'
};

module.exports = {
  'client': new WHMCS(validConfig)
};
