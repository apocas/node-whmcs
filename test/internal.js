const expect = require('chai').expect,
  conf = require('./conf'),
  WHMCS = require('../whmcs'),
  Bluebird = require('bluebird'),
  WhmcsError = require('../lib/whmcserror');

describe('Internal', function () {
  it('should call an action by name', async function () {
    const opts = {
      limitstart: 0,
      limitnum: 1
    }
    const res = await conf.whmcs.callApi('GetActivityLog', opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should handle callbacks', function (done) {
    const opts = {
      limitstart: 0,
      limitnum: 1
    }
    conf.whmcs.callApi('GetActivityLog', opts, function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should handle native promises', function () {
    const opts = {
      limitstart: 0,
      limitnum: 1
    };

    const promise = conf.whmcs.system.getActivityLog(opts);
    expect(promise).to.be.instanceOf(Promise);

    return promise.then(function (res) {
      expect(res).to.have.a.property('result').to.equal('success');
    });
  });

  it('should handle custom promises library', function () {
    const config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      accessKey: process.env.WHMCS_AK,
      Promise: Bluebird,
    };

    const whmcs = new WHMCS(config);

    const opts = {
      limitstart: 0,
      limitnum: 1
    };

    const promise = whmcs.system.getActivityLog(opts);
    expect(promise).to.be.instanceOf(Bluebird);

    return promise.then(function (res) {
      expect(res).to.have.a.property('result').to.equal('success');
    });
  });

  it('should throw an error if Promise library is invalid', function () {
    const config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      accessKey: process.env.WHMCS_AK,
      Promise: {}
    };

    const fn = function () {
      return new WHMCS(config);
    };

    expect(fn).to.throw(Error, 'Invalid promise library.');
  });

  it('should handle XML response', async function () {
    const config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      accessKey: process.env.WHMCS_AK,
      responseType: 'xml'
    };

    const whmcs = new WHMCS(config);

    const opts = {
      limitstart: 0,
      limitnum: 1
    };

    const res = await whmcs.system.getActivityLog(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('action').to.equal('getactivitylog');
  });

  it('should authenticate with username and password', async function () {
    const config = {
      username: process.env.WHMCS_USER || 'username',
      password: process.env.WHMCS_PASSWORD || 'password',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      accessKey: process.env.WHMCS_AK,
    };

    const whmcs = new WHMCS(config);

    const opts = {
      limitstart: 0,
      limitnum: 1
    };

    const res = await whmcs.system.getActivityLog(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });
});