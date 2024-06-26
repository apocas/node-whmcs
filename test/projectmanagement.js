const expect = require('chai').expect,
  conf = require('./conf'),
  WhmcsError = require('../lib/whmcserror');

describe('Module "Project Management"', function () {
  let demoProjectId;

  before(async function () {
    const opts = {
      title: 'demo project',
      adminid: 1
    };

    const res = await conf.whmcs.projectManagement.createProject(opts);
    demoProjectId = res.projectid;
  });

  it('should create a project', async function () {
    const opts = {
      title: 'untitled project',
      adminid: 1
    };
    const res = await conf.whmcs.projectManagement.createProject(opts);
    expect(res).to.have.a.property('projectid').to.not.be.null;
  });

  it('should get projects', async function () {
    const opts = {
      limitstart: 0,
      limitnum: 1
    };
    const res = await conf.whmcs.projectManagement.getProjects(opts);
    expect(res).to.have.a.property('numreturned').to.not.be.null;
    expect(res).to.have.a.property('projects').to.be.an.an('array').to.have.length.greaterThan(0);
  });

  it('should get project details by project id', async function () {
    const opts = {
      projectid: demoProjectId
    };
    const res = await conf.whmcs.projectManagement.getProject(opts);
    expect(res).to.have.a.property('projectinfo').to.be.an.an('object');
  });

  it('should update a project', async function () {
    const updateOpts = {
      projectid: demoProjectId,
      title: 'space oddity'
    };
    const updateRes = await conf.whmcs.projectManagement.updateProject(updateOpts);
    expect(updateRes).to.have.a.property('message').to.equal('Project Has Been Updated');

    const getOpts = {
      projectid: demoProjectId
    };
    const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
    expect(getRes).to.have.a.property('projectinfo').to.be.an.an('object');
    expect(getRes.projectinfo).to.have.a.property('title').to.equal('space oddity');
  });

  it('should add a message to a project', async function () {
    const addOpts = {
      projectid: demoProjectId,
      message: 'can you hear me major tom?'
    };

    const addRes = await conf.whmcs.projectManagement.addProjectMessage(addOpts);
    expect(addRes).to.have.a.property('message').to.equal('Message has been added');

    const getOpts = {
      projectid: demoProjectId
    };
    const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
    expect(getRes).to.have.a.property('messages').to.be.an.an('object');
    expect(getRes.messages).to.have.a.property('message').to.be.an('array').to.have.lengthOf(1);
    expect(getRes.messages.message[0]).to.have.a.property('message').to.equal('can you hear me major tom?');
  });

  it('should add a task to a project', async function () {
    const addOpts = {
      projectid: demoProjectId,
      duedate: '1969-07-11',
      task: 'leave the capsule'
    };

    const addRes = await conf.whmcs.projectManagement.addProjectTask(addOpts);
    expect(addRes).to.have.a.property('message').to.equal('Task has been added');


    const getOpts = {
      projectid: demoProjectId
    };
    const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
    expect(getRes).to.have.a.property('tasks').to.be.an.an('object');
    expect(getRes.tasks).to.have.a.property('task').to.be.an('array').to.have.lengthOf(1);
    expect(getRes.tasks.task[0]).to.have.a.property('task').to.equal('leave the capsule');
    demoTaskId = getRes.tasks.task[0].id;
  });

  describe('Project task', function () {
    let demoTaskId;

    before(async function () {
      const addOpts = {
        projectid: demoProjectId,
        duedate: '1969-07-11',
        task: 'leave the capsule'
      };

      const addRes = await conf.whmcs.projectManagement.addProjectTask(addOpts);
      expect(addRes).to.have.a.property('message').to.equal('Task has been added');

      const getOpts = {
        projectid: demoProjectId
      };
      const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
      expect(getRes).to.have.a.property('tasks').to.be.an.an('object');
      expect(getRes.tasks).to.have.a.property('task').to.be.an('array').to.have.length.greaterThan(0);
      expect(getRes.tasks.task[0]).to.have.a.property('task').to.equal('leave the capsule');
      demoTaskId = getRes.tasks.task[0].id;
    });

    it('should update a project task', async function () {
      const updateOpts = {
        taskid: demoTaskId,
        task: 'step through the door'
      };
      const updateRes = await conf.whmcs.projectManagement.updateProjectTask(updateOpts);
      expect(updateRes).to.have.a.property('message').to.equal('Task has been updated');

      const getOpts = {
        projectid: demoProjectId
      };
      const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
      expect(getRes).to.have.a.property('tasks').to.be.an.an('object');
      expect(getRes.tasks).to.have.a.property('task').to.be.an('array').to.have.length.greaterThan(0);
      expect(getRes.tasks.task[0]).to.have.a.property('task').to.equal('step through the door');
    });

    it('should start and then end a project task timer', async function () {
      const timerOpts = {
        taskid: demoTaskId,
        projectid: demoProjectId
      };
      const timerRes = await conf.whmcs.projectManagement.startTaskTimer(timerOpts);
      expect(timerRes).to.have.a.property('message').to.equal('Start Timer Has Been Set');

      const getOpts = {
        projectid: demoProjectId
      };
      const getRes = await conf.whmcs.projectManagement.getProject(getOpts);
      expect(getRes).to.have.a.property('tasks').to.be.an.an('object');
      expect(getRes.tasks).to.have.a.property('task').to.be.an('array').to.have.length.greaterThan(0);
      expect(getRes.tasks.task[0]).to.have.a.property('timelogs').to.be.an.an('object');
      expect(getRes.tasks.task[0].timelogs).to.have.a.property('timelog').to.be.an.an('array').to.have.length.greaterThan(0);
      expect(getRes.tasks.task[0].timelogs.timelog[0]).to.have.a.property('id').to.not.be.null;
      demoTimerId = getRes.tasks.task[0].timelogs.timelog[0].id;

      const endOpts = {
        timerid: demoTimerId,
        projectid: demoProjectId
      };
      const endRes = await conf.whmcs.projectManagement.endTaskTimer(endOpts);
      expect(endRes).to.have.a.property('message').to.equal('Timer Has Ended');
    });

    it('should delete a project task', async function () {
      const deleteOpts = {
        projectid: demoProjectId,
        taskid: demoTaskId
      };
      const deleteRes = await conf.whmcs.projectManagement.deleteProjectTask(deleteOpts);
      expect(deleteRes).to.have.a.property('message').to.equal('Task has been deleted');
    });
  });
});