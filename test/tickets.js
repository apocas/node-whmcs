const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Tickets"', function () {

  it('should get support departments', function (done) {
    conf.whmcs.tickets.getSupportDepartments(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('departments').to.be.an('object');
      expect(details.departments).to.have.a.property('department').to.be.an('array');
      done();
    });
  });

  it('should get support statuses', function (done) {
    conf.whmcs.tickets.getSupportStatuses(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('statuses').to.be.an('object');
      expect(details.statuses).to.have.a.property('status').to.be.an('array');
      done();
    });
  });

  it('should get support statuses', function (done) {
    conf.whmcs.tickets.getTicketCounts(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('allActive');
      done();
    });
  });

  it('should get predefined cats', function (done) {
    conf.whmcs.tickets.getTicketPredefinedCats(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('totalresults');
      done();
    });
  });

  it('should get predefined replies', function (done) {
    conf.whmcs.tickets.getTicketPredefinedCats(function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('totalresults');
      done();
    });
  });

  describe('Ticket', function () {
    let demoTicketId;

    before(function (done) {
      let opts = {
        deptid: 1,
        clientid: conf.demoClientId,
        subject: 'this is a subject',
        message: 'this is a message'
      };

      conf.whmcs.support.openTicket(opts, function (err, details) {
        if (err) {
          throw err;
        } else {
          demoTicketId = details.id;
          done();
        }
      });
    });

    it('should get tickets', function (done) {
      let opts = {
        limitstart: 0,
        limitnum: 1
      };

      conf.whmcs.tickets.getTickets(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });

    it('should get ticket notes', function (done) {
      let opts = {
        ticketid: demoTicketId
      };

      conf.whmcs.tickets.getTicketNotes(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('notes').to.be.an('object');
        expect(details.notes).to.have.a.property('note').to.be.an('array');
        done();
      });
    });

    it('should get a ticket by id', function (done) {
      let opts = {
        ticketid: demoTicketId
      };

      conf.whmcs.tickets.getTicket(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('id').to.equal(demoTicketId);
        done();
      });
    });

    it('should get ticket attachment', function (done) {
      let opts = {
        relatedid: demoTicketId,
        type: 'ticket',
        index: 0
      };

      conf.whmcs.tickets.getTicketAttachment(opts, function (err, details) {
        if (err && err.message.indexOf('No Attachments Found') > -1) {
          done();
        } else {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        }
      });
    });

  });
});