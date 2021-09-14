namespace "/api/v1/users" do
  # GetUsers
  get "/" do
    logger.info "loading users data"

    response = Whmcs.call("GetUsers", { :limitstart => params[:limitstart],
                                        :limitnum => params[:limitnum],
                                        :sorting => params[:sorting],
                                        :search => params[:search] })
    logger.info "[#{response[:result].upcase}] loading data"

    return json(response)
  end

  # CreateClientInvite
  get "/invite" do
    logger.info "loading users data"

    response = Whmcs.call("CreateClientInvite", { :limitstart => params[:limitstart],
                                                  :limitnum => params[:limitnum],
                                                  :sorting => params[:sorting],
                                                  :search => params[:search] })
    logger.info "[#{response[:result].upcase}] loading data"

    return json(response)
  end

  # AddUser
  post "/add" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "AddUser: #{payload}"
    response = Whmcs.call("AddUser", { :firstname => payload["firstname"],
                                       :lastname => payload["lastname"],
                                       :email => payload["email"],
                                       :password2 => payload["password2"],
                                       :language => payload["language"] })
    session[:userid] = response[:user_id]
    logger.info "User Added:  #{response}"
    return json(response)
  end

  # DeleteUserClient
  # Delete relationship between user and client.
  post "/delete" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Delete User Client relationship: #{payload}"
    response = Whmcs.call("DeleteUserClient", { :user_id => payload["user_id"],
                                                :client_id => payload["client_id"] })
    session[:userid] = response[:user_id]
    logger.info "relationship deleted:  #{response}"
    return json(response)
  end

  # GetPermissionsList
  get "/permissionlist" do
    response = Whmcs.call("GetPermissionsList")
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # GetUserPermissions
  get "/permissions" do
    response = Whmcs.call("GetUserPermissions", { :userid => params[:userid],
                                                  :client_id => params[:client_id] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # ResetPassword
  post "/resetpassword" do
    payload = JSON.parse(request.body.read.to_s)
    logger.info "Password Reset: #{payload}"
    response = Whmcs.call("ResetPassword", { :id => payload[:id],
                                             :email => payload[:email] })
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end

  # UpdateUser
  post "/update" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Update User: #{payload}"
    response = Whmcs.call("UpdateUser", { :user_id => payload["user_id"],
                                          :firstname => payload["firstname"],
                                          :lastname => payload["lastname"],
                                          :email => payload["email"],
                                          :language => payload["language"] })
    session[:userid] = response[:user_id]
    logger.info '[#{response[:result].upcase}] - #{response[:message]}.'
    return json(response)
  end
  # UpdateUserPermissions
  #
  # Update the permissions of a user for a client.
  post "/updatepermission" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Update User permission: #{payload}"
    response = Whmcs.call("UpdateUserPermissions", { :user_id => payload["user_id"],
                                                     :client_id => payload["client_id"],
                                                     :permissions => payload["permissions"] })
    session[:userid] = response[:user_id]
    logger.info "User updated:  #{response}"
    return json(response)
  end
end
