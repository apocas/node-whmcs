const WhmcsHttpClient = require('./lib/whmcshttpclient');
const modules = require('./modules/index');

/**
 * WHMCS client
 * @param options {{username:String,serverUrl:String,password:String,proxy_url:String,apiKey:[String]}}
 */
var WHMCS = function (options) {
  var _this = this;

  ['username', 'serverUrl'].forEach(function (required) {
    if (!options || !options[required]) {
      throw new Error('options.' + required + ' is a required argument.');
    }
  });

  var config = options;

  if (!options.Promise) {
    config.Promise = global.Promise;
  }

  this.whmcsHttpClient = new WhmcsHttpClient(config);

  this.orders = new modules.Orders(this.whmcsHttpClient);
  this.affiliates = new modules.Billing(this.whmcsHttpClient);
  this.module = new modules.Module(this.whmcsHttpClient);
  this.support = new modules.Support(this.whmcsHttpClient);
  this.system = new modules.System(this.whmcsHttpClient);
  this.client = new modules.Client(this.whmcsHttpClient);
  this.products = new modules.Products(this.whmcsHttpClient);
  this.projectManagement = new modules.ProjectManagement(this.whmcsHttpClient);
  this.users = new modules.Users(this.whmcsHttpClient);
  this.affiliates = new modules.Affiliates(this.whmcsHttpClient);
  this.authentication = new modules.Authentication(this.whmcsHttpClient);
  this.domains = new modules.Domains(this.whmcsHttpClient);
  this.servers = new modules.Servers(this.whmcsHttpClient);
  this.tickets = new modules.Tickets(this.whmcsHttpClient);
  this.services = new modules.Services(this.whmcsHttpClient);
  this.addons = new modules.Addons(this.whmcsHttpClient);
};

/**
 * Executes an action in WHMCS. You can use this to execute an action that is not defined in the pre-loaded modules.
 * @param {String} action Command name
 * @param {Object} parameters Request parameters (key-value pairs)
 * @param {Function} callback Optional callback. If not set the method returns a Promise.
 */
WHMCS.prototype.callApi = function (action, parameters, callback) {
  return this.whmcsHttpClient.callApi(action, parameters, callback);
};

module.exports = WHMCS;