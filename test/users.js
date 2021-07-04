const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Users"', function () {
  it('should unlink an user from client', function (done) {
    done();
  });

  it('should unlink a client from user', function (done) {
    done();
  });

  it('should send an invite to manage a client', function (done) {
    let opts = {
      client_id: conf.demoClientId,
      email: 'johndoefriend@john.doe',
      permissions: 'products,domains'
    }
    conf.whmcs.users.createClientInvite(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get a list of permissions that can be used when creating a user', function (done) {
    conf.whmcs.users.getPermissionsList(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('permissions').to.be.an('object');
      expect(details.permissions).to.have.a.property('permission').to.be.an('array').to.have.length.above(0);
      done();
    });
  });

  it('should get the permissions of an user, for a client', function (done) {
    let opts = {
      user_id: conf.demoUserId,
      client_id: conf.demoClientId
    };
    conf.whmcs.users.getUserPermissions(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get users according to search limit', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 25
    };
    conf.whmcs.users.getUsers(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('users').to.be.an('array')
      expect(details.users).to.have.length.above(0);
      expect(details.users).to.have.length.below(26);
      done();
    });
  });

  it('should start the password reset process for an user, by user id', function (done) {
    let opts = {
      id: conf.demoUserId
    };
    conf.whmcs.users.resetPassword(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should start the password reset process for an user, by email', function (done) {
    let opts = {
      email: conf.demoUserDetails.email
    };
    conf.whmcs.users.resetPassword(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should update an user', function (done) {
    let opts = {
      user_id: conf.demoUserId,
      lastname: 'updated lastname'
    };
    conf.whmcs.users.updateUser(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should update the permissions of an user, for a client', function (done) {
    //TODO
    // let opts = {
    //   user_id: xxx
    //   client_id: xxx
    //   permissions: 'domains,products'
    // };
    // conf.whmcs.users.updateUser(opts, function (err, details) {
    //   expect(err).to.be.null;
    //   expect(details).to.have.a.property('result').to.equal('success');
    //   done();
    // });
    done();
  });

  it('should get an user by email', function (done) {
    let opts = {
      search: 'johndoe@john.doe'
    }
    conf.whmcs.users.getUsers(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('numreturned').to.equal(1);
      expect(details).to.have.a.property('users');
      expect(details.users).to.be.an('array');
      expect(details.users).to.have.lengthOf(1);
      done();
    });
  });
});