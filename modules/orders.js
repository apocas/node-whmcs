var Orders = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Accepts a pending order.
 * https://developers.whmcs.com/api-reference/acceptorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.acceptOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AcceptOrder', parameters, callback);
};

/**
 * Adds an order to a client.
 * https://developers.whmcs.com/api-reference/addorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.addOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddOrder', parameters, callback);
};

/**
 * Cancel a Pending Order.
 * https://developers.whmcs.com/api-reference/cancelorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.cancelOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('CancelOrder', parameters, callback);
};

/**
 * Deletes a cancelled or fraud order.
 * https://developers.whmcs.com/api-reference/deleteorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.deleteOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('DeleteOrder', parameters, callback);
};

/**
 * Marks an order as fraudulent.
 * https://developers.whmcs.com/api-reference/fraudorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.fraudOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('FraudOrder', parameters, callback);
};

/**
 * Obtain orders matching the passed criteria.
 * https://developers.whmcs.com/api-reference/getorders/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.getOrders = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetOrders', parameters, callback);
};

/**
 * Retrieve Order Status and number in those statuses.
 * https://developers.whmcs.com/api-reference/getorderstatuses/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.getOrderStatuses = function (callback) {
  return this.whmcsHttpClient.callApi('GetOrderStatuses', callback);
};

/**
 * Retrieve configured products matching provided criteria.
 * https://developers.whmcs.com/api-reference/getproducts/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.getProducts = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetProducts', parameters, callback);
};

/**
 * Obtain promotions matching the passed criteria.
 * https://developers.whmcs.com/api-reference/getpromotions/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.getPromotions = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('GetPromotions', parameters, callback);
};

/**
 * Run a fraud check on a passed Order ID using the active fraud module.
 * https://developers.whmcs.com/api-reference/orderfraudcheck/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.orderFraudCheck = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('OrderFraudCheck', parameters, callback);
};

/**
 * Sets an order, and all associated order items to Pending status.
 * https://developers.whmcs.com/api-reference/pendingorder/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Orders.prototype.pendingOrder = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('PendingOrder', parameters, callback);
};

module.exports = Orders;