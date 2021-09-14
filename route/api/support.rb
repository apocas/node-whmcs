namespace "/api/v1/support" do

  # GetAnnouncements
  get "/announcement" do
    logger.info "loading announcement data"

    response = Whmcs.call("GetAnnouncements", { :limitstart => params[:limitstart],
                                                :limitnum => params[:limitnum] })
    logger.info "[#{response[:result].upcase}] loading data"

    return json(response)
  end

  # AddAnnouncement
  post "/announcement/add" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Adding announcement #{payload}"
    response = Whmcs.call("AddAnnouncement", { :date => payload[:date],
                                               :title => payload[:title],
                                               :announcement => payload[:announcement],
                                               :published => payload[:published] })
    session[:announcement] = response[:announcement]
    logger.info "Announcement added: #{response}"
    return json(response)
  end

  # UpdateAnnouncement
  post "/announcement/update" do
    payload = JSON.parse(request.body.read.to_s)

    response = Whmcs.call("UpdateAnnouncement", { :announcementid => payload[:announcementid],
                                                 :date => payload[:date],
                                                 :title => payload[:title],
                                                 :announcement => payload[:announcement],
                                                 :published => payload[:published] # 1 || 0
 })
    session[:announcement] = response[:announcement]
    logger.info "Announcement updated: #{response}"
    return json(response)
  end

  # DeleteAnnouncement
  post "/announcement/delete" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Pending remove #{payload}"
    response = Whmcs.call("AddAnnouncement", { :announcementid => payload[:announcementid] })
    session[:announcement] = response[:announcement]
    logger.info "Accnouncement removed: #{response}"
    return json(response)
  end

  # OpenTicket
  post "/ticket/open" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Pending remove #{payload}"
    response = Whmcs.call("AddAnnouncement", { :announcementid => payload[:announcementid] })
    session[:announcement] = response[:announcement]
    logger.info "Accnouncement #{response} removed"
    return json(response)
  end
end
