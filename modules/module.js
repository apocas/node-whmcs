var Module = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Activates a given module.
 * https://developers.whmcs.com/api-reference/activatemodule/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Module.prototype.activateModule = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('ActivateModule', parameters, callback);
};

/**
 * Deactivates a given module.
 * https://developers.whmcs.com/api-reference/deactivatemodule/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Module.prototype.deactivateModule = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeactivateModule', parameters, callback);
};

/**
 * Obtains the Module Configuration Parameters.
 * https://developers.whmcs.com/api-reference/getmoduleconfigurationparameters/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Module.prototype.getModuleConfigurationParameters = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetModuleConfigurationParameters', parameters, callback);
};

/**
 * Obtains the Module Queue for Incomplete Failed Actions.
 * https://developers.whmcs.com/api-reference/getmodulequeue/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Module.prototype.getModuleQueue = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetModuleQueue', parameters, callback);
};

/**
 * Updates a given module.
 * https://developers.whmcs.com/api-reference/updatemoduleconfiguration/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Module.prototype.updateModuleConfiguration = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateModuleConfiguration', parameters, callback);
};

module.exports = Module;