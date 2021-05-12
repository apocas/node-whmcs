class Service {
  /**
   * Creates a new Service object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Runs a change package action for a given service.
   * https://developers.whmcs.com/api-reference/modulechangepackage/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleChangePackage(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleChangePackage', parameters, callback);
  };

  /**
   * Runs a change password action for a given service.
   * https://developers.whmcs.com/api-reference/modulechangepw/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleChangePw(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleChangePw', parameters, callback);
  };

  /**
   * Runs the module create action for a given service.
   * https://developers.whmcs.com/api-reference/modulecreate/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleCreate(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleCreate', parameters, callback);
  };

  /**
   * Runs a custom module action for a given service.
   * https://developers.whmcs.com/api-reference/modulecustom/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleCustom(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleCustom', parameters, callback);
  };

  /**
   * Runs the module suspend action for a given service.
   * https://developers.whmcs.com/api-reference/modulesuspend/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleSuspend(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleSuspend', parameters, callback);
  };

  /**
   * Runs a terminate action for a given service.
   * https://developers.whmcs.com/api-reference/moduleterminate/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleTerminate(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleTerminate', parameters, callback);
  };

  /**
   * Runs an unsuspend action for a given service.
   * https://developers.whmcs.com/api-reference/moduleunsuspend/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  moduleUnsuspend(parameters, callback) {
    return this.whmcsHttpClient.callApi('ModuleUnsuspend', parameters, callback);
  };

  /**
   * Updates a Client Service.
   * https://developers.whmcs.com/api-reference/updateclientproduct/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateClientProduct(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateClientProduct', parameters, callback);
  };

  /**
   * Upgrade, or calculate an upgrade on, a product.
   * https://developers.whmcs.com/api-reference/upgradeproduct/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  upgradeProduct(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpgradeProduct', parameters, callback);
  };
}

module.exports = Service;
