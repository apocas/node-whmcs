var expect = require('chai').expect,
  conf = require('./conf');

function isModuleNotAssignedError(msg) {
  return msg.indexOf('Service not assigned to a module') > -1;
}

describe('Module "Service"', function () {
  var demoPid, demoPaymentMethod, demoOrderId, demoServiceId;

  before(function (done) {
    this.timeout(30000);

    var opts = {
      name: 'Test product',
      gid: 1,
      type: 'hostingaccount',

    };
    conf.whmcs.products.addProduct(opts, function (err, details) {
      if (err) {
        throw err;
      } else if (details.pid == undefined) {
        throw new Error('Cannot get the pid. Cannot proceed.');
      } else {
        demoPid = details.pid;

        conf.whmcs.system.getPaymentMethods(function (err, details) {
          if (err) {
            throw err;
          } else if (!details.paymentmethods || !details.paymentmethods.paymentmethod || !details.paymentmethods.paymentmethod[0]) {
            throw new Error('Payment methods do not exist. You must create a new payment method first.');
          } else {
            demoPaymentMethod = details.paymentmethods.paymentmethod[0].module;

            var opts = {
              clientid: conf.demoClientId,
              paymentmethod: demoPaymentMethod,
              'pid[0]': demoPid,
              'domain[0]': 'hostingtest.com',
              'billingcycle[0]': 'monthly',
              'priceoverride[0]': 1
            };
            conf.whmcs.orders.addOrder(opts, function (err, details) {
              if (err) {
                throw err;
              } else if (!details.orderid) {
                throw new Error('Cannot get the order id. Cannot proceed.');
              } else {
                demoOrderId = details.orderid;
              }

              var opts = {
                domain: 'hostingtest.com',
                limitstart: 0,
                limitnum: 1
              };
              conf.whmcs.client.getClientsProducts(opts, function (err, details) {
                if (err) {
                  throw err;
                } else if (!details.products || !details.products.product || details.products.product.length === 0) {
                  throw new Error('Cannot get the product. Cannot proceed.');
                } else {
                  demoServiceId = details.products.product[0].id;
                  done();
                }
              });
            });
          }
        });
      }
    });


  });

  it('should update a client service', function (done) {
    var opts = {
      serviceid: demoServiceId,
      notes: 'this service was updated'
    };
    conf.whmcs.service.updateClientProduct(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should run the module create', function (done) {
    var opts = {
      serviceid: demoServiceId
    };
    conf.whmcs.service.moduleCreate(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should run the change package action', function (done) {
    var opts = {
      serviceid: demoServiceId
    };
    conf.whmcs.service.moduleChangePackage(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should run the change pw action', function (done) {
    var opts = {
      serviceid: demoServiceId
    };
    conf.whmcs.service.moduleChangePw(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should run a custom module action', function (done) {
    var opts = {
      serviceid: demoServiceId,
      func_name: 'test'
    };
    conf.whmcs.service.moduleCustom(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should run the module suspend action', function (done) {
    var opts = {
      serviceid: demoServiceId
    };
    conf.whmcs.service.moduleSuspend(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should run the module unsuspend action', function (done) {
    var opts = {
      serviceid: demoServiceId
    };
    conf.whmcs.service.moduleUnsuspend(opts, function (err, details) {
      if (err && isModuleNotAssignedError(err.message)) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should update or calculate an upgrade on a product', function (done) {
    var opts = {
      serviceid: demoServiceId,
      type: 'product',
      calconly: true,
      newproductid: demoPid,
      newproductbillingcycle: 'monthly'
    };
    conf.whmcs.service.upgradeProduct(opts, function (err, details) {
      expect(err).to.have.a.property('message');
      expect(err.message).to.have.string('Invalid Billing Cycle Requested');
      done();
    });
  });

});