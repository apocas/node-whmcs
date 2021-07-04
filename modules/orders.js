class Orders {
  /**
   * Creates a new Orders object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
   constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Accepts a pending order.
   * https://developers.whmcs.com/api-reference/acceptorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  acceptOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('AcceptOrder', parameters, callback);
  };

  /**
   * Adds an order to a client.
   * https://developers.whmcs.com/api-reference/addorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddOrder', parameters, callback);
  };

  /**
   * Cancel a Pending Order.
   * https://developers.whmcs.com/api-reference/cancelorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  cancelOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('CancelOrder', parameters, callback);
  };

  /**
   * Deletes a cancelled or fraud order.
   * https://developers.whmcs.com/api-reference/deleteorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteOrder', parameters, callback);
  };

  /**
   * Marks an order as fraudulent.
   * https://developers.whmcs.com/api-reference/fraudorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  fraudOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('FraudOrder', parameters, callback);
  };

  /**
   * Obtain orders matching the passed criteria.
   * https://developers.whmcs.com/api-reference/getorders/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getOrders(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetOrders', parameters, callback);
  };

  /**
   * Retrieve Order Status and number in those statuses.
   * https://developers.whmcs.com/api-reference/getorderstatuses/
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getOrderStatuses(callback) {
    return this.whmcsHttpClient.callApi('GetOrderStatuses', callback);
  };

  /**
   * Retrieve configured products matching provided criteria.
   * https://developers.whmcs.com/api-reference/getproducts/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getProducts(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetProducts', parameters, callback);
  };

  /**
   * Obtain promotions matching the passed criteria.
   * https://developers.whmcs.com/api-reference/getpromotions/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getPromotions(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetPromotions', parameters, callback);
  };

  /**
   * Run a fraud check on a passed Order ID using the active fraud module.
   * https://developers.whmcs.com/api-reference/orderfraudcheck/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  orderFraudCheck(parameters, callback) {
    return this.whmcsHttpClient.callApi('OrderFraudCheck', parameters, callback);
  };

  /**
   * Sets an order, and all associated order items to Pending status.
   * https://developers.whmcs.com/api-reference/pendingorder/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  pendingOrder(parameters, callback) {
    return this.whmcsHttpClient.callApi('PendingOrder', parameters, callback);
  };
}

module.exports = Orders;