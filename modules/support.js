var Support = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Adds an announcement.
 * https://developers.whmcs.com/api-reference/addannouncement/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.addAnnouncement = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddAnnouncement', parameters, callback);
};

/**
 * Adds a Cancellation Request.
 * https://developers.whmcs.com/api-reference/addcancelrequest/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.addCancelRequest = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddCancelRequest', parameters, callback);
};

/**
 * Adds a Client Note.
 * https://developers.whmcs.com/api-reference/addclientnote/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.addClientNote = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddClientNote', parameters, callback);
};

/**
 * Add a note to a ticket by Ticket ID or Ticket Number.
 * https://developers.whmcs.com/api-reference/addticketnote/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.addTicketNote = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddTicketNote', parameters, callback);
};

/**
 * Add a reply to a ticket by Ticket ID.
 * https://developers.whmcs.com/api-reference/addticketreply/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.addTicketReply = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddTicketReply', parameters, callback);
};

/**
 * Blocks a ticket sender.
 * https://developers.whmcs.com/api-reference/blockticketsender/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.blockTicketSender = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('BlockTicketSender', parameters, callback);
};

/**
 * Delete an announcement.
 * https://developers.whmcs.com/api-reference/deleteannouncement/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.deleteAnnouncement = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteAnnouncement', parameters, callback);
};

/**
 * Deletes a ticket.
 * https://developers.whmcs.com/api-reference/deleteticket/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.deleteTicket = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteTicket', parameters, callback);
};

/**
 * Deletes a ticket note.
 * https://developers.whmcs.com/api-reference/deleteticketnote/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.deleteTicketNote = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteTicketNote', parameters, callback);
};

/**
 * Deletes a ticket reply.
 * https://developers.whmcs.com/api-reference/deleteticketreply/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.deleteTicketReply = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteTicketReply', parameters, callback);
};

/**
 * Obtain an array of announcements.
 * https://developers.whmcs.com/api-reference/getannouncements/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.getAnnouncements = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetAnnouncements', parameters, callback);
};

/**
 * Merge tickets.
 * https://developers.whmcs.com/api-reference/mergeticket/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.mergeTicket = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('MergeTicket', parameters, callback);
};

/**
 * Open a new ticket.
 * https://developers.whmcs.com/api-reference/openticket/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.openTicket = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('OpenTicket', parameters, callback);
};

/**
 * Updates an existing ticket.
 * https://developers.whmcs.com/api-reference/updateticket/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.updateTicket = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateTicket', parameters, callback);
};

/**
 * Updates a ticket reply message.
 * https://developers.whmcs.com/api-reference/updateticketreply/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Support.prototype.updateTicketReply = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('UpdateTicketReply', parameters, callback);
};

module.exports = Support;
