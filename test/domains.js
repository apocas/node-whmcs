const expect = require('chai').expect,
  conf = require('./conf');

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

  it('should create or update tld', function (done) {
    let opts = {
      extension: '.com'
    };
    conf.whmcs.domains.createOrUpdateTLD(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('extension').to.be.equal(opts.extension);
      done();
    });
  });

  it('should get tld pricing', function (done) {
    this.timeout(30000);

    let opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.domains.getTLDPricing(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('pricing').to.be.an('object');
      done();
    });
  });

  describe('Domain', function () {
    let demoPaymentMethod, demoDomainId, demoOrderId;

    before(function (done) {
      this.timeout(30000);
      conf.whmcs.system.getPaymentMethods(function (err, details) {
        if (err) {
          throw err;
        } else if (!details.paymentmethods || !details.paymentmethods.paymentmethod || !details.paymentmethods.paymentmethod[0]) {
          throw new Error('Payment methods do not exist. You must create a new payment method first.');
        } else {
          demoPaymentMethod = details.paymentmethods.paymentmethod[0].module;

          let opts = {
            clientid: conf.demoClientId,
            paymentmethod: demoPaymentMethod,
            'domain[0]': 'domaintest.com',
            'domaintype[0]': 'register',
            'regperiod[0]': 1
          };
          conf.whmcs.orders.addOrder(opts, function (err, details) {
            if (err) {
              throw err;
            } else if (!details.orderid) {
              throw new Error('Cannot get the order id. Cannot proceed.');
            } else {
              demoOrderId = details.orderid;
            }

            let opts = {
              domain: 'domaintest.com',
              limitstart: 0,
              limitnum: 1
            };
            conf.whmcs.client.getClientsDomains(opts, function (err, details) {
              if (err) {
                throw err;
              } else if (!details.domains || !details.domains.domain || details.domains.domain.length === 0) {
                throw new Error('Cannot get the domain. Cannot proceed.');
              } else {
                demoDomainId = details.domains.domain[0].id;
                done();
              }
            });
          });
        }
      });
    });

    it('should get locking status', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainGetLockingStatus(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('lockstatus').to.not.be.null;
        done();
      });
    });

    it('should get nameservers', function (done) {
      this.timeout(60000);
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainGetNameservers(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('ns1');
          done();
        }
      });
    });

    it('should get whois information', function (done) {
      this.timeout(60000);
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainGetWhoisInfo(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send a register command to command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainRegister(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send a release command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainRelease(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send a renew command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainRenew(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send an epp command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainRequestEPP(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send the toggle ID protect command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainToggleIdProtect(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send the domain transfer command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainTransfer(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send the update lock command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainUpdateLockingStatus(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send the save nameservers command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId,
        ns1: 'ns1.domaintest.com',
        ns2: 'ns2.domaintest.com'
      };

      conf.whmcs.domains.domainUpdateNameservers(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

    it('should send the save whois command to registrar module', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainUpdateWhoisInfo(opts, function (err, details) {
        expect(err).to.not.be.null;
        expect(err).to.have.a.property('message');
        expect(err.message).to.have.string('XML Required')
        done();
      });
    });

    it('should retrieve whois information', function (done) {
      let opts = {
        domainid: demoDomainId
      };

      conf.whmcs.domains.domainWhois(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('status');
          done();
        }
      });
    });

    it('should update a domain', function (done) {
      let opts = {
        domainid: demoDomainId,
        idprotection: false
      };

      conf.whmcs.domains.updateClientDomain(opts, function (err, details) {
        if (err && isRegistrarError(err.message)) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

  });

});