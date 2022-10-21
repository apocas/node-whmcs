const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Orders"', function () {

  it('should add an order', async function () {
    let opts = {
      clientid: conf.demoClientId,
      paymentmethod: conf.demoPaymentMethod,
      'domain[0]': 'domaintest.com',
      'domaintype[0]': 'register',
      'regperiod[0]': 1
    };
    let res = await conf.whmcs.orders.addOrder(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('orderid').to.not.be.null;
  });

  it('should get order statuses', async function () {
    let res = await conf.whmcs.orders.getOrderStatuses();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('statuses').to.be.an('object');
    expect(res.statuses).to.have.a.property('status').to.be.an('array');
  });

  it('should get promotions', async function () {
    let res = await conf.whmcs.orders.getPromotions();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults > 0)) {
      expect(res).to.have.a.property('promotions').to.be.an('object');
      expect(res.promotions).to.have.a.property('promotion').to.be.an('array');
    }
  });

  describe('Product', function () {
    let demoPid;

    before(async function () {
      const _this = this;
      let opts = {
        name: 'Test product',
        gid: process.env.WHMCS_TEST_GID || '1',
        type: 'hostingaccount'
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
      expect(res).to.have.a.property('pid');
      demoPid = res.pid;
    });

    it('should get product by ID', async function () {
      let opts = {
        pid: demoPid
      };
      let res = await conf.whmcs.orders.getProducts(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('products')
        .to.be.an('object')
        .to.have.a.property('product')
        .to.be.an('array').to.have.lengthOf(1);
      expect(res.products.product[0]).to.have.a.property('pid').to.not.be.null;
      expect(res.products.product[0].pid == demoPid).to.equal(true);
    });
  });

  describe('Order', function () {
    let demoOrderId;

    beforeEach(async function () {
      let opts = {
        clientid: conf.demoClientId,
        paymentmethod: conf.demoPaymentMethod,
        'domain[0]': 'domaintest.com',
        'domaintype[0]': 'register',
        'regperiod[0]': 1
      };
      let res = await conf.whmcs.orders.addOrder(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('orderid').to.not.be.null;
      demoOrderId = res.orderid;
    });

    it('should get order by ID', async function () {
      let opts = {
        id: demoOrderId
      };

      let res = await conf.whmcs.orders.getOrders(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('orders')
        .to.be.an('object')
        .to.have.a.property('order')
        .to.be.an('array')
        .to.have.lengthOf(1);
      expect(res.orders.order[0]).to.have.a.property('id').to.not.be.null;
      expect(res.orders.order[0].id == demoOrderId).to.equal(true);
    });

    it('should mark the order as fraudulent', async function () {
      let opts = {
        orderid: demoOrderId
      };
      let res = await conf.whmcs.orders.fraudOrder(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    });

    it('should run a fraud check', async function () {
      let opts = {
        orderid: demoOrderId
      };

      try {
        let res = await conf.whmcs.orders.orderFraudCheck(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          let possibleErr = ['No Active Fraud Module'];
          expect(possibleErr.some(err => {
            return e.message.indexOf(err) > -1;
          })).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should set an order to pending', async function () {
      let opts = {
        orderid: demoOrderId
      };
      let res = await conf.whmcs.orders.pendingOrder(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    });

    it('should cancel a pending order', async function () {
      let pendingOpts = {
        orderid: demoOrderId
      };
      let pendingRes = await conf.whmcs.orders.pendingOrder(pendingOpts);
      expect(pendingRes).to.have.a.property('result').to.equal('success');

      let cancelOpts = {
        orderid: demoOrderId
      };
      let cancelRes = await conf.whmcs.orders.cancelOrder(cancelOpts);
      expect(cancelRes).to.have.a.property('result').to.equal('success');
    });

    it('should accept an order', async function () {
      let opts = {
        orderid: demoOrderId
      };
      let res = await conf.whmcs.orders.acceptOrder(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    });

    it('should delete a cancelled order', async function () {
      let cancelOpts = {
        orderid: demoOrderId
      };
      let cancelRes = await conf.whmcs.orders.cancelOrder(cancelOpts);
      expect(cancelRes).to.have.a.property('result').to.equal('success');

      let opts = {
        orderid: demoOrderId
      };
      let res = await conf.whmcs.orders.deleteOrder(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    });
  });

});