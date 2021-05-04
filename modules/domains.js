var Domains = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Create or Update a TLD Extension.
 * https://developers.whmcs.com/api-reference/createorupdatetld/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.createOrUpdateTLD = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('CreateOrUpdateTLD', parameters, callback);
};

/**
 * Obtains the current lock status of the domain.
 * https://developers.whmcs.com/api-reference/domaingetlockingstatus/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainGetLockingStatus = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainGetLockingStatus', parameters, callback);
};

/**
 * Obtains the current nameservers for the domain.
 * https://developers.whmcs.com/api-reference/domaingetnameservers/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainGetNameservers = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainGetNameservers', parameters, callback);
};

/**
 * Obtains the current whois information for the domain.
 * https://developers.whmcs.com/api-reference/domaingetwhoisinfo/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainGetWhoisInfo = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainGetWhoisInfo', parameters, callback);
};

/**
 * Sends the Register command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainregister/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainRegister = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainRegister', parameters, callback);
};

/**
 * Sends the Release command to the registrar for the domain to a new tag.
 * https://developers.whmcs.com/api-reference/domainrelease/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainRelease = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainRelease', parameters, callback);
};

/**
 * Sends the Renew command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainrenew/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainRenew = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainRenew', parameters, callback);
};

/**
 * Sends the Request EPP command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainrequestepp/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainRequestEPP = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainRequestEPP', parameters, callback);
};

/**
 * Sends the Toggle ID Protect command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domaintoggleidprotect/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainToggleIdProtect = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainToggleIdProtect', parameters, callback);
};

/**
 * Sends the Transfer command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domaintransfer/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainTransfer = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainTransfer', parameters, callback);
};

/**
 * Sends the Update Lock command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainupdatelockingstatus/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainUpdateLockingStatus = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainUpdateLockingStatus', parameters, callback);
};

/**
 * Sends the Save Nameservers command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainupdatenameservers/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainUpdateNameservers = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainUpdateNameservers', parameters, callback);
};

/**
 * Sends the Save Whois command to the registrar for the domain.
 * https://developers.whmcs.com/api-reference/domainupdatewhoisinfo/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainUpdateWhoisInfo = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainUpdateWhoisInfo', parameters, callback);
};

/**
 * Retrieve domain whois information.
 * https://developers.whmcs.com/api-reference/domainwhois/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.domainWhois = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DomainWhois', parameters, callback);
};

/**
 * Retrieve TLD pricing.
 * https://developers.whmcs.com/api-reference/gettldpricing/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.getTLDPricing = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetTLDPricing', parameters, callback);
};

/**
 * Updates a Client Domain.
 * https://developers.whmcs.com/api-reference/updateclientdomain/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Domains.prototype.updateClientDomain = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateClientDomain', parameters, callback);
};

module.exports = Domains;
