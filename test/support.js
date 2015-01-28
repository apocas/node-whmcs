var assert = require('assert'),
  expect = require('chai').expect,
  client = require('./spec_helper').client;


describe('support', function() {

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
      expect(err).to.be.null;

      client.support.openTicket(customer.clientid, 1, 'test subject', 'test message', function(err, ticket) {
        expect(err).to.be.null;

        client.support.updateTicket({ticketid:ticket.id,subject:'test change subject'}, function(err) {
          expect(err).to.be.null;

          client.support.deleteTicket(ticket.id, function(err, data) {
            expect(err).to.be.null;

            client.customers.deleteCustomer(customer.clientid, function(err, data) {
              expect(err).to.be.null;
              done();
            });
          });
        });
      });
    });
  });

  it('should get tickets', function(done) {
    client.support.getTickets(function(err, tickets) {
      expect(err).to.be.null;
      done();
    });
  });

});
