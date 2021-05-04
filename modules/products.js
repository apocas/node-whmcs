var Products = function (whmcsHttpClient) {
  this.whmcsHttpClient = whmcsHttpClient;
};

/**
 * Adds a product to the system to be available for purchase.
 * https://developers.whmcs.com/api-reference/addproduct/
 * @param {Object} parameters Request parameters
 * @param {Function} callback Optional callback. If not set the method returns a Promise
 */
Products.prototype.addProduct = function (parameters, callback) {
  return this.whmcsHttpClient.callApi('AddProduct', parameters, callback);
};

module.exports = Products;
