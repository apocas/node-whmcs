const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Module"', function () {

  it('should get the module queue', async function () {
    const res = await conf.whmcs.module.getModuleQueue();
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('queue').to.be.an('array');
  });

  it('should get the module configuration parameters', async function () {
    const opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    const res = await conf.whmcs.module.getModuleConfigurationParameters(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('parameters').to.be.an('array');
  });

  it('should activate a module', async function () {
    const opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    let res;

    try {
      res = await conf.whmcs.module.activateModule(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    } catch (e) {
      if (e instanceof WhmcsError) {
        const possibleErr = ['Failed to activate:', 'An unexpected error occurred:', 'Module activation not supported by module type.', 'Invalid module name provided.', 'Invalid module type provided. Supported module types include:'];
        expect(possibleErr.some(err => {
          return e.message.indexOf(err) > -1;
        })).to.be.true;
      } else {
        throw e;
      }
    }
  });

  it('should update module configuration parameters', async function () {
    const opts = {
      moduleType: 'gateway',
      moduleName: 'paypal'
    };

    const res = await conf.whmcs.module.updateModuleConfiguration(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
  });

  it('should deactivate a module', async function () {
    const opts = {
      moduleType: 'gateway',
      moduleName: 'paypal',
      newGateway: 'paypal'
    };

    try {
      const res = await conf.whmcs.module.deactivateModule(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    } catch (e) {
      if (e instanceof WhmcsError) {
        expect(e.message).to.have.string('Module deactivation not supported by module type');
      } else {
        throw e;
      }
    }
  });

});