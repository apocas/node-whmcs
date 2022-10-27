const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Products"', function () {

  it('should create a new product', async function () {
    const _this = this;
    let opts = {
      name: 'Test product',
      gid: process.env.WHMCS_TEST_GID || '1',
      type: 'hostingaccount',

    };

    let res = await conf.whmcs.products.addProduct(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('pid').to.not.be.null;
  });
});