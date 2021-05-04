var Authentication = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Create an OAuth Credential
 * https://developers.whmcs.com/api-reference/createoauthcredential/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.createOAuthCredential = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('CreateOAuthCredential', parameters, callback);
};

/**
 * Create a single use, client or user single sign-on access token.
 * https://developers.whmcs.com/api-reference/createssotoken/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.createSsoToken = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('CreateSsoToken', parameters, callback);
};

/**
 * Removes OAuth Credential record. This action cannot be undone.
 * https://developers.whmcs.com/api-reference/deleteoauthcredential/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.deleteOAuthCredential = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteOAuthCredential', parameters, callback);
};

/**
 * List OAuth Credentials matching passed criteria.
 * https://developers.whmcs.com/api-reference/listoauthcredentials/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.listOAuthCredentials = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ListOAuthCredentials', parameters, callback);
};

/**
 * Updates a given OAuth API Client Credential.
 * https://developers.whmcs.com/api-reference/updateoauthcredential/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.updateOAuthCredential = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateOAuthCredential', parameters, callback);
};

/**
 * Validate user login credentials.
 * https://developers.whmcs.com/api-reference/validatelogin/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Authentication.prototype.validateLogin = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateOAuthCredential', parameters, callback);
};

module.exports = Authentication;
