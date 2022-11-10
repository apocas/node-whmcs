const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror'),
  WhmcsResponse = require('../lib/whmcsresponse');

describe('Module "Support"', function () {

  it('should add an announcement', async function () {
    const opts = {
      date: '1969-07-11',
      title: 'There\'s something wrong',
      announcement: 'Your circuit\'s dead'
    };

    const res = await conf.whmcs.support.addAnnouncement(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('announcementid').to.not.be.null;
  });

  it('should add a cancel request', async function () {
    const opts = {
      serviceid: conf.demoServiceId
    };
    const res = await conf.whmcs.support.addCancelRequest(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
  });

  it('should add a client note', async function () {
    const opts = {
      userid: conf.demoClientId,
      notes: 'Planet Earth is blue and there\'s nothing I can do'
    };

    const res = await conf.whmcs.support.addClientNote(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
  });

  it('should open a ticket', async function () {
    const opts = {
      deptid: conf.demoDeptId,
      clientid: conf.demoClientId,
      subject: 'this is a subject',
      message: 'this is a message'
    };

    const res = await conf.whmcs.support.openTicket(opts);
    expect(res).to.be.an.instanceOf(WhmcsResponse);
    expect(res.getBody()).to.have.a.property('result').to.equal('success');
    expect(res.getBody()).to.have.a.property('id').to.not.be.null;
    expect(res.getBody()).to.have.a.property('tid').to.not.be.null;
    expect(res.getBody()).to.have.a.property('c').to.not.be.null;
  });

  describe('Announcement', function () {
    let demoAnnouncementId;

    before(async function () {
      const opts = {
        date: '1969-07-11',
        title: 'There\'s something wrong',
        announcement: 'Your circuit\'s dead'
      };

      const res = await conf.whmcs.support.addAnnouncement(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('announcementid').to.not.be.null;
      demoAnnouncementId = res.get('announcementid');
    });

    it('should get announcements', async function () {
      const opts = {
        limitstart: 0,
        limitnum: 1
      };

      const res = await conf.whmcs.support.getAnnouncements(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('announcements').to.be.an.an('object');
      expect(res.get('announcements')).to.have.a.property('announcement').to.be.an('array').to.have.length.above(0);
    });

    it('should delete an announcement', async function () {
      const deleteOpts = {
        announcementid: demoAnnouncementId
      };
      const deleteRes = await conf.whmcs.support.deleteAnnouncement(deleteOpts);
      expect(deleteRes).to.be.an.instanceOf(WhmcsResponse);
      expect(deleteRes.getBody()).to.have.a.property('result').to.equal('success');
    });

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
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('id').to.not.be.null;
      expect(res.getBody()).to.have.a.property('tid').to.not.be.null;
      expect(res.getBody()).to.have.a.property('c').to.not.be.null;
      demoTicketId = res.get('id');
    });

    it('should add a note to the ticket', async function () {
      const addOpts = {
        message: 'this is a ticket note',
        ticketid: demoTicketId
      };

      const addRes = await conf.whmcs.support.addTicketNote(addOpts);
      expect(addRes).to.be.an.instanceOf(WhmcsResponse);
      expect(addRes.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should add a reply to the ticket', async function () {
      const opts = {
        ticketid: demoTicketId,
        clientid: conf.demoClientId,
        message: 'this is a new reply'
      };

      const res = await conf.whmcs.support.addTicketReply(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
    });

    it('should update a ticket', async function () {
      const opts = {
        ticketid: demoTicketId,
        subject: 'this is an updated ticket'
      };

      const res = await conf.whmcs.support.updateTicket(opts);
      expect(res).to.be.an.instanceOf(WhmcsResponse);
      expect(res.getBody()).to.have.a.property('result').to.equal('success');
      expect(res.getBody()).to.have.a.property('ticketid').to.equal(demoTicketId);
    });

    it('should create another ticket and merge it', async function () {
      const openOpts = {
        deptid: process.env.WHMCS_TEST_DEPTID || 1,
        clientid: conf.demoClientId,
        subject: 'this is another subject',
        message: 'this is another message'
      };

      const openRes = await conf.whmcs.support.openTicket(openOpts);
      expect(openRes).to.be.an.instanceOf(WhmcsResponse);
      expect(openRes.getBody()).to.have.a.property('result').to.equal('success');
      expect(openRes.getBody()).to.have.a.property('id').to.not.be.null;
      expect(openRes.getBody()).to.have.a.property('tid').to.not.be.null;
      expect(openRes.getBody()).to.have.a.property('c').to.not.be.null;

      const mergeOpts = {
        ticketid: demoTicketId,
        mergeticketids: openRes.get('id'),
        newsubject: 'this is a merged ticket'
      };

      const mergeRes = await conf.whmcs.support.mergeTicket(mergeOpts);
      expect(mergeRes).to.be.an.instanceOf(WhmcsResponse);
      expect(mergeRes.getBody()).to.have.a.property('result').to.equal('success');
      expect(mergeRes.getBody()).to.have.a.property('ticketid').to.equal(demoTicketId);
    });

    it('should block a ticket sender', async function () {
      const opts = {
        ticketid: demoTicketId
      };

      try {
        const res = await conf.whmcs.support.blockTicketSender(opts);
        expect(res).to.be.an.instanceOf(WhmcsResponse);
        expect(res.getBody()).to.have.a.property('result').to.equal('success');
      } catch (e) {
        if (e instanceof WhmcsError) {
          const possibleErr = ['A Client Cannot Be Blocked'];
          expect(possibleErr.some(err => {
            return e.message.indexOf(err) > -1;
          })).to.be.true;
        } else {
          throw e;
        }
      }
    });

    describe('Ticket reply', function () {
      let demoReplyId;

      before(async function () {
        const replyOpts = {
          ticketid: demoTicketId,
          clientid: conf.demoClientId,
          message: 'this is a new reply'
        };

        const replyRes = await conf.whmcs.support.addTicketReply(replyOpts);
        expect(replyRes).to.be.an.instanceOf(WhmcsResponse);
        expect(replyRes.getBody()).to.have.a.property('result').to.equal('success');

        const getOpts = {
          ticketid: demoTicketId
        };

        const getRes = await conf.whmcs.tickets.getTicket(getOpts);
        expect(getRes).to.be.an.instanceOf(WhmcsResponse);
        expect(getRes.getBody()).to.have.a.property('result').to.equal('success');
        expect(getRes.getBody()).to.have.a.property('replies').to.be.an('object').to.have.a.property('reply').to.be.an('array').to.have.length.greaterThan(1);
        const lastReply = getRes.get('replies').reply[getRes.get('replies').reply.length - 1];
        expect(lastReply).to.have.a.property('replyid').to.not.be.null;
        demoReplyId = getRes.get('replies').reply[1].replyid;
      });

      it('should update a ticket reply', async function () {
        const opts = {
          replyid: demoReplyId,
          message: 'this is an updated reply'
        };
        const res = await conf.whmcs.support.updateTicketReply(opts);
        expect(res).to.be.an.instanceOf(WhmcsResponse);
        expect(res.getBody()).to.have.a.property('result').to.equal('success');
      });

      it('should delete a ticket reply', async function () {
        const opts = {
          ticketid: demoTicketId,
          replyid: demoReplyId
        };
        const res = await conf.whmcs.support.deleteTicketReply(opts);
        expect(res).to.be.an.instanceOf(WhmcsResponse);
        expect(res.getBody()).to.have.a.property('result').to.equal('success');
      });
    });

    describe('Ticket Note', function () {
      let demoTicketNoteId;

      before(async function () {
        const addOpts = {
          message: 'this is a ticket note',
          ticketid: demoTicketId
        };

        const addRes = await conf.whmcs.support.addTicketNote(addOpts);
        expect(addRes).to.be.an.instanceOf(WhmcsResponse);
        expect(addRes.getBody()).to.have.a.property('result').to.equal('success');

        const ticketOpts = {
          ticketid: demoTicketId
        };

        const ticketRes = await conf.whmcs.tickets.getTicket(ticketOpts);
        expect(ticketRes).to.be.an.instanceOf(WhmcsResponse);
        expect(ticketRes.getBody()).to.have.a.property('result').to.equal('success');
        expect(ticketRes.getBody()).to.have.a.property('notes').to.be.an('object').to.have.a.property('note').to.be.an('array').to.have.length.greaterThan(0);
        expect(ticketRes.get('notes').note[0]).to.have.a.property('noteid');

        demoTicketNoteId = ticketRes.get('notes').note[0].noteid;
      });

      it('should delete a ticket note', async function () {
        const deleteOpts = {
          noteid: demoTicketNoteId
        };

        const deleteRes = await conf.whmcs.support.deleteTicketNote(deleteOpts);
        expect(deleteRes).to.be.an.instanceOf(WhmcsResponse);
        expect(deleteRes.getBody()).to.have.a.property('result').to.equal('success');
      });

    });

    describe('Ticket removal', function () {
      it('should delete a ticket', async function () {
        const opts = {
          ticketid: demoTicketId
        };
        const res = await conf.whmcs.support.deleteTicket(opts);
        expect(res).to.be.an.instanceOf(WhmcsResponse);
        expect(res.getBody()).to.have.a.property('result').to.equal('success');
      });
    });
  });

});