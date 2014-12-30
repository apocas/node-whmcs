var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client;


describe('customers', function() {

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
      expect(err).to.be.undefined;

      client.customers.getCustomer(customer.clientid, function(err, customer) {
        expect(err).to.be.undefined;

        client.customers.deleteCustomer(customer.client.id, function(err, data) {
          expect(err).to.be.undefined;
          done();
        });
      });
    });
  });

});
