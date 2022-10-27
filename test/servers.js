const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Servers"', function () {

  it('should get servers', async function () {
    let res = await conf.whmcs.servers.getServers();
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get health status', async function () {
    let res = await conf.whmcs.servers.getHealthStatus();
    expect(res).to.have.a.property('result').to.equal('success');
  });

});