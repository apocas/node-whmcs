namespace "/api/v1" do
  # GetOrders
  get "/orders" do
    # set default parmas
    response = Whmcs.call("GetOrders", { :limitstart => params[:limitstart] || 0,
                                        :limitnum => params[:limitnum] || 25,
                                        :id => params[:id] || "",
                                        :userid => params[:userid] || "",
                                        :requestor_id => params[:requestor_id] || "",
                                        :status => params[:status] || "Active" # ‘Active’, ‘Inactive’, or ‘Closed’.
 })
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end

  # GetOrderStatuses
  get "/orders/status" do
    # set default parmas
    response = Whmcs.call("GetOrderStatuses")
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end

  # GetProducts
  #
  # Retrieve configured products matching provided criteria
  get "/products" do
    # set default parmas
    response = Whmcs.call("GetProducts", { :pid => params[:pid].to_i,
                                           :gid => params[:gid].to_i,
                                           :module => params[:module] })
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end

  # AcceptOrder
  get "/orders/accept" do
    # set default parmas
    response = Whmcs.call("AcceptOrder", { :orderid => params[:orderid],
                                           :serverid => params[:serverid].to_i,
                                           :serviceusername => params[:serviceusername] || "",
                                           :servicepassword => params[:servicepassword] || "",
                                           :registrar => params[:registrar] || "",
                                           :sendregistrar => params[:sendregistrar],
                                           :autosetup => params[:autosetup],
                                           :sendemail => params[:sendemail] })
    logger.info "[#{response[:result].upcase}] Order accepted"

    return json(response)
  end

  # AddOrder
  post "/order/add" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Add order: #{payload}"
    response = Whmcs.call("AddOrder", { :clientid => payload["clientid"].to_i,
                                        :paymentmethod => payload["paymentmethod"] || "paypal",
                                        :pid => payload["pid"] || [],
                                        :domain => payload["domain"] || [],
                                        :billingcycle => payload["billingcycle"] || [],
                                        :domaintype => payload["domaintype"] || [],
                                        :hidden => payload["hidden"],
                                        :regperiod => payload["regperiod"] || [],
                                        :idnlanguage => payload["idnlanguage"] || [],
                                        :eppcode => payload["eppcode"],
                                        :nameserver1 => payload["nameserver1"],
                                        :nameserver2 => payload["nameserver2"],
                                        :nameserver3 => payload["nameserver3"],
                                        :nameserver4 => payload["nameserver4"],
                                        :nameserver5 => payload["nameserver5"],
                                        :customfields => payload["customfields"],
                                        :configoptions => payload["configoptions"],
                                        :priceoverride => payload["priceoverride"],
                                        :promocode => payload["promocode"],
                                        :promooverride => payload["promooverride"],
                                        :affid => payload["affid"],
                                        :noinvoice => payload["noinvoice"],
                                        :noinvoiceemail => payload["noinvoiceemail"],
                                        :noemail => payload["noemail"],
                                        :addons => payload["addons"] || [],
                                        :hostname => payload["hostname"],
                                        :ns1prefix => payload["ns1prefix"],
                                        :ns2prefix => payload["ns2prefix"],
                                        :rootpw => payload["rootpw"],
                                        :contactid => payload["contactid"],
                                        :dnsmanagement => payload["dnsmanagement"],
                                        :domainfields => payload["domainfields"],
                                        :emailforwarding => payload["emailforwarding"],
                                        :idprotection => payload["idprotection"],
                                        :domainpriceoverride => payload["domainpriceoverride"],
                                        :domainrenewoverride => payload["domainrenewoverride"],
                                        :domainrenewals => payload["domainrenewals"],
                                        :clientip => payload["clientip"].to_s,
                                        :addonid => payload["addonid"].to_i,
                                        :serviceid => payload["serviceid"].to_i,
                                        :addonids => payload["addonids"] || [],
                                        :serviceids => payload["serviceids"] || [] })
    session[:userid] = response[:user_id]
    logger.info "User updated:  #{response}"
    return json(response)
  end

  # CancelOrder
  get "/orders/cancel" do
    # set default parmas
    response = Whmcs.call("CancelOrder", { :orderid => params[:orderid],
                                           :cancelsub => params[:cancelsub],
                                           :noemail => params[:noemail] })
    logger.info "[#{response[:result].upcase}] Order accepted"

    return json(response)
  end

  # DeleteOrder
  get "/orders/delete" do
    response = Whmcs.call("DeleteOrder", { :orderid => params[:orderid] })
    logger.info "[#{response[:result].upcase}] Order accepted"

    return json(response)
  end

  # FraudOrder
  get "/orders/fraud" do
    response = Whmcs.call("FraudOrder", { :orderid => params[:orderid],
                                          :cancelsub => params[:cancelsub] })
    logger.info "[#{response[:result].upcase}] Order accepted"

    return json(response)
  end

  # OrderFraudCheck
  get "/orders/fraud/check" do
    response = Whmcs.call("OrderFraudCheck", { :orderid => params[:orderid],
                                               :ipaddress => params[:ipaddress].to_s })
    logger.info "[#{response[:result].upcase}] Fraud check - IP: #{response[:ipaddress]}"

    return json(response)
  end

  # PendingOrder
  get "/orders/pending" do
    response = Whmcs.call("PendingOrder", { :orderid => params[:orderid] })
    logger.info "[#{response[:result].upcase}] Fraud check - IP: #{response[:ipaddress]}"

    return json(response)
  end

  # GetPromotions
  get "/promotions" do
    response = Whmcs.call("GetPromotions", { :code => params[:code] })
    logger.info "[#{response[:result].upcase}] Coupon code applied"

    return json(response)
  end
end
