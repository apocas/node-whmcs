const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "System"', function () {

  it('should add an ip to ban list', async function () {
    let opts = {
      ip: '1.2.3.4',
      reason: 'just because',
      days: 1
    };

    let res = await conf.whmcs.system.addBannedIp(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  describe('Password encryption', function () {
    let demoPassword = 'n2w47bVW#QABW63vVw',
      encryptedPassword;

    it('should encrypt a password', async function () {
      let opts = {
        password2: demoPassword
      };

      let res = await conf.whmcs.system.encryptPassword(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('password').to.be.a.string;
      encryptedPassword = res.password;
    });

    it('should decrypt a password', async function () {
      let opts = {
        password2: encryptedPassword
      };

      let res = await conf.whmcs.system.decryptPassword(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('password').to.equal(demoPassword);
    });
  });

  it('should get activity log', async function () {
    let opts = {
      limitstart: 0,
      limitnum: 1
    };

    let res = await conf.whmcs.system.getActivityLog(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('activity').to.be.an('object');
    expect(res.activity).to.have.a.property('entry').to.be.an('array');

  });

  it('should get admin details', async function () {
    let res = await conf.whmcs.system.getAdminDetails();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('adminid').to.not.be.null;
  });

  it('should get admin users', async function () {
    let res = await conf.whmcs.system.getAdminUsers();
    expect(res).to.have.a.property('admin_users').to.be.an('array');
  });

  it('should get automation log', async function () {
    let res = await conf.whmcs.system.getAutomationLog();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('currentDatetime').to.not.be.null;
  });

  it('should get configuration value', async function () {
    let opts = {
      setting: 'Language'
    };
    let res = await conf.whmcs.system.getConfigurationValue(opts);
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('setting').to.not.be.null;

  });

  it('should get currencies', async function () {
    let res = await conf.whmcs.system.getCurrencies();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('currencies').to.be.an.an('object');
    expect(res.currencies).to.have.a.property('currency').to.be.an.an('array')
  });

  it('should get email templates', async function () {
    let res = await conf.whmcs.system.getEmailTemplates();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('emailtemplates').to.be.an.an('object');
    expect(res.emailtemplates).to.have.a.property('emailtemplate').to.be.an.an('array');
  });

  it('should get payment methods', async function () {
    let res = await conf.whmcs.system.getPaymentMethods();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('paymentmethods').to.be.an.an('object');
    expect(res.paymentmethods).to.have.a.property('paymentmethod').to.be.an.an('array');
  });

  it('should get staff online', async function () {
    let res = await conf.whmcs.system.getStaffOnline();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('staffonline').to.be.an.an('object');
    expect(res.staffonline).to.have.a.property('staff').to.be.an.an('array');
  });

  it('should get stats', async function () {
    let res = await conf.whmcs.system.getStats();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('income_today').to.not.be.null;
  });

  it('should get todo items', async function () {
    let res = await conf.whmcs.system.getToDoItems();
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should get todo item statuses', async function () {
    let res = await conf.whmcs.system.getToDoItemStatuses();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('todoitemstatuses').to.be.an.an('object');
    expect(res.todoitemstatuses).to.have.a.property('status').to.be.an.an('array');
  });

  it('should create a log activity', async function () {
    let opts = {
      clientid: conf.demoClientId,
      description: 'log activity test'
    };
    let res = await conf.whmcs.system.logActivity(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should send an admin email notification', async function () {
    let opts = {
      customsubject: 'notification test',
      custommessage: 'this is a notification test'
    };
    let res = await conf.whmcs.system.sendAdminEmail(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should send a client email notification', async function () {
    let opts = {
      id: conf.demoClientId,
      customsubject: 'notification test',
      custommessage: 'this is a notification test',
      customtype: 'general'
    };
    let res = await conf.whmcs.system.sendEmail(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should set a configuration value', async function () {
    let opts = {
      setting: 'CompanyName',
      value: 'My company'
    };
    let res;

    try {
      res = await conf.whmcs.system.setConfigurationValue(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    } catch (e) {
      if (e instanceof WhmcsError) {
        let possibleErr = ['API Command Restricted to Internal API'];
        expect(possibleErr.some(err => {
          return e.message.indexOf(err) > -1;
        })).to.be.true;
      } else {
        throw e;
      }
    }
  });

  it('should trigger a custom notification event', async function () {
    let opts = {
      title: 'Notification test',
      message: 'this is a custom notification',
      notification_identifier: 'test'
    };
    let res = await conf.whmcs.system.triggerNotificationEvent(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  it('should update admin notes', async function () {
    let opts = {
      notes: 'This is a note'
    };
    let res = await conf.whmcs.system.updateAdminNotes(opts);
    expect(res).to.have.a.property('result').to.equal('success');
  });

  describe('Announcements', function () {
    let demoAnnouncementId;

    before(async function () {
      let opts = {
        date: '1969-07-11',
        title: 'There\'s something wrong',
        announcement: 'Your circuit\'s dead'
      };

      let res = await conf.whmcs.support.addAnnouncement(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('announcementid').to.not.be.null;
      demoAnnouncementId = res.announcementid;
    });

    it('should update an announcement', async function () {
      let opts = {
        announcementid: demoAnnouncementId,
        title: 'Can you hear me Major Tom?'
      };
      let res = await conf.whmcs.system.updateAnnouncement(opts);
      expect(res).to.have.a.property('result').to.equal('success');
    });
  });

  it('should get whmcs details', async function () {
    let res = await conf.whmcs.system.whmcsDetails();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('whmcs').to.not.be.null;
  });
});