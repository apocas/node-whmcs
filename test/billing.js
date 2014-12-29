var assert = require('assert'),
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
      if (err) throw err;

      var ordero = {
        'paymentmethod': 'banktransfer'
      };
      ordero['pid[0]'] = 1;
      ordero['domain[0]'] = 'xpto.com';
      ordero['billingcycle[0]'] = 'monthly';

      client.billing.addOrder(customer.clientid, ordero, function(err, order) {
        if (err) throw err;

        client.billing.deleteOrder(order.orderid, function(err, data) {
          if (err) throw err;

          client.customers.deleteCustomer(customer.clientid, function(err, data) {
            if (err) throw err;
            done();
          });
        });
      });
    });
  });

});
