class Client {
  /**
   * Creates a new Client object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Adds a client.
   * https://developers.whmcs.com/api-reference/addclient/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addClient(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddClient', parameters, callback);
  };

  /**
   * Adds a contact to a client account.
   * https://developers.whmcs.com/api-reference/addcontact/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addContact(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddContact', parameters, callback);
  };

  /**
   * Close a Client.
   * https://developers.whmcs.com/api-reference/closeclient/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  closeClient(parameters, callback) {
    return this.whmcsHttpClient.callApi('CloseClient', parameters, callback);
  };

  /**
   * Deletes a client.
   * https://developers.whmcs.com/api-reference/deleteclient/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteClient(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteClient', parameters, callback);
  };

  /**
   * Deletes a contact.
   * https://developers.whmcs.com/api-reference/deletecontact/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteContact(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteContact', parameters, callback);
  };

  /**
   * Obtain an array of cancellation requests.
   * https://developers.whmcs.com/api-reference/getcancelledpackages/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getCancelledPackages(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetCancelledPackages', parameters, callback);
  };

  /**
   * Obtain an array of client groups.
   * https://developers.whmcs.com/api-reference/getclientgroups/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientGroups(callback) {
    return this.whmcsHttpClient.callApi('GetClientGroups', callback);
  };

  /**
   * Obtain the encrypted client password.
   * https://developers.whmcs.com/api-reference/getclientpassword/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientPassword(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClientPassword', parameters, callback);
  };

  /**
   * Obtain the Clients that match passed criteria.
   * https://developers.whmcs.com/api-reference/getclients/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClients(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClients', parameters, callback);
  };

  /**
   * Obtain the Clients Product Addons that match passed criteria.
   * https://developers.whmcs.com/api-reference/getclientsaddons/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientsAddons(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClientsAddons', parameters, callback);
  };

  /**
   * Obtain the Clients Details for a specific client.
   * https://developers.whmcs.com/api-reference/getclientsdetails/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientsDetails(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClientsDetails', parameters, callback);
  };

  /**
   * Obtain a list of Client Purchased Domains matching the provided criteria.
   * https://developers.whmcs.com/api-reference/getclientsdomains/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientsDomains(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClientsDomains', parameters, callback);
  };

  /**
   * Obtain a list of Client Purchased Products matching the provided criteria.
   * https://developers.whmcs.com/api-reference/getclientsproducts/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getClientsProducts(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetClientsProducts', parameters, callback);
  };

  /**
   * Obtain the Client Contacts that match passed criteria.
   * https://developers.whmcs.com/api-reference/getcontacts/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getContacts(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetContacts', parameters, callback);
  };

  /**
   * Obtain a list of emails sent to a specific Client ID.
   * https://developers.whmcs.com/api-reference/getemails/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getEmails(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetEmails', parameters, callback);
  };

  /**
   * Updates a client with the passed parameters.
   * https://developers.whmcs.com/api-reference/updateclient/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateClient(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateClient', parameters, callback);
  };

  /**
   * Updates a contact with the passed parameters.
   * https://developers.whmcs.com/api-reference/updatecontact/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateContact(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateContact', parameters, callback);
  };
}

module.exports = Client;