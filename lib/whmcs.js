var whmcs = exports;

//require('pkginfo')(module, 'version');

whmcs.createClient = require('./client').createClient;

whmcs.Client = require('./client').Client;
whmcs.Product = require('./product').Product;