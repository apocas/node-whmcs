const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Affiliates"', function () {

  it('should get referrals', async function () {
    const opts = {
      limitstart: 0,
      limitnum: 25
    };
    const res = await conf.whmcs.affiliates.getAffiliates(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('numreturned').to.not.be.null;
    if (parseInt(res.get('numreturned')) > 0) {
      expect(res.getBody()).to.have.a.property('affiliates').to.be.an('object').to.have.a.property('affiliate').to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should activate and get referrals by client id', async function () {
    const activateOpts = {
      userid: conf.demoClientId
    };
    const activateRes = await conf.whmcs.affiliates.affiliateActivate(activateOpts);
    expect(activateRes).to.be.an.instanceOf(WhmcsResponse);
    expect(activateRes.getBody()).to.have.a.property('result').to.equal('success');

    const getOpts = {
      userid: conf.demoClientId
    };
    const getRes = await conf.whmcs.affiliates.getAffiliates(getOpts);
    expect(getRes).to.be.an.instanceOf(WhmcsResponse);
    expect(getRes.getBody()).to.have.a.property('result').to.equal('success');
    expect(getRes.getBody()).to.have.a.property('affiliates').to.be.an('object');
    expect(getRes.getBody().affiliates).to.have.a.property('affiliate').to.be.an('array');
    const a = getRes.get('affiliates').affiliate.map(function (affiliate) {
      return affiliate.clientid;
    });
    expect(a).includes(conf.demoClientId.toString());
  });

});