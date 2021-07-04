class Billing {
  /**
   * Creates a new Billing object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Accepts a quote.
   * https://developers.whmcs.com/api-reference/acceptquote/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  acceptQuote(parameters, callback) {
    return this.whmcsHttpClient.callApi('AcceptQuote', parameters, callback);
  };

  /**
   * Adds a Billable Item.
   * https://developers.whmcs.com/api-reference/addbillableitem/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addBillableItem(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddBillableItem', parameters, callback);
  };

  /**
   * Adds credit to a given client.
   * https://developers.whmcs.com/api-reference/addcredit/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addCredit(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddCredit', parameters, callback);
  };

  /**
   * Adds payment to a given invoice.
   * https://developers.whmcs.com/api-reference/addinvoicepayment/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addInvoicePayment(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddInvoicePayment', parameters, callback);
  };

  /**
   * Add a Pay Method to a given client.
   * https://developers.whmcs.com/api-reference/addpaymethod/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addPayMethod(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddPayMethod', parameters, callback);
  };

  /**
   * Add a transaction to the system.
   * https://developers.whmcs.com/api-reference/addtransaction/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addTransaction(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddTransaction', parameters, callback);
  };

  /**
   * Applies the Client’s Credit to an invoice.
   * https://developers.whmcs.com/api-reference/applycredit/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  applyCredit(parameters, callback) {
    return this.whmcsHttpClient.callApi('ApplyCredit', parameters, callback);
  };

  /**
   * Attempt to capture a payment on an unpaid CC Invoice.
   * https://developers.whmcs.com/api-reference/capturepayment/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  capturePayment(parameters, callback) {
    return this.whmcsHttpClient.callApi('CapturePayment', parameters, callback);
  };

  /**
   * Create an invoice using the provided parameters.
   * https://developers.whmcs.com/api-reference/createinvoice/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  createInvoice(parameters, callback) {
    return this.whmcsHttpClient.callApi('CreateInvoice', parameters, callback);
  };

  /**
   * Creates a new quote.
   * https://developers.whmcs.com/api-reference/createquote/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  createQuote(parameters, callback) {
    return this.whmcsHttpClient.callApi('CreateQuote', parameters, callback);
  };

  /**
   * Delete a Pay Method.
   * https://developers.whmcs.com/api-reference/deletepaymethod/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deletePayMethod(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeletePayMethod', parameters, callback);
  };

  /**
   * Deletes a quote.
   * https://developers.whmcs.com/api-reference/deletequote/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteQuote(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteQuote', parameters, callback);
  };

  /**
   * Generate any invoices that are due to be generated.
   * https://developers.whmcs.com/api-reference/geninvoices/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  genInvoices(parameters, callback) {
    return this.whmcsHttpClient.callApi('GenInvoices', parameters, callback);
  };

  /**
   * Obtain the Credit Log for a Client Account.
   * https://developers.whmcs.com/api-reference/getcredits/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getCredits(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetCredits', parameters, callback);
  };

  /**
   * Retrieve a specific invoice.
   * https://developers.whmcs.com/api-reference/getinvoice/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getInvoice(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetInvoice', parameters, callback);
  };

  /**
   * Retrieve a list of invoices.
   * https://developers.whmcs.com/api-reference/getinvoices/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getInvoices(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetInvoices', parameters, callback);
  };

  /**
   * Obtain the Pay Methods associated with a provided client id.
   * https://developers.whmcs.com/api-reference/getpaymethods/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getPayMethods(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetPayMethods', parameters, callback);
  };

  /**
   * Obtain quotes matching the passed criteria.
   * https://developers.whmcs.com/api-reference/getquotes/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getQuotes(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetQuotes', parameters, callback);
  };

  /**
   * Obtain transactions matching the passed criteria.
   * https://developers.whmcs.com/api-reference/gettransactions/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getTransactions(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetTransactions', parameters, callback);
  };

  /**
   * Send a quote to the associated client.
   * https://developers.whmcs.com/api-reference/sendquote/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  sendQuote(parameters, callback) {
    return this.whmcsHttpClient.callApi('SendQuote', parameters, callback);
  };

  /**
   * Update an invoice using the provided parameters.
   * https://developers.whmcs.com/api-reference/updateinvoice/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateInvoice(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateInvoice', parameters, callback);
  };

  /**
   * Update a Credit Card Pay Method.
   * https://developers.whmcs.com/api-reference/updatepaymethod/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updatePayMethod(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdatePayMethod', parameters, callback);
  };

  /**
   * Updates an existing quote.
   * https://developers.whmcs.com/api-reference/updatequote/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */

  updateQuote(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateQuote', parameters, callback);
  };

  /**
   * Updates a transaction in the system.
   * https://developers.whmcs.com/api-reference/updatetransaction/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateTransaction(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateTransaction', parameters, callback);
  };
}

module.exports = Billing;