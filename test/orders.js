var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Orders"', function () {

  it('should get orders', function (done) {
    var opts = {
      limitstart: 0,
      limitnum: 1
    };

    conf.whmcs.orders.getOrders(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('orders').to.be.an('object');
      expect(details.orders).to.have.a.property('order').to.be.an('array');
      done();
    });
  });

  it('should get order statuses', function (done) {
    conf.whmcs.orders.getOrderStatuses(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('statuses').to.be.an('object');
      expect(details.statuses).to.have.a.property('status').to.be.an('array');
      done();
    });
  });

  describe('Product', function () {
    var demoPid;

    before(function (done) {
      var opts = {
        name: 'Test product',
        gid: 1,
        type: 'hostingaccount'
      };
      conf.whmcs.products.addProduct(opts, function (err, details) {
        if (err) {
          throw err;
        } else if (details.pid == undefined) {
          throw new Error('Cannot get the created product ID. Cannot proceed.');
        } else {
          demoPid = details.pid;
          done();
        }
      });
    });

    it('should get products', function (done) {
      var opts = {
        pid: demoPid
      };

      conf.whmcs.orders.getProducts(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('products').to.be.an('object');
        expect(details.products).to.have.a.property('product').to.be.an('array');
        done();
      });
    });
  });

  it('should get promotions', function (done) {
    conf.whmcs.orders.getPromotions(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('promotions').to.be.an('object');
      expect(details.promotions).to.have.a.property('promotion').to.be.an('array');
      done();
    });
  });

  describe('Order', function () {
    var demoPaymentMethod, demoOrderId;

    before(function (done) {
      conf.whmcs.system.getPaymentMethods(function (err, details) {
        if (err) {
          throw err;
        } else if (!details.paymentmethods || !details.paymentmethods.paymentmethod || !details.paymentmethods.paymentmethod[0]) {
          throw new Error('Payment methods do not exist. You must create a new payment method first.');
        } else {
          demoPaymentMethod = details.paymentmethods.paymentmethod[0].module;
          done();
        }
      });
    });

    it('should add an order', function (done) {
      var opts = {
        clientid: conf.demoClientId,
        paymentmethod: demoPaymentMethod,
        'domain[0]': 'domaintest.com',
        'domaintype[0]': 'register',
        'regperiod[0]': 1
      };
      conf.whmcs.orders.addOrder(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('orderid');
        demoOrderId = details.orderid;
        done();
      });
    });

    it('should mark the order as fraudulent', function (done) {
      if (!demoOrderId) {
        this.skip();
      } else {
        var opts = {
          orderid: demoOrderId
        };
        conf.whmcs.orders.fraudOrder(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

    it('should run a fraud check', function (done) {
      if (!demoOrderId) {
        this.skip();
      } else {
        var opts = {
          orderid: demoOrderId
        };
        conf.whmcs.orders.orderFraudCheck(opts, function (err, details) {
          if (err && err.message.indexOf('No Active Fraud Module') > -1) {
            done();
          } else {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');
            done();
          }
        });
      }
    });

    it('should set an order to pending', function (done) {
      if (!demoOrderId) {
        this.skip();
      } else {
        var opts = {
          orderid: demoOrderId
        };
        conf.whmcs.orders.pendingOrder(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

    it('should cancel an order', function (done) {
      if (!demoOrderId) {
        this.skip();
      } else {
        var opts = {
          orderid: demoOrderId
        };
        conf.whmcs.orders.cancelOrder(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

    describe('Order accept', function () {
      before(function (done) {
        var opts = {
          clientid: conf.demoClientId,
          paymentmethod: demoPaymentMethod,
          'domain[0]': 'domaintest.com',
          'domaintype[0]': 'register',
          'regperiod[0]': 1
        };
        conf.whmcs.orders.addOrder(opts, function (err, details) {
          if (err) {
            throw err;
          } else if (details.orderid == undefined) {
            throw new Error('Cannot get the order ID. Cannot proceed.');
          } else {
            demoOrderId = details.orderid;
            done();
          }
        });
      });

      it('should accept an order', function (done) {
        if (!demoOrderId) {
          this.skip();
        } else {
          var opts = {
            orderid: demoOrderId
          };
          conf.whmcs.orders.acceptOrder(opts, function (err, details) {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');
            done();
          });
        }
      });
    });

    it('should delete an order', function (done) {
      if (!demoOrderId) {
        this.skip();
      } else {
        var opts = {
          orderid: demoOrderId
        };
        conf.whmcs.orders.deleteOrder(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });
  });

});