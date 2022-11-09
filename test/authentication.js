const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Authentication"', function () {

  it('should validate user login credential', async function () {
    let opts = {
      email: conf.demoUserDetails.email,
      password2: conf.demoUserDetails.password2
    };
    let res = await conf.whmcs.authentication.validateLogin(opts);
    expect(res).to.have.a.property('data');
    expect(res.data).to.have.a.property('result').to.equal('success');
  });

  it('should create, update, get and delete an OAuth credential', async function () {
    this.timeout(30000);

    let createOpts = {
      email: conf.demoUserDetails.email,
      grantType: 'authorization_code',
      scope: 'clientarea:sso',
      name: 'oauthtest'
    };

    let createRes = await conf.whmcs.authentication.createOAuthCredential(createOpts);
    expect(createRes).to.have.a.property('data');
    expect(createRes.data).to.have.a.property('result').to.equal('success');
    expect(createRes.data).to.have.a.property('credentialId').to.not.be.null;
    let credentialId = createRes.data.credentialId;

    let updateOpts = {
      credentialId: credentialId,
      scope: 'clientarea:billing_info'
    };
    let updateRes = await conf.whmcs.authentication.updateOAuthCredential(updateOpts);
    expect(updateRes).to.have.a.property('data');
    expect(updateRes.data).to.have.a.property('result').to.equal('success');

    let listRes = await conf.whmcs.authentication.listOAuthCredentials();
    expect(listRes).to.have.a.property('data');
    expect(listRes.data).to.have.a.property('result').to.equal('success');
    expect(listRes.data).to.have.a.property('clients').to.be.an('array');
    let c = listRes.data.clients.map(function (client) {
      return client.credentialId;
    });
    expect(c).includes(credentialId);

    let deleteOpts = {
      credentialId: credentialId
    };
    let deleteRes = await conf.whmcs.authentication.deleteOAuthCredential(deleteOpts);
    expect(deleteRes).to.have.a.property('data');
    expect(deleteRes.data).to.have.a.property('result').to.equal('success');
  });

  it('should create a SSO token', async function () {
    let opts = {
      client_id: conf.demoClientId
    };
    let res = await conf.whmcs.authentication.createSsoToken(opts);
    expect(res).to.have.a.property('data');
    expect(res.data).to.have.a.property('result').to.equal('success');
  });
});