const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Orders"', function () {

  it('should add an order', async function () {
    const opts = {
      clientid: conf.demoClientId,
      paymentmethod: conf.demoPaymentMethod,
      'domain[0]': 'domaintest.com',
      'domaintype[0]': 'register',
      'regperiod[0]': 1
    };
    const res = await conf.whmcs.orders.addOrder(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('orderid').to.not.be.null;
  });

  it('should get order statuses', async function () {
    const res = await conf.whmcs.orders.getOrderStatuses();
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('statuses').to.be.an('object');
    expect(res.get('statuses')).to.have.a.property('status').to.be.an('array');
  });

  it('should get promotions', async function () {
    const res = await conf.whmcs.orders.getPromotions();
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.get('totalresults') > 0)) {
      expect(res.getBody()).to.have.a.property('promotions').to.be.an('object');
      expect(res.get('promotions').to.have.a.property('promotion').to.be.an('array'));
    }
  });

  describe('Product', function () {
    let demoPid;

    before(async function () {
      const _this = this;
      const opts = {
        name: 'Test product',
        gid: process.env.WHMCS_TEST_GID || '1',
        type: 'hostingaccount'
      };
      const res = await conf.whmcs.products.addProduct(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('pid');
      demoPid = res.get('pid');
    });

    it('should get product by ID', async function () {
      const opts = {
        pid: demoPid
      };
      const res = await conf.whmcs.orders.getProducts(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('products')
        .to.be.an('object')
        .to.have.a.property('product')
        .to.be.an('array').to.have.lengthOf(1);
      expect(res.get('products').product[0]).to.have.a.property('pid').to.not.be.null;
      expect(res.get('products').product[0].pid == demoPid).to.equal(true);
    });
  });

  describe('Order', function () {
    let demoOrderId;

    beforeEach(async function () {
      const opts = {
        clientid: conf.demoClientId,
        paymentmethod: conf.demoPaymentMethod,
        'domain[0]': 'domaintest.com',
        'domaintype[0]': 'register',
        'regperiod[0]': 1
      };
      const res = await conf.whmcs.orders.addOrder(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('orderid').to.not.be.null;
      demoOrderId = res.get('orderid');
    });

    it('should get order by ID', async function () {
      const opts = {
        id: demoOrderId
      };

      const res = await conf.whmcs.orders.getOrders(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('orders')
        .to.be.an('object')
        .to.have.a.property('order')
        .to.be.an('array')
        .to.have.lengthOf(1);
      expect(res.get('orders').order[0]).to.have.a.property('id').to.not.be.null;
      expect(res.get('orders').order[0].id == demoOrderId).to.equal(true);
    });

    it('should mark the order as fraudulent', async function () {
      const opts = {
        orderid: demoOrderId
      };
      const res = await conf.whmcs.orders.fraudOrder(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should run a fraud check', async function () {
      const opts = {
        orderid: demoOrderId
      };

      try {
        const res = await conf.whmcs.orders.orderFraudCheck(opts);
        expect(res).to.be.an.instanceOf(WhmcsResponse);
        expect(res.getBody()).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          const possibleErr = ['No Active Fraud Module'];
          expect(possibleErr.some(err => {
            return e.message.indexOf(err) > -1;
          })).to.be.true;
        } else {
          throw e;
        }
      }
    });

    it('should set an order to pending', async function () {
      const opts = {
        orderid: demoOrderId
      };
      const res = await conf.whmcs.orders.pendingOrder(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should cancel a pending order', async function () {
      const pendingOpts = {
        orderid: demoOrderId
      };
      const pendingRes = await conf.whmcs.orders.pendingOrder(pendingOpts);
      expect(pendingRes).to.be.an.instanceOf(WhmcsResponse);
      expect(pendingRes.getBody()).to.have.a.property('result').to.equal('success');

      const cancelOpts = {
        orderid: demoOrderId
      };
      const cancelRes = await conf.whmcs.orders.cancelOrder(cancelOpts);
      expect(cancelRes).to.be.an.instanceOf(WhmcsResponse);
      expect(cancelRes.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should accept an order', async function () {
      const opts = {
        orderid: demoOrderId
      };
      const res = await conf.whmcs.orders.acceptOrder(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should delete a cancelled order', async function () {
      const cancelOpts = {
        orderid: demoOrderId
      };
      const cancelRes = await conf.whmcs.orders.cancelOrder(cancelOpts);
      expect(cancelRes).to.be.an.instanceOf(WhmcsResponse);
      expect(cancelRes.getBody()).to.have.a.property('result').to.equal('success');

      const opts = {
        orderid: demoOrderId
      };
      const res = await conf.whmcs.orders.deleteOrder(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    });
  });

});