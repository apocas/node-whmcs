var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client;


describe('products', function() {

  it('should get product', function(done) {
    this.timeout(15000);

    client.products.getProduct(1, function(err, customer) {
      expect(err).to.be.null;

      done();
    });
  });

  it('should get products', function(done) {
    this.timeout(15000);

    client.products.getProducts(1, function(err, customer) {
      expect(err).to.be.null;

      done();
    });
  });

  it('should upgrade products', function(done) {
    this.timeout(15000);
    var opts = {
      clientid : '1',
      serviceid : '1',
      type : 'product',
      newproductid : null,
      newproductbillingcycle : 'monthly',
      paymentmethod : 'moneris'
    };

    client.products.getProduct(1, function(err, customer) {
      expect(err).to.be.null;
      
      opts.newproductid = customer.products.product[0].pid;
      
      client.products.upgradeProduct(opts, function(err, product_info) {
        expect(product_info.result).to.equal('success');
          
        expect(err).to.be.null;
    
        done();
      });
    });
  });

});
