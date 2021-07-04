class Affiliates {
  /**
   * Creates a new Affiliates object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Activate affiliate referrals for a client.
   * https://developers.whmcs.com/api-reference/affiliateactivate/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  affiliateActivate(parameters, callback) {
    return this.whmcsHttpClient.callApi('AffiliateActivate', parameters, callback);
  };

  /**
   * Obtain an array of affiliates
   * https://developers.whmcs.com/api-reference/getaffiliates/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getAffiliates(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetAffiliates', parameters, callback);
  };
}

module.exports = Affiliates;
