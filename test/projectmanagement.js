var expect = require('chai').expect,
  conf = require('./conf');

describe('Module "Project Management"', function () {
  var demoProjectId, demoTaskId, demoTimerId;

  before(function (done) {
    var _this = this;
    var opts = {
      title: 'check if feature is enabled',
      adminid: 1
    };

    conf.whmcs.projectManagement.createProject(opts, function (err, details) {
      if (err && err.message && err.message.indexOf('Project Management is not active.') > -1) {
        console.log('Project Management is not active. Some tests will be skipped.');
        _this.skip();
      } else {
        done();
      }
    });
  });

  it('should create a project', function (done) {
    var opts = {
      title: 'untitled project',
      adminid: 1
    };

    conf.whmcs.projectManagement.createProject(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('projectid');
      demoProjectId = details.projectid;
      done();
    });
  });

  it('should get a project by id', function (done) {
    var opts = {
      projectid: demoProjectId
    };
    conf.whmcs.projectManagement.getProject(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('projectinfo').to.be.an.an('object');
      done();
    });
  });

  it('should get projects', function (done) {
    var opts = {
      limitstart: 0,
      limitnum: 1
    };
    conf.whmcs.projectManagement.getProjects(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('projects').to.be.an.an('array');
      done();
    });
  });

  it('should get projects by clientid', function (done) {
    var opts = {
      limitstart: 0,
      limitnum: 1,
      userid: conf.demoClientId
    };
    conf.whmcs.projectManagement.getProjects(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');
      expect(details).to.have.a.property('projects').to.be.an.an('array');
      done();
    });
  });

  it('should update a project', function (done) {
    var opts = {
      projectid: demoProjectId,
      title: 'space oddity'
    };
    conf.whmcs.projectManagement.updateProject(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('projectinfo').to.be.an.an('object');
        expect(details.projectinfo).to.have.a.property('title').to.equal('space oddity');
        done();
      });
    });
  });

  it('should add a message to a project', function (done) {
    var opts = {
      projectid: demoProjectId,
      message: 'can you hear me major tom?'
    };
    conf.whmcs.projectManagement.addProjectMessage(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('messages').to.be.an.an('object');
        expect(details.messages).to.have.a.property('message').to.be.an('array').to.have.lengthOf(1);
        expect(details.messages.message[0]).to.have.a.property('message').to.equal('can you hear me major tom?');
        done();
      });
    });
  });

  it('should add a task to a project', function (done) {
    var opts = {
      projectid: demoProjectId,
      duedate: '1969-07-11',
      task: 'leave the capsule'
    };
    conf.whmcs.projectManagement.addProjectTask(opts, function (err, details) {
      expect(err).to.be.null;
      expect(details).to.have.a.property('result').to.equal('success');

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('tasks').to.be.an.an('object');
        expect(details.tasks).to.have.a.property('task').to.be.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0]).to.have.a.property('task').to.equal('leave the capsule');
        demoTaskId = details.tasks.task[0].id;
        done();
      });
    });
  });

  it('should update a project task', function (done) {
    var opts = {
      taskid: demoTaskId,
      task: 'step through the door'
    };
    conf.whmcs.projectManagement.updateProjectTask(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('tasks').to.be.an.an('object');
        expect(details.tasks).to.have.a.property('task').to.be.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0]).to.have.a.property('task').to.equal('step through the door');
        done();
      });
    });
  });

  it('should start a project task timer', function (done) {
    var opts = {
      taskid: demoTaskId,
      projectid: demoProjectId
    };
    conf.whmcs.projectManagement.startTaskTimer(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('tasks').to.be.an.an('object');
        expect(details.tasks).to.have.a.property('task').to.be.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0]).to.have.a.property('timelogs').to.be.an.an('object');
        expect(details.tasks.task[0].timelogs).to.have.a.property('timelog').to.be.an.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0].timelogs.timelog[0]).to.have.a.property('starttime');
        expect(details.tasks.task[0].timelogs.timelog[0]).to.have.a.property('endtime');
        demoTimerId = details.tasks.task[0].timelogs.timelog[0].id;
        done();
      });
    });
  });

  it('should end a project task timer', function (done) {
    var opts = {
      timerid: demoTimerId,
      projectid: demoProjectId
    };
    conf.whmcs.projectManagement.endTaskTimer(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.have.a.property('tasks').to.be.an.an('object');
        expect(details.tasks).to.have.a.property('task').to.be.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0]).to.have.a.property('timelogs').to.be.an.an('object');
        expect(details.tasks.task[0].timelogs).to.have.a.property('timelog').to.be.an.an('array').to.have.lengthOf(1);
        expect(details.tasks.task[0].timelogs.timelog[0]).to.have.a.property('starttime');
        expect(details.tasks.task[0].timelogs.timelog[0]).to.have.a.property('endtime');
        done();
      });
    });
  });

  it('should delete a project task', function (done) {
    var opts = {
      projectid: demoProjectId,
      taskid: demoTaskId
    };
    conf.whmcs.projectManagement.deleteProjectTask(opts, function (err, details) {
      expect(err).to.be.null;

      var opts = {
        projectid: demoProjectId
      };
      conf.whmcs.projectManagement.getProject(opts, function (err, details) {
        expect(err).to.be.null;
        expect(details).to.not.have.a.property('tasks');
        done();
      });
    });
  });
});