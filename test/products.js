var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Products"', function () {

  it('should create a new product', function (done) {
    var opts = {
      name: 'Test product',
      gid: 1,
      type: 'hostingaccount',

    };
    conf.whmcs.products.addProduct(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('pid');
      done();
    });
  });
});