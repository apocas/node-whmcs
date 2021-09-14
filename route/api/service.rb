namespace "/api/v1/service" do
  # TODO
  get "/:id" do |id|
    res = Whmcs::Service.find(id)
    puts res
    return json(res)
  end
  # TODO
  delete "/:id" do |id|
    service.destroy if service
    status 204
  end

  # ModuleChangePackage
  get "/module/change/package" do
    response = Whmcs.call("ModuleChangePackage", { :serviceid => params[:serviceid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleChangePw
  get "/module/change/password" do
    response = Whmcs.call("ModuleChangePw", { :serviceid => params[:serviceid].to_i,
                                              :servicepassword => params[:servicepassword].to_s })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleCreate
  get "/module/create" do
    response = Whmcs.call("ModuleCreate", { :serviceid => params[:serviceid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleCustom
  get "/module/custom" do
    response = Whmcs.call("ModuleCustom", { :serviceid => params[:serviceid].to_i,
                                            :func_name => params[:func_name].to_s })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleSuspend
  get "/module/suspend" do
    response = Whmcs.call("ModuleSuspend", { :serviceid => params[:serviceid].to_i,
                                             :suspendreason => params[:suspendreason].to_s })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleUnsuspend
  get "/module/unsuspend" do
    response = Whmcs.call("ModuleUnsuspend", { :serviceid => params[:serviceid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # ModuleTerminate
  get "/module/terminate" do
    response = Whmcs.call("ModuleTerminate", { :serviceid => params[:serviceid].to_i })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # UpdateClientProduct
  post "/updateclientproduct" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpdateClientProduct", { :serviceid => payload[:serviceid].to_i,
                                                   :pid => payload[:pid].to_i,
                                                   :serverid => payload[:serverid],
                                                   :regdate => payload[:regdate],
                                                   :nextduedate => payload[:nextduedate],
                                                   :terminationdate => payload[:terminationdate],
                                                   :domain => payload[:domain],
                                                   :firstpaymentamount => payload[:firstpaymentamount],
                                                   :recurringamount => payload[:recurringamount],
                                                   :paymentmethod => payload[:paymentmethod],
                                                   :billingcycle => payload[:billingcycle],
                                                   :subscriptionid => payload[:subscriptionid],
                                                   :status => payload[:status],
                                                   :notes => payload[:notes],
                                                   :serviceusername => payload[:serviceusername],
                                                   :servicepassword => payload[:servicepassword], :overideautosuspend => payload[:overideautosuspend],
                                                   :overidesuspenduntil => payload[:overidesuspenduntil],
                                                   :ns1 => payload[:ns1],
                                                   :ns2 => payload[:ns2],
                                                   :dedicatedip => payload[:dedicatedip],
                                                   :assignedips => payload[:assignedips],
                                                   :diskusage => payload[:diskusage],
                                                   :disklimit => payload[:disklimit],
                                                   :bwusage => payload[:bwusage],
                                                   :bwlimit => payload[:bwlimit],
                                                   :suspendreason => payload[:suspendreason],
                                                   :promoid => payload[:promoid],
                                                   :unset => payload[:unset],
                                                   :autorecalc => payload[:autorecalc],
                                                   :customfields => payload[:customfields],
                                                   :configoptions => payload[:configoptions] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # UpgradeProduct
  post "/upgradeproduct" do
    payload = JSON.parse(request.body.read.to_s)
    response = Whmcs.call("UpgradeProduct", { :serviceid => payload[:serviceid].to_i,
                                              :calconly => payload[:calconly],
                                              :paymentmethod => payload[:paymentmethod],
                                              :type => payload[:type],
                                              :newproductid => payload[:newproductid].to_i,
                                              :newproductbillingcycle => payload[:newproductbillingcycle],
                                              :promocode => payload[:promocode],
                                              :configoptions => payload[:configoptions] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
end
