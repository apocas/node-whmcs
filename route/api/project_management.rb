namespace "/api/v1" do
  # GetProject
  get "/project" do
    response = Whmcs.call("GetProject", { :projectid => params[:projectid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetProjects
  get "/projects" do
    response = Whmcs.call("GetProjects", { :limitstart => params[:limitstart].to_i || 0,
                                           :limitnum => params[:limitnum].to_i || 25,
                                           :userid => params[:userid].to_i,
                                           :title => params[:title].to_s,
                                           :ticketids => params[:ticketids].to_s,
                                           :invoiceids => params[:invoiceids].to_s,
                                           :notes => params[:notes].to_s,
                                           :adminid => params[:adminid].to_i,
                                           :status => params[:status].to_s,
                                           :createdfrom => params[:createdfrom].to_s,
                                           :duedate => params[:duedate].to_s,
                                           :completed => params[:completed],
                                           :lastmodified => params[:lastmodified].to_s })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # CreateProject
  post "/project/create" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Create Project: #{payload}"
    response = Whmcs.call("CreateProject", { :title => payload[:title],
                                             :adminid => payload[:adminid].to_i,
                                             :userid => payload[:userid].to_i,
                                             :status => payload[:status],
                                             # The date of the project in Y-m-d format.
                                             :created => payload[:created].to_s,
                                             :duedate => payload[:duedate].to_s,
                                             :completed => payload[:completed],
                                             :ticketids => payload[:ticketids].to_s,
                                             :invoiceids => payload[:invoiceids].to_s })

    logger.info "Project Created:  #{response}"
    return json(response)
  end

  # UpdateProject
  post "/project/update" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Update Project: #{payload}"
    response = Whmcs.call("UpdateProject", { :projectid => payload[:projectid].to_i,
                                             :adminid => payload[:adminid].to_i,
                                             :userid => payload[:userid].to_i,
                                             :status => payload[:status],
                                             # The date of the project in Y-m-d format.
                                             :created => payload[:created].to_s,
                                             :duedate => payload[:duedate].to_s,
                                             :completed => payload[:completed],
                                             :title => payload[:title],
                                             :ticketids => payload[:ticketids].to_s,
                                             :invoiceids => payload[:invoiceids].to_s,
                                             :notes => payload[:notes].to_s })

    logger.info "Project updated:  #{response}"
    return json(response)
  end

  # AddProjectMessage
  post "/project/message/add" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Add message to Project: #{payload}"
    response = Whmcs.call("AddProjectMessage", { :projectid => payload[:projectid].to_i,
                                                 :message => payload[:message].to_s,
                                                 :adminid => payload[:adminid].to_i })

    logger.info "Message added:  #{response}"
    return json(response)
  end

  # AddProjectTask
  post "/task/add" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Add Project Task: #{payload}"
    response = Whmcs.call("AddProjectTask", { :projectid => payload[:projectid].to_i,
                                              :duedate => payload[:duedate].to_s,
                                              :adminid => payload[:adminid].to_i,
                                              :task => payload[:task].to_s,
                                              :notes => payload[:notes].to_s,
                                              :completed => payload[:completed],
                                              :billed => payload[:billed] })

    logger.info "Task added:  #{response}"
    return json(response)
  end

  # UpdateProjectTask
  post "/task/update" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Update Project Task: #{payload}"
    response = Whmcs.call("UpdateProjectTask", { :taskid => payload[:taskid].to_i,
                                                 :projectid => payload[:projectid].to_i,
                                                 :duedate => payload[:duedate].to_s,
                                                 :adminid => payload[:adminid].to_i,
                                                 :task => payload[:task].to_s,
                                                 :notes => payload[:notes].to_s,
                                                 :completed => payload[:completed] })

    logger.info "Task updated:  #{response}"
    return json(response)
  end

  # DeleteProjectTask
  get "/task/delete" do
    response = Whmcs.call("DeleteProjectTask", { :projectid => params[:projectid].to_i,
                                                 :taskid => params[:taskid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # StartTaskTimer
  get "/timer/start" do
    response = Whmcs.call("StartTaskTimer", { :timerid => params[:timerid].to_i,
                                              :projectid => params[:projectid].to_i,
                                              :adminid => params[:adminid].to_i,
                                              #The start time as a unix time stamp.Defaults to time() if not provided
                                              :start_time => params[:start_time].to_i,
                                              :end_time => params[:end_time].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # EndTaskTimer
  get "/timer/end" do
    response = Whmcs.call("EndTaskTimer", { :timerid => params[:timerid].to_i,
                                            :projectid => params[:projectid].to_i,
                                            :adminid => params[:adminid].to_i,
                                            #The start time as a unix time stamp.Defaults to time() if not provided
                                            :end_time => params[:end_time].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
end
