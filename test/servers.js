const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Servers"', function () {

  it('should get servers', async function () {
    const res = await conf.whmcs.servers.getServers();
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
  });

  it('should get health status', async function () {
    const res = await conf.whmcs.servers.getHealthStatus();
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
  });

});