namespace "/api/v1/products" do
  # GetProducts
  get "/" do
    response = Whmcs.call("GetTickets", { :pid => params[:pid].to_i, # Can be a list of ids comma separated
                                          :gid => params[:gid].to_i,
                                          :module => params[:module] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # AddProduct
  post "/add" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Add product: #{payload}"
    response = Whmcs.call("AddProduct", { :name => payload["name"],
                                          :gid => payload["gid"].to_i,
                                          :type => payload["type"],
                                          :stockcontrol => payload["stockcontrol"],
                                          :qty => payload["qty"],
                                          :paytype => payload["paytype"],
                                          :hidden => payload["hidden"],
                                          :showdomainoptions => payload["showdomainoptions"],
                                          :tax => payload["tax"],
                                          :isFeatured => payload["isFeatured"],
                                          :proratabilling => payload["proratabilling"],
                                          :description => payload["description"],
                                          :welcomeemail => payload["welcomeemail"],
                                          :proratadate => payload["proratadate"],
                                          :proratachargenextmonth => payload["proratachargenextmonth"],
                                          :subdomain => payload["subdomain"],
                                          :autosetup => payload["autosetup"],
                                          :module => payload["module"],
                                          :servergroupids => payload["servergroupids"],
                                          :configoption1 => payload["configoption1"],
                                          :configoption2 => payload["configoption2"],
                                          :configoption3 => payload["configoption3"],
                                          :configoption4 => payload["configoption4"],
                                          :configoption5 => payload["configoption5"],
                                          :configoption6 => payload["configoption6"],
                                          :order => payload["order"].to_i,
                                          :pricing => payload["pricing"].to_a })
    session[:userid] = response[:user_id]
    logger.info "User updated:  #{response}"
    return json(response)
  end
end
