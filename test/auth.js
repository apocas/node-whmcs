var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client,
  iclient = require('./spec_helper').iclient;


describe('authok', function() {

  it('should get a product without error', function(done) {

    client.products.getProduct(1, function(err, product) {
      expect(err).to.be.undefined;
      done();
    });
  });

});


describe('authnok', function() {

  it('should fail auth with wrong credentials', function(done) {
    this.timeout(30000);

    iclient.products.getProduct(1, function(err, product) {
      expect(err).not.to.be.undefined;
      done();
    });
  });

});
