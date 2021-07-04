const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Client"', function () {

  it('should create a client, create a contact, close the client and then delete both of them', function (done) {
    this.timeout(30000);
    let opts = {
      firstname: 'Major',
      lastname: 'Tom',
      email: 'majortom@john.doe',
      address1: 'Mars',
      city: 'Phobos',
      state: 'Crater',
      postcode: '9999-999',
      country: 'US',
      phonenumber: '10987654321',
      password2: 'liftoff'
    };
    conf.whmcs.client.addClient(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('owner_id');
      expect(details).to.have.a.property('clientid');
      let clientId = details.clientid;

      let opts = {
        clientid: clientId,
        firstname: 'Ground',
        lastname: 'Control',
        email: 'groundcontrol@john.doe',
        address1: 'Earth',
        city: 'Phobos',
        state: 'Crater',
        postcode: '9999-999',
        country: 'US',
        phonenumber: '911911911'
      }
      conf.whmcs.client.addContact(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('contactid');
        let contactId = details.contactid;

        let opts = {
          contactid: contactId
        }
        conf.whmcs.client.deleteContact(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');

          let opts = {
            clientid: clientId
          }
          conf.whmcs.client.closeClient(opts, function (err, details) {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');

            let opts = {
              clientid: clientId,
              deleteusers: true,
              deletetransactions: true
            }
            conf.whmcs.client.deleteClient(opts, function (err, details) {
              expect(err).to.be.null;
              expect(details).to.have.a.property('result').to.equal('success');
              done();
            });
          });
        });
      });
    });
  });

  it('should get cancellation requests', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.client.getCancelledPackages(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('packages');
      done();
    });
  });

  it('should get client groups', function (done) {
    conf.whmcs.client.getClientGroups(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('groups').to.be.an.an('object');
      expect(details.groups).to.have.a.property('group');
      expect(details.groups.group).to.be.an('array');
      done();
    });
  });

  it('should get the encrypted password, by user id', function (done) {
    let opts = {
      userid: conf.demoClientId
    };
    conf.whmcs.client.getClientPassword(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('password').to.be.a('string');
      done();
    });
  });

  it('should get the encrypted password, by user email address', function (done) {
    let opts = {
      email: conf.demoUserDetails.email
    };
    conf.whmcs.client.getClientPassword(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('password').to.be.a('string');
      done();
    });
  });

  it('should get clients', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.client.getClients(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('clients').to.be.an.an('object');
      expect(details.clients).to.have.a.property('client');
      expect(details.clients.client).to.be.an('array').to.have.length.above(0);
      done();
    });
  });

  it('should get clients by email', function (done) {
    let opts = {
      search: conf.demoUserDetails.email
    };
    conf.whmcs.client.getClients(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('numreturned').to.equal(1);
      expect(details).to.have.a.property('clients').to.be.an.an('object');
      expect(details.clients).to.have.a.property('client');
      expect(details.clients.client).to.be.an('array').to.have.lengthOf(1);
      done();
    });
  });

  it('should get client addons', function (done) {
    let opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.client.getClientsAddons(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get client details by id', function (done) {
    let opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.client.getClientsDetails(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('client').to.be.an.an('object');
      done();
    });
  });

  it('should get client details by email address', function (done) {
    let opts = {
      email: conf.demoUserDetails.email
    };
    conf.whmcs.client.getClientsDetails(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('client').to.be.an.an('object');
      done();
    });
  });

  it('should get clients domains', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.client.getClientsDomains(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('domains').to.be.an.an('object');
      expect(details.domains).to.have.a.property('domain');
      expect(details.domains.domain).to.be.an('array');
      done();
    });
  });

  it('should get client domains by client id', function (done) {
    let opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.client.getClientsDomains(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get clients products', function (done) {
    this.timeout(30000);
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.client.getClientsProducts(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('products').to.be.an.an('object');
      expect(details.products).to.have.a.property('product');
      expect(details.products.product).to.be.an('array');
      done();
    });
  });

  it('should get clients products by client id', function (done) {
    let opts = {
      clientid: conf.demoClientId
    };
    conf.whmcs.client.getClientsProducts(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get clients contacts', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.client.getContacts(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('contacts').to.be.an.an('object');
      expect(details.contacts).to.have.a.property('contact');
      expect(details.contacts.contact).to.be.an('array');
      done();
    });
  });

  it('should get clients contacts by client id', function (done) {
    let opts = {
      userid: conf.demoClientId
    };
    conf.whmcs.client.getContacts(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('contacts').to.be.an.an('object');
      expect(details.contacts).to.have.a.property('contact');
      expect(details.contacts.contact).to.be.an('array');
      done();
    });
  });

  it('should get clients emails', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25,
      clientid: conf.demoClientId
    };
    conf.whmcs.client.getEmails(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('emails').to.be.an.an('object');
      expect(details.emails).to.have.a.property('email');
      expect(details.emails.email).to.be.an('array');
      done();
    });
  });

  it('should update client by clientid', function (done) {
    let opts = {
      clientid: conf.demoClientId,
      lastname: 'updated1'
    };
    conf.whmcs.client.updateClient(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');

      let opts = {
        clientid: conf.demoClientId
      };
      conf.whmcs.client.getClientsDetails(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('client').to.be.an.an('object');
        expect(details.client).to.have.a.property('lastname').to.equal('updated1');
        done();
      });
    });
  });

  it('should update client by email', function (done) {
    let opts = {
      clientemail: conf.demoUserDetails.email,
      lastname: 'updated2'
    };
    conf.whmcs.client.updateClient(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');

      let opts = {
        clientid: conf.demoClientId
      };
      conf.whmcs.client.getClientsDetails(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('client').to.be.an.an('object');
        expect(details.client).to.have.a.property('lastname').to.equal('updated2');
        done();
      });
    });
  });

  it('should update contact by contact id', function (done) {
    let opts = {
      contactid: conf.demoContactId,
      lastname: 'newlastname'
    };
    conf.whmcs.client.updateContact(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');

      let opts = {
        userid: conf.demoClientId,
        email: conf.demoContactDetails.email
      };
      conf.whmcs.client.getContacts(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('contacts').to.be.an.an('object');
        expect(details.contacts).to.have.a.property('contact');
        expect(details.contacts.contact).to.be.an('array').to.have.lengthOf(1);
        expect(details.contacts.contact[0]).to.have.a.property('lastname').to.equal('newlastname');
        done();
      });
    });
  });

});