const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Affiliates"', function () {

  it('should get referrals', async function () {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    let res = await conf.whmcs.affiliates.getAffiliates(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.not.be.null;
    if (parseInt(res.numreturned) > 0) {
      expect(res).to.have.a.property('affiliates').to.be.an('object').to.have.a.property('affiliate').to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should activate and get referrals by client id', async function () {
    let activateOpts = {
      userid: conf.demoClientId
    };
    let activateRes = await conf.whmcs.affiliates.affiliateActivate(activateOpts);
    expect(activateRes).to.have.a.property('result').to.equal('success');

    let getOpts = {
      userid: conf.demoClientId
    };
    let getRes = await conf.whmcs.affiliates.getAffiliates(getOpts);
    expect(getRes).to.have.a.property('result').to.equal('success');
    expect(getRes).to.have.a.property('affiliates').to.be.an('object');
    expect(getRes.affiliates).to.have.a.property('affiliate').to.be.an('array');
    let a = getRes.affiliates.affiliate.map(function (affiliate) {
      return affiliate.clientid;
    });
    expect(a).includes(conf.demoClientId.toString());
  });

});