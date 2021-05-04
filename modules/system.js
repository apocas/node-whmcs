var System = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Adds an IP to the ban list.
 * https://developers.whmcs.com/api-reference/addbannedip/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.addBannedIp = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddBannedIp', parameters, callback);
};

/**
 * Decrypt an encrypted string.
 * https://developers.whmcs.com/api-reference/decryptpassword/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.decryptPassword = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DecryptPassword', parameters, callback);
};

/**
 * Encrypt a string.
 * https://developers.whmcs.com/api-reference/encryptpassword/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.encryptPassword = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('EncryptPassword', parameters, callback);
};

/**
 * Obtain the Activity Log that matches passed criteria.
 * https://developers.whmcs.com/api-reference/getactivitylog/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getActivityLog = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetActivityLog', parameters, callback);
};

/**
 * Obtain the details for the current Admin User.
 * https://developers.whmcs.com/api-reference/getadmindetails/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getAdminDetails = function (callback) {
  return this.whmcsHttpClient.callApi('GetAdminDetails', callback);
};

/**
 * Retrieve a list of administrator user accounts.
 * https://developers.whmcs.com/api-reference/getadminusers/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getAdminUsers = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetAdminUsers', parameters, callback);
};

/**
 * Get Automation Task Log.
 * https://developers.whmcs.com/api-reference/getautomationlog/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getAutomationLog = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetAutomationLog', parameters, callback);
};

/**
 * Retrieve a System Configuration Value.
 * https://developers.whmcs.com/api-reference/getconfigurationvalue/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getConfigurationValue = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetConfigurationValue', parameters, callback);
};

/**
 * Obtain the Currencies configured in the System.
 * https://developers.whmcs.com/api-reference/getcurrencies/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getCurrencies = function (callback) {
  return this.whmcsHttpClient.callApi('GetCurrencies', callback);
};

/**
 * Obtain a list of email templates from the system.
 * https://developers.whmcs.com/api-reference/getemailtemplates/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getEmailTemplates = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetEmailTemplates', parameters, callback);
};

/**
 * Retrieve Activated Payment Methods.
 * https://developers.whmcs.com/api-reference/getpaymentmethods/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getPaymentMethods = function (callback) {
  return this.whmcsHttpClient.callApi('GetPaymentMethods', callback);
};

/**
 * Retrieve a list of currently logged in admin users.
 * https://developers.whmcs.com/api-reference/getstaffonline/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getStaffOnline = function (callback) {
  return this.whmcsHttpClient.callApi('GetStaffOnline', callback);
};

/**
 * Get business performance metrics and statistics.
 * https://developers.whmcs.com/api-reference/getstats/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getStats = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetStats', parameters, callback);
};

/**
 * Get To-Do List Items.
 * https://developers.whmcs.com/api-reference/gettodoitems/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getToDoItems = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetToDoItems', parameters, callback);
};

/**
 * Obtain To Do item statuses and counts.
 * https://developers.whmcs.com/api-reference/gettodoitemstatuses/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.getToDoItemStatuses = function (callback) {
  return this.whmcsHttpClient.callApi('GetToDoItemStatuses', callback);
};

/**
 * Creates an activity log entry.
 * https://developers.whmcs.com/api-reference/logactivity/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.logActivity = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('LogActivity', parameters, callback);
};

/**
 * Send an Admin Email Notification.
 * https://developers.whmcs.com/api-reference/sendadminemail/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.sendAdminEmail = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('SendAdminEmail', parameters, callback);
};

/**
 * Send a client Email Notification.
 * https://developers.whmcs.com/api-reference/sendemail/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.sendEmail = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('SendEmail', parameters, callback);
};

/**
 * Set a System Configuration Value via the local API only.
 * https://developers.whmcs.com/api-reference/setconfigurationvalue/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.setConfigurationValue = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('SetConfigurationValue', parameters, callback);
};

/**
 * Trigger a Custom Notification Event.
 * https://developers.whmcs.com/api-reference/triggernotificationevent/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.triggerNotificationEvent = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('TriggerNotificationEvent', parameters, callback);
};

/**
 * Update the admin notes.
 * https://developers.whmcs.com/api-reference/updateadminnotes/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.updateAdminNotes = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateAdminNotes', parameters, callback);
};

/**
 * Update a specific announcement.
 * https://developers.whmcs.com/api-reference/updateannouncement/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.updateAnnouncement = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateAnnouncement', parameters, callback);
};

/**
 * Update To-Do Item.
 * https://developers.whmcs.com/api-reference/updatetodoitem/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.updateToDoItem = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateToDoItem', parameters, callback);
};

/**
 * Obtain details pertaining to the current WHMCS installation.
 * https://developers.whmcs.com/api-reference/whmcsdetails/
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
System.prototype.whmcsDetails = function (callback) {
  return this.whmcsHttpClient.callApi('WhmcsDetails', callback);
};

module.exports = System;