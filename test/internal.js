var expect = require('chai').expect,
  conf = require('./conf'),
  WHMCS = require('../whmcs');

describe('Internal', function () {
  it('should call an action by name', function (done) {
    var opts = {
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
    var opts = {
      limitstart: 0,
      limitnum: 1
    }
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
    var opts = {
      limitstart: 0,
      limitnum: 1
    }
    conf.whmcsWithCustomPromise.system.getActivityLog(opts)
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
    var config = {
      username: process.env.WHMCS_USER || 'username',
      password: process.env.WHMCS_KEY || 'password',
      apiKey: process.env.WHMCS_AK || 'accessKey',
      serverUrl: process.env.WHMCS_URL || 'http://192.168.1.1',
      userAgent: process.env.WHMCS_USERAGENT || 'node-whmcs',
      Promise: {}
    };

    var fn = function () {
      return new WHMCS(config);
    };

    expect(fn).to.throw(Error, 'Invalid promise library.');
  });

  it('should handle XML response', function (done) {
    var opts = {
      limitstart: 0,
      limitnum: 1
    }
    conf.whmcsWithXml.system.getActivityLog(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });
});