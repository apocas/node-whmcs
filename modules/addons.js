var Addons = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Updates a Client Addon.
 * https://developers.whmcs.com/api-reference/updateclientaddon/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Addons.prototype.updateClientAddon = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateClientAddon', parameters, callback);
};

module.exports = Addons;
