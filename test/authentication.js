var expect = require('chai').expect,
  conf = require('./conf');
const { domainToUnicode } = require('url');

describe('Module "Authentication"', function () {

  it('should validate user login credential', function (done) {
    var opts = {
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
    var opts = {
      email: conf.demoUserDetails.email,
      grantType: 'authorization_code',
      scope: 'clientarea:sso',
      name: 'oauthtest'
    };
    conf.whmcs.authentication.createOAuthCredential(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('credentialId');
      var credentialId = details.credentialId;

      var opts = {
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
          var c = details.clients.map(function (client) {
            return client.credentialId;
          });
          expect(c).includes(credentialId);

          var opts = {
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
    var opts = {
      client_id: conf.demoClientId
    };
    conf.whmcs.authentication.createSsoToken(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });
});