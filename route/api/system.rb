namespace "/api/v1/system" do
  # GetAdminUsers
  #
  # NOT ALLOWED
  get "/getadminusers" do
    response = Whmcs.call("GetAdminUsers", { :roleid => params[:roleid].to_i,
                                             :email => params[:email].to_s,
                                             :include_disabled => params[:include_disabled] })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetAdminDetails
  get "/getadmindetails" do
    response = Whmcs.call("GetAdminDetails")

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end
  # GetStats
  get "/getstats" do
    response = Whmcs.call("GetStats", { :timeline_days => params[:timeline_days].to_i })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetStaffOnline
  #
  # Retrieve a list of currently logged in admin users.
  get "/getstaffonline" do
    response = Whmcs.call("GetStaffOnline")

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetPaymentMethods
  #
  # Retrieve Activated Payment Methods
  get "/getpaymentmethods" do
    response = Whmcs.call("GetPaymentMethods")

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetCurrencies
  get "/getcurrencies" do
    response = Whmcs.call("GetCurrencies")

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetEmailTemplates
  get "/getemailtemplates" do
    response = Whmcs.call("GetEmailTemplates", { :type => params[:type].to_s,
                                                 :language => params[:language].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetConfigurationValue
  get "/setting" do
    response = Whmcs.call("GetConfigurationValue", { :setting => params[:setting].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # SetConfigurationValue
  post "/setting/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("LogActivity", { :setting => payload[:setting].to_s,
                                           :value => payload[:value].to_s })

    logger.info "Setting added:  #{response}"
    return json(response)
  end

  # LogActivity
  post "/logs/add" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("LogActivity", { :clientid => payload[:clientid],
                                           :description => payload[:description].to_s })

    logger.info "log added:  #{response}"
    return json(response)
  end

  # GetAutomationLog
  get "/logs/automation" do
    response = Whmcs.call("GetAutomationLog", { :startdate => params[:startdate].to_s,
                                                :enddate => params[:enddate].to_s,
                                                :namespace => params[:namespace].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetActivityLog
  get "/logs/activity" do
    response = Whmcs.call("GetActivityLog", { :limitstart => params[:limitstart].to_i || 0,
                                              :limitnum => params[:limitnum].to_i || 25,
                                              :userid => params[:userid].to_i,
                                              :date => params[:date].to_s,
                                              :user => params[:user].to_s,
                                              :description => params[:description].to_s,
                                              :ipaddress => params[:ipaddress].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # EncryptPassword
  post "/password/encrypt" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("EncryptPassword", { :password2 => payload[:password].to_s })

    logger.info "Password Encrypted:  #{response}"
    return json(response)
  end

  # DecryptPassword
  post "/password/decrypt" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("DecryptPassword", { :password2 => payload[:password].to_s })

    logger.info "Password Decrypted:  #{response}"
    return json(response)
  end

  # AddBannedIp
  post "/blacklist" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("AddBannedIp", { :ip => payload[:ip].to_s,
                                          :reason => payload[:reason].to_s,
                                          :days => payload[:days].to_i,
                                          :expires => payload[:expires] #YYYY-MM-DD HH:MM:SS
 })

    logger.info "Added IP to Blacklist:  #{response}"
    return json(response)
  end
end
