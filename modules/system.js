class System {
  /**
   * Creates a new System object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Adds an IP to the ban list.
   * https://developers.whmcs.com/api-reference/addbannedip/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addBannedIp(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddBannedIp', parameters, callback);
  };

  /**
   * Decrypt an encrypted string.
   * https://developers.whmcs.com/api-reference/decryptpassword/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  decryptPassword(parameters, callback) {
    return this.whmcsHttpClient.callApi('DecryptPassword', parameters, callback);
  };

  /**
   * Encrypt a string.
   * https://developers.whmcs.com/api-reference/encryptpassword/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  encryptPassword(parameters, callback) {
    return this.whmcsHttpClient.callApi('EncryptPassword', parameters, callback);
  };

  /**
   * Obtain the Activity Log that matches passed criteria.
   * https://developers.whmcs.com/api-reference/getactivitylog/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getActivityLog(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetActivityLog', parameters, callback);
  };

  /**
   * Obtain the details for the current Admin User.
   * https://developers.whmcs.com/api-reference/getadmindetails/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getAdminDetails(callback) {
    return this.whmcsHttpClient.callApi('GetAdminDetails', callback);
  };

  /**
   * Retrieve a list of administrator user accounts.
   * https://developers.whmcs.com/api-reference/getadminusers/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getAdminUsers(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetAdminUsers', parameters, callback);
  };

  /**
   * Get Automation Task Log.
   * https://developers.whmcs.com/api-reference/getautomationlog/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getAutomationLog(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetAutomationLog', parameters, callback);
  };

  /**
   * Retrieve a System Configuration Value.
   * https://developers.whmcs.com/api-reference/getconfigurationvalue/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getConfigurationValue(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetConfigurationValue', parameters, callback);
  };

  /**
   * Obtain the Currencies configured in the System.
   * https://developers.whmcs.com/api-reference/getcurrencies/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getCurrencies(callback) {
    return this.whmcsHttpClient.callApi('GetCurrencies', callback);
  };

  /**
   * Obtain a list of email templates from the system.
   * https://developers.whmcs.com/api-reference/getemailtemplates/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getEmailTemplates(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetEmailTemplates', parameters, callback);
  };

  /**
   * Retrieve Activated Payment Methods.
   * https://developers.whmcs.com/api-reference/getpaymentmethods/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getPaymentMethods(callback) {
    return this.whmcsHttpClient.callApi('GetPaymentMethods', callback);
  };

  /**
   * Retrieve a list of currently logged in admin users.
   * https://developers.whmcs.com/api-reference/getstaffonline/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getStaffOnline(callback) {
    return this.whmcsHttpClient.callApi('GetStaffOnline', callback);
  };

  /**
   * Get business performance metrics and statistics.
   * https://developers.whmcs.com/api-reference/getstats/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getStats(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetStats', parameters, callback);
  };

  /**
   * Get To-Do List Items.
   * https://developers.whmcs.com/api-reference/gettodoitems/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getToDoItems(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetToDoItems', parameters, callback);
  };

  /**
   * Obtain To Do item statuses and counts.
   * https://developers.whmcs.com/api-reference/gettodoitemstatuses/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getToDoItemStatuses(callback) {
    return this.whmcsHttpClient.callApi('GetToDoItemStatuses', callback);
  };

  /**
   * Creates an activity log entry.
   * https://developers.whmcs.com/api-reference/logactivity/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  logActivity(parameters, callback) {
    return this.whmcsHttpClient.callApi('LogActivity', parameters, callback);
  };

  /**
   * Send an Admin Email Notification.
   * https://developers.whmcs.com/api-reference/sendadminemail/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  sendAdminEmail(parameters, callback) {
    return this.whmcsHttpClient.callApi('SendAdminEmail', parameters, callback);
  };

  /**
   * Send a client Email Notification.
   * https://developers.whmcs.com/api-reference/sendemail/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  sendEmail(parameters, callback) {
    return this.whmcsHttpClient.callApi('SendEmail', parameters, callback);
  };

  /**
   * Set a System Configuration Value via the local API only.
   * https://developers.whmcs.com/api-reference/setconfigurationvalue/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  setConfigurationValue(parameters, callback) {
    return this.whmcsHttpClient.callApi('SetConfigurationValue', parameters, callback);
  };

  /**
   * Trigger a Custom Notification Event.
   * https://developers.whmcs.com/api-reference/triggernotificationevent/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  triggerNotificationEvent(parameters, callback) {
    return this.whmcsHttpClient.callApi('TriggerNotificationEvent', parameters, callback);
  };

  /**
   * Update the admin notes.
   * https://developers.whmcs.com/api-reference/updateadminnotes/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateAdminNotes(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateAdminNotes', parameters, callback);
  };

  /**
   * Update a specific announcement.
   * https://developers.whmcs.com/api-reference/updateannouncement/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateAnnouncement(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateAnnouncement', parameters, callback);
  };

  /**
   * Update To-Do Item.
   * https://developers.whmcs.com/api-reference/updatetodoitem/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateToDoItem(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateToDoItem', parameters, callback);
  };

  /**
   * Obtain details pertaining to the current WHMCS installation.
   * https://developers.whmcs.com/api-reference/whmcsdetails/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  whmcsDetails(callback) {
    return this.whmcsHttpClient.callApi('WhmcsDetails', callback);
  };
}

module.exports = System;