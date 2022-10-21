const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Addons"', function () {

  it('should update client addon', async function () {
    let opts = {
      id: 1
    };

    try {
      let res = await conf.whmcs.addons.updateClientAddon(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    } catch (e) {
      if (e instanceof WhmcsError){
        let possibleErr = ['Addon ID Not Found', 'Nothing to Update'];
        expect(possibleErr.indexOf(e.message) > -1).to.be.true;
      } else {
        throw e;
      }
    }
  });

});