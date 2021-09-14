namespace "/api/v1/orders" do
  # GetOrders
  get "/" do
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
  get "/status" do
    # set default parmas
    response = Whmcs.call("GetOrderStatuses")
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end

  # GetProducts
  get "/products" do
    # set default parmas
    response = Whmcs.call("GetProducts")
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end
end
