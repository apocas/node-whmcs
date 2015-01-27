var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client;


describe('billing', function() {

  it('should create and delete an order', function(done) {
    this.timeout(15000);

    var opts = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@john.doe',
      address1: 'Mars',
      city: 'Phobos',
      state: 'Crater',
      postcode: '9999-999',
      country: 'US',
      phonenumber: '123456789',
      password2: '123qwe'
    };

    client.customers.createCustomer(opts, function(err, customer) {
      expect(err).to.be.null;

      var ordero = {
        'paymentmethod': 'banktransfer'
      };
      ordero['pid[0]'] = 1;
      ordero['domain[0]'] = 'xpto.com';
      ordero['billingcycle[0]'] = 'monthly';

      client.billing.addOrder(customer.clientid, ordero, function(err, order) {
        expect(err).to.be.null;

        client.billing.deleteOrder(order.orderid, function(err, data) {
          expect(err).to.be.null;

          client.customers.deleteCustomer(customer.clientid, function(err, data) {
            expect(err).to.be.null;
            done();
          });
        });
      });
    });
  });

  it('should create an invoice and cancel it', function(done) {
    this.timeout(15000);

    var invoiceo = {
      'paymentmethod': 'banktransfer',
      'date': '20141230',
      'duedate': '20141230',
      'itemdescription1': 'test item',
      'itemamount1': 1,
      'itemtaxed1': true
    };

    client.billing.createInvoice(2, invoiceo, function(err, invoice) {
      expect(err).to.be.null;

      client.billing.updateInvoice(invoice.invoiceid, {'status': 'Cancelled'}, function(err, data) {
        expect(err).to.be.null;

        client.billing.getInvoice(invoice.invoiceid, function(err, invoice) {
          expect(err).to.be.null;

          expect(invoice.status).to.equal('Cancelled');

          done();
        });
      });
    });
  });


});
