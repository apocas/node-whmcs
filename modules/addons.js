class Addons {
  /**
   * Creates a new Addons object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Updates a Client Addon.
   * https://developers.whmcs.com/api-reference/updateclientaddon/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateClientAddon(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateClientAddon', parameters, callback);
  };
}

module.exports = Addons;
