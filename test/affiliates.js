const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Affiliates"', function () {

  it('should get referrals', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.affiliates.getAffiliates(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('affiliates').to.be.an('object');
      done();
    });
  });

  it('should activate and get referrals by client id', function (done) {
    let opts = {
      userid: conf.demoClientId
    };
    conf.whmcs.affiliates.affiliateActivate(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');

      let opts = {
        userid: conf.demoClientId
      };
      conf.whmcs.affiliates.getAffiliates(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('affiliates').to.be.an('object');
        expect(details.affiliates).to.have.a.property('affiliate').to.be.an('array');
        let a = details.affiliates.affiliate.map(function (affiliate) {
          return affiliate.clientid;
        });
        expect(a).includes(conf.demoClientId);
        done();
      });
    });
  });

});