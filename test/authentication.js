const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Authentication"', function () {

  it('should validate user login credential', async function () {
    const opts = {
      email: conf.demoUserDetails.email,
      password2: conf.demoUserDetails.password2
    };
    const res = await conf.whmcs.authentication.validateLogin(opts);;
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should create, update, get and delete an OAuth credential', async function () {
    this.timeout(30000);

    const createOpts = {
      email: conf.demoUserDetails.email,
      grantType: 'authorization_code',
      scope: 'clientarea:sso',
      name: 'oauthtest'
    };

    const createRes = await conf.whmcs.authentication.createOAuthCredential(createOpts);;
    expect(createRes).to.have.a.property('result').to.equal('success');
    expect(createRes).to.have.a.property('credentialId').to.not.be.null;
    const credentialId = createRes.credentialId;

    const updateOpts = {
      credentialId: credentialId,
      scope: 'clientarea:billing_info'
    };
    const updateRes = await conf.whmcs.authentication.updateOAuthCredential(updateOpts);;
    expect(updateRes).to.have.a.property('result').to.equal('success');

    const listRes = await conf.whmcs.authentication.listOAuthCredentials();;
    expect(listRes).to.have.a.property('result').to.equal('success');
    expect(listRes).to.have.a.property('clients').to.be.an('array');
    const c = listRes.clients.map(function (client) {
      return client.credentialId;
    });
    expect(c).includes(credentialId);

    const deleteOpts = {
      credentialId: credentialId
    };
    const deleteRes = await conf.whmcs.authentication.deleteOAuthCredential(deleteOpts);;
    expect(deleteRes).to.have.a.property('result').to.equal('success');
  });

  it('should create a SSO token', async function () {
    const opts = {
      client_id: conf.demoClientId
    };
    const res = await conf.whmcs.authentication.createSsoToken(opts);;
    expect(res).to.have.a.property('result').to.equal('success');
  });
});