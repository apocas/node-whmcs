const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Servers"', function () {

  it('should get servers', function (done) {
    conf.whmcs.servers.getServers(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get health status', function (done) {
    conf.whmcs.servers.getHealthStatus(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

});