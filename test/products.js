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

    let res;

    try {
      res = await conf.whmcs.products.addProduct(opts);
    } catch (e) {
      if (e.message.indexOf('You must supply a valid Product Group ID') > -1) {
        console.log('There is no Product Group #' + opts.gid + '. You must create a Product Group in WHMCS and set the environment variable "WHMCS_TEST_GID" in order to proceed with the test.');
        _this.skip();
      } else {
        throw e;
      }
    }

    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('pid').to.not.be.null;
  });
});