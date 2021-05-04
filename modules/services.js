var Services = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Runs a change package action for a given service.
 * https://developers.whmcs.com/api-reference/modulechangepackage/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleChangePackage = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleChangePackage', parameters, callback);
};

/**
 * Runs a change password action for a given service.
 * https://developers.whmcs.com/api-reference/modulechangepw/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleChangePw = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleChangePw', parameters, callback);
};

/**
 * Runs the module create action for a given service.
 * https://developers.whmcs.com/api-reference/modulecreate/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleCreate = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleCreate', parameters, callback);
};

/**
 * Runs a custom module action for a given service.
 * https://developers.whmcs.com/api-reference/modulecustom/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleCustom = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleCustom', parameters, callback);
};

/**
 * Runs the module suspend action for a given service.
 * https://developers.whmcs.com/api-reference/modulesuspend/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleSuspend = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleSuspend', parameters, callback);
};

/**
 * Runs a terminate action for a given service.
 * https://developers.whmcs.com/api-reference/moduleterminate/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleTerminate = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleTerminate', parameters, callback);
};

/**
 * Runs an unsuspend action for a given service.
 * https://developers.whmcs.com/api-reference/moduleunsuspend/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.moduleUnsuspend = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ModuleUnsuspend', parameters, callback);
};

/**
 * Updates a Client Service.
 * https://developers.whmcs.com/api-reference/updateclientproduct/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.updateClientProduct = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateClientProduct', parameters, callback);
};

/**
 * Upgrade, or calculate an upgrade on, a product.
 * https://developers.whmcs.com/api-reference/upgradeproduct/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Services.prototype.upgradeProduct = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpgradeProduct', parameters, callback);
};

module.exports = Services;
