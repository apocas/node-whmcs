var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Addons"', function () {

  it('should update client addon', function (done) {
    var opts = {
      id: 1
    };
    conf.whmcs.addons.updateClientAddon(opts, function (err, details) {
      if (err && err.message.indexOf('Addon ID Not Found') > -1) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

});