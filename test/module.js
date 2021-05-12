var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Module"', function () {

  it('should get the module queue', function (done) {
    conf.whmcs.module.getModuleQueue(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('queue').to.be.an('array');
      done();
    });
  });

  it('should get the module configuration parameters', function (done) {
    var opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    conf.whmcs.module.getModuleConfigurationParameters(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('parameters').to.be.an('array');
      done();
    });
  });

  it('should activate a module', function (done) {
    var opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    conf.whmcs.module.activateModule(opts, function (err, details) {
      if (err && err.message.indexOf('Failed to activate: Module already active') > -1) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should update module configuration parameters', function (done) {
    var opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    conf.whmcs.module.updateModuleConfiguration(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should deactivate a module', function (done) {
    var opts = {
      moduleType: 'gateway',
      moduleName: 'paypal',
      newGateway: 'paypal'
    };

    conf.whmcs.module.deactivateModule(opts, function (err, details) {
      expect(err).to.have.a.property('message');
      expect(err.message).to.have.string('Module deactivation not supported by module type');
      done();
    });
  });

});