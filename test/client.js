const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Client"', function () {

  it('should create a client, create a contact, close the client and then delete both of them', async function () {
    this.timeout(30000);
    const clientOpts = {
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

    const clientRes = await conf.whmcs.client.addClient(clientOpts);
    expect(clientRes).to.have.a.property('result').to.equal('success');
    expect(clientRes).to.have.a.property('owner_id').to.not.be.null;
    expect(clientRes).to.have.a.property('clientid').to.not.be.null;

    const clientId = clientRes.clientid;

    const contactOpts = {
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
    const contactRes = await conf.whmcs.client.addContact(contactOpts);
    expect(contactRes).to.have.a.property('result').to.equal('success');
    expect(contactRes).to.have.a.property('contactid').to.not.be.null;

    const contactId = contactRes.contactid;

    const delContactOpts = {
      contactid: contactId
    }
    const delContactRes = await conf.whmcs.client.deleteContact(delContactOpts);
    expect(delContactRes).to.have.a.property('result').to.equal('success');

    const closeOpts = {
      clientid: clientId
    }
    const closeRes = await conf.whmcs.client.closeClient(closeOpts);
    expect(closeRes).to.have.a.property('result').to.equal('success');

    const delClientOpts = {
      clientid: clientId,
      deleteusers: true,
      deletetransactions: true
    }
    const delClientRes = await conf.whmcs.client.deleteClient(delClientOpts);
    expect(delClientRes).to.have.a.property('result').to.equal('success');
  });

  it('should get cancellation requests', async function () {
    const opts = {
      limitstart: 0,
      limitnum: 25
    };
    const res = await conf.whmcs.client.getCancelledPackages(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.not.be.null;
    if (parseInt(res.numreturned) > 0) {
      expect(res).to.have.a.property('packages').to.be.an('object');
      expect(res.packages).to.have.a.property('package').to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get client groups', async function () {
    const res = await conf.whmcs.client.getClientGroups();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('groups').to.be.an.an('object');
      expect(res.groups).to.have.a.property('group');
      expect(res.groups.group).to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get the encrypted password, by user id', async function () {
    const opts = {
      userid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getClientPassword(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('password').to.be.a('string');
  });

  it('should get the encrypted password, by user email address', async function () {
    const opts = {
      email: conf.demoUserDetails.email
    };
    const res = await conf.whmcs.client.getClientPassword(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get clients by email', async function () {
    const opts = {
      search: conf.demoUserDetails.email
    };
    const res = await conf.whmcs.client.getClients(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.equal(1);
    expect(res).to.have.a.property('clients').to.be.an.an('object');
    expect(res.clients).to.have.a.property('client');
    expect(res.clients.client).to.be.an('array').to.have.lengthOf(1);
  });

  it('should get client addons', async function () {
    const opts = {
      clientid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getClientsAddons(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res.gteBody()).to.have.a.property('addons').to.be.an('object');
      expect(res.addons).to.have.a.property('addon').to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get client details by id', async function () {
    const opts = {
      clientid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getClientsDetails(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('client').to.be.an.an('object');
  });

  it('should get client domains by client id', async function () {
    const opts = {
      clientid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getClientsDomains(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('domains').to.be.an.an('object');
      expect(res.domains).to.have.a.property('domain');
      expect(res.domains.domain).to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get clients products by client id', async function () {
    const opts = {
      clientid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getClientsProducts(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('products').to.be.an.an('object');
      expect(res.products).to.have.a.property('product');
      expect(res.products.product).to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get clients contacts by client id', async function () {
    const opts = {
      userid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getContacts(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.not.be.null;
    if (parseInt(res.numreturned) > 0) {
      expect(res).to.have.a.property('contacts').to.be.an.an('object');
      expect(res.contacts).to.have.a.property('contact');
      expect(res.contacts.contact).to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should get clients emails', async function () {
    const opts = {
      clientid: conf.demoClientId
    };
    const res = await conf.whmcs.client.getEmails(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.not.be.null;
    if (parseInt(res.numreturned) > 0) {
      expect(res).to.have.a.property('emails').to.be.an.an('object');
      expect(res.emails).to.have.a.property('email');
      expect(res.emails.email).to.be.an('array').to.have.length.greaterThan(0);
    }
  });

  it('should update client by clientid', async function () {
    const updateOpts = {
      clientid: conf.demoClientId,
      lastname: 'updated1'
    };
    const updateRes = await conf.whmcs.client.updateClient(updateOpts);
    expect(updateRes).to.have.a.property('result').to.equal('success');
    expect(updateRes).to.have.a.property('clientid').to.equal(conf.demoClientId.toString());
  });

  it('should update contact by contact id', async function () {
    const updateOpts = {
      contactid: conf.demoContactId,
      lastname: 'newlastname'
    };
    const updateRes = await conf.whmcs.client.updateContact(updateOpts);
    expect(updateRes).to.have.a.property('result').to.equal('success');
    expect(updateRes).to.have.a.property('contactid').to.equal(conf.demoContactId.toString());
  });

});