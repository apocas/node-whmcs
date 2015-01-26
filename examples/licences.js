var WHMCS = require('../whmcs');

var config = {
  username: process.env.WHMCS_USER || 'username',
  apiKey: process.env.WHMCS_AK || 'accessKey',
  serverUrl: 'https://licenseapi.whmcs.com/resellerv2.php'
};

var wcexample = new WHMCS(config);


wcexample.licenses.listLicenses(function(err, data){
  if (err) {
    console.log('ERROR');
    console.log(err);
  } else {
    console.log(data);
  }
});
