class ProjectManagement {
  /**
   * Creates a new ProjectManagement object
   * @param {WhmcsHttpClient} whmcsHttpClient 
   */
  constructor(whmcsHttpClient) {
    this.whmcsHttpClient = whmcsHttpClient;
  }

  /**
   * Adds a Message to a project.
   * https://developers.whmcs.com/api-reference/addprojectmessage/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addProjectMessage(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddProjectMessage', parameters, callback);
  };

  /**
   * Adds a Task to a project.
   * https://developers.whmcs.com/api-reference/addprojecttask/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  addProjectTask(parameters, callback) {
    return this.whmcsHttpClient.callApi('AddProjectTask', parameters, callback);
  };

  /**
   * Creates a new project.
   * https://developers.whmcs.com/api-reference/createproject/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  createProject(parameters, callback) {
    return this.whmcsHttpClient.callApi('CreateProject', parameters, callback);
  };

  /**
   * Deletes a task associated with a project.
   * https://developers.whmcs.com/api-reference/deleteprojecttask/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  deleteProjectTask(parameters, callback) {
    return this.whmcsHttpClient.callApi('DeleteProjectTask', parameters, callback);
  };

  /**
   * Ends a started timer for a project.
   * https://developers.whmcs.com/api-reference/endtasktimer/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  endTaskTimer(parameters, callback) {
    return this.whmcsHttpClient.callApi('EndTaskTimer', parameters, callback);
  };

  /**
   * Retrieve a specific Project.
   * https://developers.whmcs.com/api-reference/getproject/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getProject(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetProject', parameters, callback);
  };

  /**
   * Obtain orders matching the passed criteria.
   * https://developers.whmcs.com/api-reference/getprojects/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  getProjects(parameters, callback) {
    return this.whmcsHttpClient.callApi('GetProjects', parameters, callback);
  };

  /**
   * Starts a timer for a project.
   * https://developers.whmcs.com/api-reference/starttasktimer/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  startTaskTimer(parameters, callback) {
    return this.whmcsHttpClient.callApi('StartTaskTimer', parameters, callback);
  };

  /**
   * Updates a project.
   * https://developers.whmcs.com/api-reference/updateproject/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateProject(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateProject', parameters, callback);
  };

  /**
   * Adds a Task to a project.
   * https://developers.whmcs.com/api-reference/updateprojecttask/
   * @param {Object} parameters Request parameters
   * @param {Function} callback Optional callback. If not set the method returns a Promise
   */
  updateProjectTask(parameters, callback) {
    return this.whmcsHttpClient.callApi('UpdateProjectTask', parameters, callback);
  };
}

module.exports = ProjectManagement;
