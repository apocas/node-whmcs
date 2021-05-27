const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "System"', function () {

  it('should add an ip to ban list', function (done) {
    let opts = {
      ip: '1.2.3.4',
      reason: 'just because',
      days: 1
    };

    conf.whmcs.system.addBannedIp(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  describe('Password encryption', function () {
    let demoPassword = 'n2w47bVW#QABW63vVw',
      encryptedPassword;

    it('should encrypt a password', function (done) {
      let opts = {
        password2: demoPassword
      };

      conf.whmcs.system.encryptPassword(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('password');
        encryptedPassword = details.password;
        done();
      });
    });

    it('should decrypt a password', function (done) {
      if (!encryptedPassword) {
        this.skip();
      } else {
        let opts = {
          password2: encryptedPassword
        };

        conf.whmcs.system.decryptPassword(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('password').to.equal(demoPassword);
          done();
        });
      }
    });
  });

  it('should get activity log', function (done) {
    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    conf.whmcs.system.getActivityLog(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('activity').to.be.an('object');
      expect(details.activity).to.have.a.property('entry').to.be.an('array');
      done();
    });
  });

  it('should get admin details', function (done) {
    conf.whmcs.system.getAdminDetails(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('adminid');
      done();
    });
  });

  it('should get admin users', function (done) {
    conf.whmcs.system.getAdminUsers(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('admin_users').to.be.an('array');
      done();
    });
  });

  it('should get automation log', function (done) {
    conf.whmcs.system.getAutomationLog(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('currentDatetime');
      done();
    });
  });

  it('should get configuration value', function (done) {
    let opts = {
      setting: 'Language'
    };
    conf.whmcs.system.getConfigurationValue(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('setting');
      done();
    });
  });

  it('should get currencies', function (done) {
    conf.whmcs.system.getCurrencies(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('currencies').to.be.an.an('object');
      expect(details.currencies).to.have.a.property('currency').to.be.an.an('array');
      done();
    });
  });

  it('should get email templates', function (done) {
    conf.whmcs.system.getEmailTemplates(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('emailtemplates').to.be.an.an('object');
      expect(details.emailtemplates).to.have.a.property('emailtemplate').to.be.an.an('array');
      done();
    });
  });

  it('should get payment methods', function (done) {
    conf.whmcs.system.getPaymentMethods(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('paymentmethods').to.be.an.an('object');
      expect(details.paymentmethods).to.have.a.property('paymentmethod').to.be.an.an('array');
      done();
    });
  });

  it('should get staff online', function (done) {
    conf.whmcs.system.getStaffOnline(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('staffonline').to.be.an.an('object');
      expect(details.staffonline).to.have.a.property('staff').to.be.an.an('array');
      done();
    });
  });

  it('should get stats', function (done) {
    conf.whmcs.system.getStats(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('income_today');
      done();
    });
  });

  it('should get todo items', function (done) {
    conf.whmcs.system.getToDoItems(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should get todo item statuses', function (done) {
    conf.whmcs.system.getToDoItemStatuses(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('todoitemstatuses').to.be.an.an('object');
      expect(details.todoitemstatuses).to.have.a.property('status').to.be.an.an('array');
      done();
    });
  });

  it('should create a log activity', function (done) {
    let opts = {
      clientid: conf.demoClientId,
      description: 'log activity test'
    };
    conf.whmcs.system.logActivity(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should send an admin email notification', function (done) {
    let opts = {
      customsubject: 'notification test',
      custommessage: 'this is a notification test'
    };
    conf.whmcs.system.sendAdminEmail(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should send a client email notification', function (done) {
    let opts = {
      id: conf.demoClientId,
      customsubject: 'notification test',
      custommessage: 'this is a notification test',
      customtype: 'general'
    };
    conf.whmcs.system.sendEmail(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should set a configuration value', function (done) {
    let opts = {
      setting: 'CompanyName',
      value: 'My company'
    };
    conf.whmcs.system.setConfigurationValue(opts, function (err, details) {
      if (err && err.message.indexOf('API Command Restricted to Internal API') > -1) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should trigger a custom notification event', function (done) {
    let opts = {
      title: 'Notification test',
      message: 'this is a custom notification',
      notification_identifier: 'test'
    };
    conf.whmcs.system.triggerNotificationEvent(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  it('should update admin notes', function (done) {
    let opts = {
      notes: 'This is a note'
    };
    conf.whmcs.system.updateAdminNotes(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  describe('Announcements', function () {
    let demoAnnouncementId;

    before(function (done) {
      let opts = {
        date: '1969-07-11',
        title: 'There\'s something wrong',
        announcement: 'Your circuit\'s dead'
      };

      conf.whmcs.support.addAnnouncement(opts, function (err, details) {
        if (err) {
          throw err;
        } else {
          demoAnnouncementId = details.announcementid;
          done();
        }
      });
    });

    it('should update an announcement', function (done) {
      let opts = {
        announcementid: demoAnnouncementId,
        title: 'Can you hear me Major Tom?'
      };
      conf.whmcs.system.updateAnnouncement(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });
  });

  it('should get whmcs details', function (done) {
    conf.whmcs.system.whmcsDetails(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('whmcs');
      done();
    });
  });
});