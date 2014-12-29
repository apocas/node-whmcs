var assert = require('assert'),
client = require('./spec_helper').client;


describe('product', function() {

  it('should create, get and delete a ticket', function(done) {
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

      client.support.openTicket(customer.clientid, 1, 'test subject', 'test message', function(err, ticket) {
        if (err) throw err;

        client.support.deleteTicket(ticket.id, function(err, data) {
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
