const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Users"', function () {
  it('should send an invite to manage a client', async function () {
    let opts = {
      client_id: conf.demoClientId,
      email: 'johndoefriend@john.doe',
      permissions: 'products,domains'
    }
    let res = await conf.whmcs.users.createClientInvite(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get a list of permissions that can be used when creating a user', async function () {
    let res = await conf.whmcs.users.getPermissionsList();
    expect(res).to.have.a.property('permissions').to.be.an('object');
    expect(res.permissions).to.have.a.property('permission').to.be.an('array').to.have.length.above(0);
  });

  it('should get the permissions of an user, for a client', async function () {
    let opts = {
      user_id: conf.demoUserId,
      client_id: conf.demoClientId
    };
    let res = await conf.whmcs.users.getUserPermissions(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get users according to search limit', async function () {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    let res = await conf.whmcs.users.getUsers(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('users').to.be.an('array')
    expect(res.users).to.have.length.above(0);
    expect(res.users).to.have.length.below(26);
  });

  it('should start the password reset process for an user, by user id', async function () {
    let opts = {
      id: conf.demoUserId
    };
    let res = await conf.whmcs.users.resetPassword(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should update an user', async function () {
    let opts = {
      user_id: conf.demoUserId,
      lastname: 'updated lastname'
    };
    let res = await conf.whmcs.users.updateUser(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get an user by email', async function () {
    let opts = {
      search: 'johndoe@john.doe'
    }
    let res = await conf.whmcs.users.getUsers(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('numreturned').to.equal(1);
    expect(res).to.have.a.property('users');
    expect(res.users).to.be.an('array');
    expect(res.users).to.have.lengthOf(1);
  });
});