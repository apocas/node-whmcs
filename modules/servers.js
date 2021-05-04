var Servers = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Get health status.
 * https://developers.whmcs.com/api-reference/gethealthstatus/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Servers.prototype.getHealthStatus = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetHealthStatus', parameters, callback);
};

/**
 * Get servers.
 * https://developers.whmcs.com/api-reference/getservers/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Servers.prototype.getServers = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetServers', parameters, callback);
};

module.exports = Servers;
