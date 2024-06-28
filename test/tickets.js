const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Tickets"', function () {

  it('should get support departments', async function () {
    const res = await conf.whmcs.tickets.getSupportDepartments();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('departments').to.be.an('object');
      expect(res.departments).to.have.a.property('department').to.be.an('array');
    }
  });

  it('should get support statuses', async function () {
    const res = await conf.whmcs.tickets.getSupportStatuses();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('statuses').to.be.an('object')
        .to.have.a.property('status').to.be.an('array');
    }
  });

  it('should get support statuses', async function () {
    const res = await conf.whmcs.tickets.getTicketCounts();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('allActive').to.not.be.null;
  });

  it('should get predefined cats', async function () {
    const res = await conf.whmcs.tickets.getTicketPredefinedCats();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('categories').to.be.an('object')
        .to.have.a.property('category').to.be.an('array');
    }
  });

  it('should get predefined replies', async function () {
    const res = await conf.whmcs.tickets.getTicketPredefinedReplies();
    expect(res).to.have.a.property('result').to.equal('success');
    expect(res).to.have.a.property('totalresults').to.not.be.null;
    if (parseInt(res.totalresults) > 0) {
      expect(res).to.have.a.property('predefinedreplies').to.be.an('object')
        .to.have.a.property('predefinedreply').to.be.an('array');
    }
  });

  describe('Ticket', function () {
    let demoTicketId;

    before(async function () {
      const opts = {
        deptid: conf.demoDeptId,
        clientid: conf.demoClientId,
        subject: 'this is a subject',
        message: 'this is a message'
      };

      const res = await conf.whmcs.support.openTicket(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('id').to.not.be.null;
      demoTicketId = res.id;
    });

    it('should get tickets', async function () {
      const opts = {
        clientid: conf.demoClientId,
        ignore_dept_assignments: true
      };

      const res = await conf.whmcs.tickets.getTickets(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('tickets').to.be.an('object')
        .to.have.a.property('ticket').to.be.an('array');
    });

    it('should get ticket notes', async function () {
      const opts = {
        ticketid: demoTicketId
      };

      const res = await conf.whmcs.tickets.getTicketNotes(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('notes').to.be.an('object');
      expect(res.notes).to.have.a.property('note').to.be.an('array');
    });

    it('should get ticket details by ticket id', async function () {
      const opts = {
        ticketid: demoTicketId
      };

      const res = await conf.whmcs.tickets.getTicket(opts);
      expect(res).to.have.a.property('result').to.equal('success');
      expect(res).to.have.a.property('id').to.equal(demoTicketId);
    });

    it('should get ticket attachment', async function () {
      const opts = {
        relatedid: demoTicketId,
        type: 'ticket',
        index: 0
      };

      try {
        const res = await conf.whmcs.tickets.getTicketAttachment(opts);
        expect(res).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          expect(e.message).to.have.string('No Attachments Found');
        } else {
          throw e;
        }
      }
    });

  });
});