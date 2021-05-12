class Module {
  /**
   * Creates a new Module object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Activates a given module.
   * https://developers.whmcs.com/api-reference/activatemodule/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  activateModule(parameters, callback) {
    return this.whmcsHttpClient.callApi('ActivateModule', parameters, callback);
  };

  /**
   * Deactivates a given module.
   * https://developers.whmcs.com/api-reference/deactivatemodule/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deactivateModule(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeactivateModule', parameters, callback);
  };

  /**
   * Obtains the Module Configuration Parameters.
   * https://developers.whmcs.com/api-reference/getmoduleconfigurationparameters/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getModuleConfigurationParameters(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetModuleConfigurationParameters', parameters, callback);
  };

  /**
   * Obtains the Module Queue for Incomplete Failed Actions.
   * https://developers.whmcs.com/api-reference/getmodulequeue/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getModuleQueue(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetModuleQueue', parameters, callback);
  };

  /**
   * Updates a given module.
   * https://developers.whmcs.com/api-reference/updatemoduleconfiguration/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateModuleConfiguration(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateModuleConfiguration', parameters, callback);
  };
}

module.exports = Module;