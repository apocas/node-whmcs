var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Billing"', function () {

  describe('Quote', function () {
    var demoQuoteId;

    it('should get quotes', function (done) {
      var opts = {
        limitstart: 0,
        limitnum: 1
      };

      conf.whmcs.billing.getQuotes(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('quotes').to.be.an('object');
        expect(details.quotes).to.have.a.property('quote').to.be.an('array');
        done();
      });
    });

    it('should create a quote', function (done) {
      var opts = {
        subject: 'test quote',
        stage: 'Draft',
        validuntil: '01-01-2099',
        userid: conf.demoClientId
      };

      var items = {
        'lineitems[0]': {
          desc: 'quote description',
          qty: 1,
          up: 10,
          taxable: false
        }
      };

      opts['lineitems'] = Buffer.from(conf.serialize(items), 'ascii').toString('base64');

      conf.whmcs.billing.createQuote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('quoteid').to.not.be.null;
        demoQuoteId = details.quoteid;
        done();
      });
    });

    it('should get a quote by id', function (done) {
      if (demoQuoteId == undefined) {
        this.skip();
      }
      var opts = {
        quoteid: demoQuoteId
      };

      conf.whmcs.billing.getQuotes(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('quotes').to.be.an('object');
        expect(details.quotes).to.have.a.property('quote').to.be.an('array').to.have.lengthOf(1);
        done();
      });
    });

    it('should update a quote', function (done) {
      if (demoQuoteId == undefined) {
        this.skip();
      }
      var opts = {
        quoteid: demoQuoteId,
        subject: 'this is an updated quote'
      };

      conf.whmcs.billing.updateQuote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });

    it('should accept a quote', function (done) {
      this.timeout(20000);
      if (demoQuoteId == undefined) {
        this.skip();
      }
      var opts = {
        quoteid: demoQuoteId,
      };

      conf.whmcs.billing.acceptQuote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('invoiceid');
        done();
      });
    });

    it('should send a quote', function (done) {
      if (demoQuoteId == undefined) {
        this.skip();
      }
      var opts = {
        quoteid: demoQuoteId,
      };

      conf.whmcs.billing.sendQuote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });

    it('should delete a quote', function (done) {
      if (demoQuoteId == undefined) {
        this.skip();
      }
      var opts = {
        quoteid: demoQuoteId,
      };

      conf.whmcs.billing.deleteQuote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });
  });

  it('should add a billable item', function (done) {
    var opts = {
      clientid: conf.demoClientId,
      description: 'this is a billable item',
      amount: '10.00'
    };

    conf.whmcs.billing.addBillableItem(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('billableid').to.not.be.null;
      done();
    });
  });

  it('should create an invoice', function (done) {
    this.timeout(20000);
    var opts = {
      userid: conf.demoClientId,
      itemdescription0: 'this is a test invoice',
      itemamount0: 1,
      autoapplycredit: false
    };

    conf.whmcs.billing.createInvoice(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('invoiceid').to.not.be.null;
      done();
    });
  });

  it('should get invoices', function (done) {
    var opts = {
      limitstart: 0,
      limitnum: 1
    };

    conf.whmcs.billing.getInvoices(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('invoices').to.be.an('object');
      expect(details.invoices).to.have.a.property('invoice').to.be.an('array');
      done();
    });
  });

  describe('Invoice', function () {
    var demoInvoiceId;

    before(function (done) {
      var opts = {
        userid: conf.demoClientId,
        itemdescription0: 'this is a test invoice',
        itemamount0: 1,
        autoapplycredit: false
      };

      conf.whmcs.billing.createInvoice(opts, function (err, details) {
        if (err) {
          throw err;
        } else if (details.invoiceid == undefined) {
          throw new Error('Cannot create an invoice. Cannot proceed.');
        } else {
          demoInvoiceId = details.invoiceid;
          done();
        }
      });
    });

    it('should update an invoice', function (done) {
      var opts = {
        invoiceid: demoInvoiceId,
        'itemdescription[0]': 'this is an updated invoice',
        'itemamount[0]': 1,
        'itemtaxed[0]': false
      };

      conf.whmcs.billing.updateInvoice(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('invoiceid').to.equal(demoInvoiceId);
        done();
      });
    });

    it('should get an invoice', function (done) {
      var opts = {
        invoiceid: demoInvoiceId
      };

      conf.whmcs.billing.getInvoice(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('items').to.be.an('object');
        expect(details.items).to.have.a.property('item').to.be.an('array').to.have.lengthOf(1);
        done();
      });
    });

    it('should add a payment to an invoice', function (done) {
      var opts = {
        invoiceid: demoInvoiceId,
        transid: 1234,
        amount: 0.01,
        gateway: 'paypal'
      };

      conf.whmcs.billing.addInvoicePayment(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });

    it('should apply credit to an invoice', function (done) {
      var opts = {
        invoiceid: demoInvoiceId,
        amount: 0.01,
        noemail: true
      };

      conf.whmcs.billing.applyCredit(opts, function (err, details) {
        if (err && err.message.indexOf('Amount exceeds customer credit balance') > -1) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('invoicepaid').to.not.be.null;
          done();
        }
      });
    });

    it('should capture payment on an unpaid invoice', function (done) {
      var opts = {
        invoiceid: demoInvoiceId
      };

      conf.whmcs.billing.capturePayment(opts, function (err, details) {
        if (err && err.message.indexOf("Payment Attempt Failed") > -1) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });
  });

  describe('Pay Method', function () {
    var demoPaymentMethodId;

    it('should add a pay method to given client', function (done) {
      var opts = {
        clientid: conf.demoClientId,
        type: 'BankAccount',
        bank_code: '123456789',
        bank_code: '1234',
        bank_account: '999999999'
      };

      conf.whmcs.billing.addPayMethod(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('paymethodid').to.not.be.null;
        demoPaymentMethodId = details.paymethodid;
        done();
      });
    });

    it('should get pay methods associated with client id', function (done) {
      if (demoPaymentMethodId == undefined) {
        this.skip();
      } else {
        var opts = {
          clientid: conf.demoClientId,
          paymethodid: demoPaymentMethodId
        };

        conf.whmcs.billing.getPayMethods(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('paymethods').to.be.an('array').to.have.lengthOf(1);
          done();
        });
      }
    });

    it('should update a pay method', function (done) {
      if (demoPaymentMethodId == undefined) {
        this.skip();
      } else {
        var opts = {
          clientid: conf.demoClientId,
          paymethodid: demoPaymentMethodId
        };

        conf.whmcs.billing.updatePayMethod(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('paymethodid').to.not.be.null;
          done();
        });
      }
    });

    it('should delete a pay method', function (done) {
      if (demoPaymentMethodId == undefined) {
        this.skip();
      } else {
        var opts = {
          clientid: conf.demoClientId,
          paymethodid: demoPaymentMethodId
        };

        conf.whmcs.billing.deletePayMethod(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('paymethodid').to.not.be.null;
          done();
        });
      }
    });
  });

  it('should generate invoices that are due to be generated', function (done) {
    this.timeout(20000);
    var opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.billing.genInvoices(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('numcreated').to.not.be.null;
      done();
    });
  });

  describe('Credit', function () {
    it('should add credit', function (done) {
      var opts = {
        clientid: conf.demoClientId,
        description: 'this is a credit test',
        amount: 1
      };

      conf.whmcs.billing.addCredit(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('newbalance').to.not.be.null;
        done();
      });
    });

    it('should get credits', function (done) {
      var opts = {
        clientid: conf.demoClientId
      };

      conf.whmcs.billing.getCredits(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('credits').to.be.an('object');
        expect(details.credits).to.have.a.property('credit').to.be.an('array').to.have.lengthOf(1);
        done();
      });
    });
  });

  describe('Transaction', function () {
    var demoPaymentMethod, demoTransactionId;

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

    it('should add transaction', function (done) {
      var opts = {
        paymentmethod: demoPaymentMethod,
        userid: conf.demoClientId
      };

      conf.whmcs.billing.addTransaction(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });

    it('should get transactions', function (done) {
      var opts = {
        clientid: conf.demoClientId
      };

      conf.whmcs.billing.getTransactions(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('transactions').to.be.an('object');
        expect(details.transactions).to.have.a.property('transaction').to.be.an('array').to.have.length.greaterThan(0);
        demoTransactionId = details.transactions.transaction[0];
        done();
      });
    });

    it('should update a transaction', function (done) {
      if (demoTransactionId == undefined) {
        this.skip();
      } else {
        var opts = {
          transactionid: demoTransactionId
        };

        conf.whmcs.billing.updateTransaction(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });
  });


});