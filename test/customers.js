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
      expect(err).to.be.null;

      client.customers.getCustomer(customer.clientid, function(err, customer) {
        expect(err).to.be.null;

        client.customers.deleteCustomer(customer.client.id, function(err, data) {
          expect(err).to.be.null;
          done();
        });
      });
    });
  });

  it('should create, get and delete a customer by email', function(done) {
    this.timeout(15000);

    var opts = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@john.doee',
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

      client.customers.getCustomerByEmail('johndoe@john.doee', function(err, customer) {
        expect(err).to.be.null;

        client.customers.deleteCustomer(customer.client.id, function(err, data) {
          expect(err).to.be.null;
          done();
        });
      });
    });
  });

  it('should get credits', function(done) {
    this.timeout(15000);

    client.customers.getCredits(2, function(err, credits) {
      expect(err).to.be.null;

      done();
    });
  });

});
