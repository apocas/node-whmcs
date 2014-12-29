var WHMCS = require('../whmcs');

var validConfig = {
  username: process.env.WHMCS_USER || 'username',
  password: process.env.WHMCS_KEY || 'password',
  apiKey: process.env.WHMCS_AK || 'accessKey',
  serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1/includes/api.php'
};

var invalidConfig = {
  username: 'xxxxxxxxxx',
  password: 'xxxxxxxxxx',
  serverUrl: 'http://192.168.1.1/includes/api.php'
};

console.log(validConfig);

module.exports = {
  'client': new WHMCS(validConfig),
  'iclient': new WHMCS(invalidConfig)
};
