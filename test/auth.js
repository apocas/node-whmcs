var assert = require('assert'),
  client = require('./spec_helper').client,
  iclient = require('./spec_helper').iclient;


describe('authok', function() {

  it('should get a product without error', function(done) {

    client.products.getProduct(1, function(err, product) {
      if (err) throw err;
      done();
    });
  });

});


describe('authnok', function() {

  it('should fail auth with wrong credentials', function(done) {
    this.timeout(30000);

    iclient.products.getProduct(1, function(err, product) {
      if (!err) throw err;
      done();
    });
  });

});
