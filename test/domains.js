const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

function isRegistrarError(msg) {
  let errorMessages = ['Registrar Error Message', 'Registrar Function Not Supported', 'No response from API command'];

  for (let i = 0; i < errorMessages.length; i++) {
    if (msg.indexOf(errorMessages[i]) > -1) {
      return true;
    }
  }

  return false;
};

describe('Module "Domains"', function () {

  before(async function () {
    let opts = {
      extension: '.com',
      'register[1]': 10,
      'transfer[1]': 10,
      'renew[1]': 10,
      'currency_code': process.env.WHMCS_TEST_CURRENCY || 'USD'
    };
    let res = await conf.whmcs.domains.createOrUpdateTLD(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('extension').to.be.equal(opts.extension);
  });

  it('should create or update tld', async function () {
    let opts = {
      extension: '.com',
      'register[1]': 15,
      'transfer[1]': 15,
      'renew[1]': 15,
      'currency_code': process.env.WHMCS_TEST_CURRENCY || 'USD'
    };
    let res = await conf.whmcs.domains.createOrUpdateTLD(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('extension').to.be.equal(opts.extension);
  });

  it('should get tld pricing', async function () {
    this.timeout(30000);

    let opts = {
      clientid: conf.demoClientId
    };
    let res = await conf.whmcs.domains.getTLDPricing(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('pricing').to.be.an('object');
  });

  describe('Domain', function () {
    let demoDomainId, demoOrderId;

    before(async function () {
      this.timeout(30000);

      let orderOpts = {
        clientid: conf.demoClientId,
        paymentmethod: conf.demoPaymentMethod,
        'domain[0]': 'domaintest.com',
        'domaintype[0]': 'register',
        'regperiod[0]': 1
      };
      let orderRes = await conf.whmcs.orders.addOrder(orderOpts);
      expect(orderRes).to.have.a.property('result').to.equal('success');
      expect(orderRes).to.have.a.property('orderid').to.not.be.null;

      demoOrderId = orderRes.orderid;

      let domainOpts = {
        domain: 'domaintest.com',
        limitstart: 0,
        limitnum: 1
      };
      let domainRes = await conf.whmcs.client.getClientsDomains(domainOpts);
      expect(domainRes).to.have.a.property('result').to.equal('success');
      expect(domainRes).to.have.a.property('domains').to.be.an('object').to.have.a.property('domain').to.be.an('array').to.have.length.greaterThan(0);
      expect(domainRes.domains.domain[0]).to.have.a.property('id').to.not.be.null;
      demoDomainId = domainRes.domains.domain[0].id;
    });

    it('should get locking status', async function () {
      let opts = {
        domainid: demoDomainId
      };

      let res = await conf.whmcs.domains.domainGetLockingStatus(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('lockstatus').to.be.a('string');
    });

    it('should get nameservers', async function () {
      this.timeout(60000);
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainGetNameservers(opts);
        expect(res).to.have.a.property('result').to.equal('success');
        expect(res).to.have.a.property('ns1').to.not.be.null;
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should get whois information', async function () {
      this.timeout(60000);
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainGetWhoisInfo(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send a register command to command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainRegister(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send a release command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainRelease(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send a renew command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainRenew(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send an epp command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainRequestEPP(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send the toggle ID protect command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainToggleIdProtect(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send the domain transfer command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainTransfer(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send the update lock command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainUpdateLockingStatus(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send the save nameservers command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId,
        ns1: 'ns1.domaintest.com',
        ns2: 'ns2.domaintest.com'
      };

      try {
        let res = await conf.whmcs.domains.domainUpdateNameservers(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should send the save whois command to registrar module', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainUpdateWhoisInfo(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          let possibleErr = ['Domain ID Not Found', 'XML Required', 'Registrar Error Message'];
          expect(possibleErr.indexOf(e.message) > -1).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should retrieve whois information', async function () {
      let opts = {
        domainid: demoDomainId
      };

      try {
        let res = await conf.whmcs.domains.domainWhois(opts);
        expect(res).to.have.a.property('result').to.equal('success');
        expect(res).to.have.a.property('status').to.not.be.null;
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should update a domain', async function () {
      let opts = {
        domainid: demoDomainId,
        idprotection: false
      };

      try {
        let res = await conf.whmcs.domains.updateClientDomain(opts);
        expect(res).to.have.a.property('result').to.equal('success');
        expect(res).to.have.a.property('domainid').to.equal(parseInt(demoDomainId));
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(isRegistrarError(e.message)).to.be.true;
        } else {
          throw e;
        }
      }
    });

  });

});