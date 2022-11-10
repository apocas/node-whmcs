const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Products"', function () {

  it('should create a new product', async function () {
    const _this = this;
    const opts = {
      name: 'Test product',
      gid: process.env.WHMCS_TEST_GID || '1',
      type: 'hostingaccount',

    };

    const res = await conf.whmcs.products.addProduct(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('pid').to.not.be.null;
  });
});