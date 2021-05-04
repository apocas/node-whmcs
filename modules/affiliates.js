var Affiliates = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Activate affiliate referrals for a client.
 * https://developers.whmcs.com/api-reference/affiliateactivate/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Affiliates.prototype.affiliateActivate = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AffiliateActivate', parameters, callback);
};

/**
 * Obtain an array of affiliates
 * https://developers.whmcs.com/api-reference/getaffiliates/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Affiliates.prototype.getAffiliates = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetAffiliates', parameters, callback);
};

module.exports = Affiliates;
