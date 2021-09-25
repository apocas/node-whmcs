namespace "/api/v1/module" do

  # GetModuleQueue
  get "/module/queue" do
    response = Whmcs.call("GetModuleQueue", { :relatedId => params[:relatedId].to_i,
                                              :serviceType => params[:serviceType].to_s,
                                              :moduleName => params[:moduleName].to_s,
                                              :moduleAction => params[:moduleAction].to_s,
                                              :since => params[:since].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # ActivateModule
  get "/module/activate" do
    response = Whmcs.call("ActivateModule", { :moduleType => params[:moduleType].to_s,
                                              :moduleName => params[:moduleName].to_s,
                                              :parameters => params[:parameters].to_a })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # DeactivateModule
  get "/module/deactivate" do
    response = Whmcs.call("ActivateModule", { :moduleType => params[:moduleType].to_s,
                                              :moduleName => params[:moduleName].to_s,
                                              :newGateway => params[:newGateway].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # GetModuleConfigurationParameters
  get "/module/configuration" do
    response = Whmcs.call("GetModuleConfigurationParameters", { :moduleType => params[:moduleType].to_s,
                                                                :moduleName => params[:moduleName].to_s })

    logger.info "[#{response[:result].upcase}] - #{response[:message]}."
    return json(response)
  end

  # UpdateModuleConfiguration
  post "/module/configuration/update" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateModuleConfiguration", { :moduleType => payload[:moduleType].to_s,
                                                         :moduleName => payload[:moduleName].to_s,
                                                         :parameters => payload[:parameters].to_a })

    logger.info "Module Configuration Updated:  #{response}"
    return json(response)
  end
end
