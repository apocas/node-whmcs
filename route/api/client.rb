namespace "/api/v1" do
  get "/clients" do
    # set default parmas
    response = Whmcs.call("GetClients", { :limitstart => params[:limitstart] || 0,
                                         :limitnum => params[:limitnum] || 25,
                                         :sorting => params[:sorting] || "ASC", # ASC or DESC
                                         :status => params[:status] || "Active", # ‘Active’, ‘Inactive’, or ‘Closed’.
                                         :search => params[:search] || "",  # email, firstname, lastname, fullname or companyname
                                         :orderby => params[:orderby] || "id"  # id, firstname, lastname, companyname, email, groupid, datecreated, status
 })
    logger.info "[#{response[:result].upcase}] loading clients data"

    return json(response)
  end
end
