var assert = require('assert'),
  whmcs = require('./../lib/whmcs'),
  config = require('./config');


describe('authok', function() {

  var client;

  before(function(done){
    client = whmcs.createClient(config.validConfig);
    done();
  });

  it('should get a product without error', function(done) {

    client.products.getProduct(999, function(err, product) {
      if (err) throw err;
      done();
    });
  });

});


describe('authnok', function() {

  var client;

  before(function(done){
    client = whmcs.createClient(config.invalidConfig);
    done();
  });

  it('should fail auth with wrong credentials', function(done) {
    this.timeout(30000);

    client.products.getProduct(999, function(err, product) {
      if (!err) throw err;
      done();
    });
  });

});
