const expect = require('chai').expect,
  conf = require('./conf'),
  WHMCS = require('../whmcs'),
  Bluebird = require('bluebird');

describe('Internal', function () {
  it('should call an action by name', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 1
    }
    conf.whmcs.callApi('GetActivityLog', opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should handle native promises', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    conf.whmcs.system.getActivityLog(opts)
      .then(function (details) {
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      })
      .catch(function (err) {
        expect(err).to.be.null;
        done();
      });
  });

  it('should handle custom promises library', function (done) {
    let config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      Promise: Bluebird,
    };

    let whmcs = new WHMCS(config);

    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    whmcs.system.getActivityLog(opts)
      .then(function (details) {
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      })
      .catch(function (err) {
        expect(err).to.be.null;
        done();
      });
  });

  it('should throw an error if Promise library is invalid', function () {
    let config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      Promise: {}
    };

    let fn = function () {
      return new WHMCS(config);
    };

    expect(fn).to.throw(Error, 'Invalid promise library.');
  });

  it('should handle XML response', function (done) {
    let config = {
      apiIdentifier: process.env.WHMCS_API_IDENTIFIER || 'apiIdentifier',
      apiSecret: process.env.WHMCS_API_SECRET || 'apiSecret',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      responseType: 'xml'
    };

    let whmcs = new WHMCS(config);

    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    whmcs.system.getActivityLog(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should authenticate with username and password', function (done) {
    let config = {
      username: process.env.WHMCS_USER || 'username',
      password: process.env.WHMCS_PASSWORD || 'password',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs'
    };

    let whmcs = new WHMCS(config);

    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    whmcs.system.getActivityLog(opts)
      .then(function (details) {
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      })
      .catch(function (err) {
        expect(err).to.be.null;
        done();
      });
  });
});