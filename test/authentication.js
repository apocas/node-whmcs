const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Authentication"', function () {

  it('should validate user login credential', function (done) {
    let opts = {
      email: conf.demoUserDetails.email,
      password2: conf.demoUserDetails.password2
    };
    conf.whmcs.authentication.validateLogin(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should create, update, get and delete an OAuth credential', function (done) {
    this.timeout(30000);
    let opts = {
      email: conf.demoUserDetails.email,
      grantType: 'authorization_code',
      scope: 'clientarea:sso',
      name: 'oauthtest'
    };
    conf.whmcs.authentication.createOAuthCredential(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('credentialId');
      let credentialId = details.credentialId;

      let opts = {
        credentialId: credentialId,
        scope: 'clientarea:billing_info'
      };
      conf.whmcs.authentication.updateOAuthCredential(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');

        conf.whmcs.authentication.listOAuthCredentials(function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('clients').to.be.an('array');
          let c = details.clients.map(function (client) {
            return client.credentialId;
          });
          expect(c).includes(credentialId);

          let opts = {
            credentialId: credentialId
          };
          conf.whmcs.authentication.deleteOAuthCredential(opts, function (err, details) {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');
            done();
          });
        });
      });
    });
  });

  it('should create a SSO token', function (done) {
    let opts = {
      client_id: conf.demoClientId
    };
    conf.whmcs.authentication.createSsoToken(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });
});