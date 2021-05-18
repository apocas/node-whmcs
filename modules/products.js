class Products {
  /**
   * Creates a new Products object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Adds a product to the system to be available for purchase.
   * https://developers.whmcs.com/api-reference/addproduct/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addProduct(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddProduct', parameters, callback);
  };
}
module.exports = Products;
