class Tickets {
  /**
   * Creates a new Tickets object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }
  
  /**
   * Get the support departments and associated ticket counts.
   * https://developers.whmcs.com/api-reference/getsupportdepartments/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getSupportDepartments(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetSupportDepartments', parameters, callback);
  };

  /**
   * Get the support statuses and number of tickets in each status.
   * https://developers.whmcs.com/api-reference/getsupportstatuses/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getSupportStatuses(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetSupportStatuses', parameters, callback);
  };

  /**
   * Obtain a specific ticket
   * https://developers.whmcs.com/api-reference/getticket/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicket(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTicket', parameters, callback);
  };

  /**
   * Retrieve a single attachment.
   * https://developers.whmcs.com/api-reference/getticketattachment/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicketAttachment(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTicketAttachment', parameters, callback);
  };

  /**
   * Get ticket counts.
   * https://developers.whmcs.com/api-reference/getticketcounts/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicketCounts(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTicketCounts', parameters, callback);
  };

  /**
   * Obtain a specific ticket notes.
   * https://developers.whmcs.com/api-reference/getticketnotes/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicketNotes(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTicketNotes', parameters, callback);
  };

  /**
   * Obtain the Predefined Ticket Reply Categories.
   * https://developers.whmcs.com/api-reference/getticketpredefinedcats/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicketPredefinedCats(callback) {
    return this.whmcsHttpClient.callApi('GetTicketPredefinedCats', callback);
  };

  /**
   * Obtain the Predefined Ticket Replies.
   * https://developers.whmcs.com/api-reference/getticketpredefinedreplies/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTicketPredefinedReplies(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTicketPredefinedReplies', parameters, callback);
  };

  /**
   * Obtain tickets matching the passed criteria.
   * https://developers.whmcs.com/api-reference/gettickets/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTickets(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTickets', parameters, callback);
  };
}

module.exports = Tickets;
