module.exports.validConfig = {
  username: process.env.WHMCS_USER || 'username',
  password:  process.env.WHMCS_PASSWORD || 'password',
  serverUrl:  process.env.WHMCS_URL || 'http://192.168.1.1/includes/api.php'
};

module.exports.invalidConfig = {
  username: 'xxxxxxxxxx',
  password: 'xxxxxxxxxx',
  serverUrl: 'http://192.168.1.1/includes/api.php'
};
