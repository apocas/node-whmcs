var expect = require('chai').expect,
  conf = require('./conf');

describe('Custom actions', function () {
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
});