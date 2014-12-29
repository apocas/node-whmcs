var assert = require('assert'),
  client = require('./spec_helper').client;


describe('product', function() {

  it('should create, get and delete a customer', function(done) {
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

      client.customers.getCustomer(customer.clientid, function(err, customer) {
        if (err) throw err;

        client.customers.deleteCustomer(customer.client.id, function(err, data) {
          if (err) throw err;
          done();
        });
      });
    });
  });

});
