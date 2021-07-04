class Users {
  /**
   * Creates a new Users object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Add a user.
   * https://developers.whmcs.com/api-reference/adduser/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addUser(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddUser', parameters, callback);
  };

  /**
   * Send an invite to manage a client.
   * https://developers.whmcs.com/api-reference/createclientinvite/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  createClientInvite(parameters, callback) {
    return this.whmcsHttpClient.callApi('CreateClientInvite', parameters, callback);
  };

  /**
   * Delete relationship between user and client.
   * https://developers.whmcs.com/api-reference/deleteuserclient/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteUserClient(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteUserClient', parameters, callback);
  };

  /**
   * Retrieve a list of permissions that can be used when creating a user.
   * https://developers.whmcs.com/api-reference/getpermissionslist/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getPermissionsList(callback) {
    return this.whmcsHttpClient.callApi('GetPermissionsList', callback);
  };

  /**
   * Provide the permissions of a user for a client.
   * https://developers.whmcs.com/api-reference/getuserpermissions/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getUserPermissions(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetUserPermissions', parameters, callback);
  };

  /**
   * Obtain the Users that match passed criteria.
   * https://developers.whmcs.com/api-reference/getusers/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getUsers(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetUsers', parameters, callback);
  };

  /**
   * Starts the password reset process for a user.
   * https://developers.whmcs.com/api-reference/resetpassword/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  resetPassword(parameters, callback) {
    return this.whmcsHttpClient.callApi('ResetPassword', parameters, callback);
  };

  /**
   * Update a user.
   * https://developers.whmcs.com/api-reference/updateuser/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateUser(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateUser', parameters, callback);
  };

  /**
   * Update the permissions of a user for a client.
   * https://developers.whmcs.com/api-reference/updateuserpermissions/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateUserPermissions(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateUserPermissions', parameters, callback);
  };
}

module.exports = Users;