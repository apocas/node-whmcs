namespace "/api/v1/servers" do
  # GetServers
  get "/" do
    response = Whmcs.call("GetServers", { :serviceId => "",
                                          :addonId => "",
                                          :fetchStatus => true })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # GetHealthStatus
  get "/health/status" do
    response = Whmcs.call("GetHealthStatus", { :fetchStatus => true })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
end
