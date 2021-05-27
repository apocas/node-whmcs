const expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Support"', function () {
  describe('Announcement', function () {
    let demoAnnouncementId;

    it('should add an announcement', function (done) {
      let opts = {
        date: '1969-07-11',
        title: 'There\'s something wrong',
        announcement: 'Your circuit\'s dead'
      };

      conf.whmcs.support.addAnnouncement(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('announcementid');
        demoAnnouncementId = details.announcementid;
        done();
      });
    });

    it('should get announcements', function (done) {
      let opts = {
        limitstart: 0,
        limitnum: 1
      };

      conf.whmcs.support.getAnnouncements(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('announcements').to.be.an.an('object');
        expect(details.announcements).to.have.a.property('announcement').to.be.an('array').to.have.length.above(0);
        done();
      });
    });

    it('should delete an announcement', function (done) {
      if (demoAnnouncementId == undefined) {
        this.skip();
      } else {
        let opts = {
          announcementid: demoAnnouncementId
        };

        conf.whmcs.support.deleteAnnouncement(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

  });

  it('should add a cancel request', function (done) {
    let opts = {
      serviceid: 1
    };

    conf.whmcs.support.addCancelRequest(opts, function (err, details) {
      if (err && err.message.indexOf('Existing Cancellation Request Exists') > -1) {
        done();
      } else {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      }
    });
  });

  it('should add a client note', function (done) {
    let opts = {
      userid: conf.demoClientId,
      notes: 'Planet Earth is blue and there\'s nothing I can do'
    };

    conf.whmcs.support.addClientNote(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      done();
    });
  });

  describe('Ticket', function () {
    let demoTicketId;

    it('should open a ticket', function (done) {
      let opts = {
        deptid: 1,
        clientid: conf.demoClientId,
        subject: 'this is a subject',
        message: 'this is a message'
      };

      conf.whmcs.support.openTicket(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        expect(details).to.have.a.property('id');
        expect(details).to.have.a.property('tid');
        expect(details).to.have.a.property('c');
        demoTicketId = details.id;
        done();
      });
    });

    it('should add a note to the ticket', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          message: 'this is a ticket note',
          ticketid: demoTicketId
        };

        conf.whmcs.support.addTicketNote(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

    it('should add a reply to the ticket', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          ticketid: demoTicketId,
          clientid: conf.demoClientId,
          message: 'this is a new reply'
        };

        conf.whmcs.support.addTicketReply(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });

    it('should block a ticket sender', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          ticketid: demoTicketId
        };

        conf.whmcs.support.blockTicketSender(opts, function (err, details) {
          if (err && err.message.indexOf('A Client Cannot Be Blocked') > -1) {
            done();
          } else {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');
            done();
          }
        });
      }
    });

    it('should update a ticket', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          ticketid: demoTicketId,
          subject: 'this is an updated ticket'
        };

        conf.whmcs.support.updateTicket(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('ticketid').to.equal(demoTicketId);
          done();
        });
      }
    });

    it('should create another ticket and merge it', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          deptid: 1,
          clientid: conf.demoClientId,
          subject: 'this is another subject',
          message: 'this is another message'
        };

        conf.whmcs.support.openTicket(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          expect(details).to.have.a.property('id');
          expect(details).to.have.a.property('tid');
          expect(details).to.have.a.property('c');

          let opts = {
            ticketid: demoTicketId,
            mergeticketids: details.id,
            newsubject: 'this is a merged ticket'
          };

          conf.whmcs.support.mergeTicket(opts, function (err, details) {
            expect(err).to.be.null;
            expect(details).to.have.a.property('result').to.equal('success');
            expect(details).to.have.a.property('ticketid').to.equal(demoTicketId);
            done();
          });
        });
      }
    });

    it('should delete a ticket', function (done) {
      if (demoTicketId == undefined) {
        this.skip();
      } else {
        let opts = {
          ticketid: demoTicketId
        };

        conf.whmcs.support.deleteTicket(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      }
    });
  });

  describe('Ticket reply', function () {
    let demoTicketId, demoReplyId;

    before(function (done) {
      let opts = {
        deptid: 1,
        clientid: conf.demoClientId,
        subject: 'this is a subject',
        message: 'this is a message'
      };

      conf.whmcs.support.openTicket(opts, function (err, details) {
        if (err) {
          throw (err);
        } else {
          demoTicketId = details.id;

          let opts = {
            ticketid: demoTicketId,
            clientid: conf.demoClientId,
            message: 'this is a new reply'
          };

          conf.whmcs.support.addTicketReply(opts, function (err, details) {
            if (err) {
              throw err;
            } else {
              let opts = {
                ticketid: demoTicketId
              };

              conf.whmcs.tickets.getTicket(opts, function (err, details) {
                if (err) {
                  throw err;
                } else if (!details || !details.replies || !details.replies.reply || !details.replies.reply[0]) {
                  throw new Error('Ticket must have a reply. Cannot proceed.');
                } else {
                  demoReplyId = details.replies.reply[0].replyid;
                  done();
                }
              });
            }
          });
        }
      });

      it('should update a ticket reply', function (done) {
        let opts = {
          replyid: demoReplyId,
          //ticketid: demoTicketId,
          message: 'this is an updated reply'
        };

        conf.whmcs.support.updateTicketReply(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      });

      it('should delete a ticket reply', function (done) {
        let opts = {
          //ticketid: demoTicketId,
          replyid: demoReplyId
        };

        conf.whmcs.support.deleteTicketReply(opts, function (err, details) {
          expect(err).to.be.null;
          expect(details).to.have.a.property('result').to.equal('success');
          done();
        });
      });
    });
  });

  describe('Ticket note', function () {
    let demoTicketId, demoNoteId;

    before(function (done) {
      let opts = {
        deptid: 1,
        clientid: conf.demoClientId,
        subject: 'this is a subject',
        message: 'this is a message'
      };

      conf.whmcs.support.openTicket(opts, function (err, details) {
        if (err) {
          throw (err);
        } else {
          demoTicketId = details.id;

          let opts = {
            message: 'this is a ticket note',
            ticketid: demoTicketId
          };

          conf.whmcs.support.addTicketNote(opts, function (err, details) {
            if (err) {
              throw err;
            } else {
              let opts = {
                ticketid: demoTicketId
              };

              conf.whmcs.tickets.getTicket(opts, function (err, details) {
                if (err) {
                  throw err;
                } else if (!details || !details.notes || !details.notes.note || !details.notes.note[0]) {
                  throw new Error('Ticket must have a note. Cannot proceed.');
                } else {
                  demoNoteId = details.notes.note[0].noteid;
                  done();
                }
              });
            }
          });
        }
      });
    });

    it('should delete a ticket note', function (done) {
      let opts = {
        noteid: demoNoteId
      };

      conf.whmcs.support.deleteTicketNote(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('result').to.equal('success');
        done();
      });
    });
  });

});