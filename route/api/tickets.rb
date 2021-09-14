namespace "/api/v1" do

  # GetSupportDepartments
  get "/departments" do
    response = Whmcs.call("GetSupportDepartments", { :ignore_dept_assignments => params[:ignore_dept_assignments] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetSupportStatuses
  get "/status" do
    response = Whmcs.call("GetSupportStatuses", { :deptid => params[:deptid] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTicket
  get "/ticket" do
    response = Whmcs.call("GetTicket", { :ticketnum => params[:ticketnum],
                                         :ticketid => params[:ticketid],
                                         :repliessort => params[:repliessort] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTickets
  get "/tickets" do
    response = Whmcs.call("GetTickets", { :limitstart => params[:limitstart],
                                          :limitnum => params[:limitnum],
                                          :deptid => params[:deptid],
                                          :clientid => params[:clientid],
                                          :email => params[:email],
                                          :status => params[:status],
                                          :subject => params[:subject],
                                          :ignore_dept_assignments => params[:ignore_dept_assignments] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTicketAttachment
  get "/ticket/attachment" do
    response = Whmcs.call("GetTicketAttachment", { :relatedid => params[:relatedid],
                                                   :type => params[:type],
                                                   :index => params[:index] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTicketCounts
  get "/ticket/counts" do
    response = Whmcs.call("GetTicketCounts", { :ignoreDepartmentAssignments => params[:ignoreDepartmentAssignments],
                                               :includeCountsByStatus => params[:includeCountsByStatus] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTicketNotes
  get "/ticket/notes" do
    response = Whmcs.call("GetTicketNotes", { :ticketid => params[:ticketid] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # GetTicketPredefinedCats
  get "/ticket/predefined/cats" do
    response = Whmcs.call("GetTicketPredefinedCats")
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # GetTicketPredefinedReplies
  get "/ticket/predefined/replies" do
    response = Whmcs.call("GetTicketPredefinedReplies", { :catid => params[:catid] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
end
