var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client;


describe('authok', function() {

  it('should get a product without error', function(done) {

    client.products.getProduct(1, function(err, product) {
      expect(err).to.be.null;
      done();
    });
  });

});
