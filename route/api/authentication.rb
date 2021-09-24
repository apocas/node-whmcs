namespace "/api/v1" do
  # ListOAuthCredentials
  get "/oauth" do
    # set default parmas
    response = Whmcs.call("ListOAuthCredentials", { :grantType => params[:grantType].to_s,
                                                    :sortField => params[:sortField].to_s,
                                                    :sortOrder => params[:sortOrder] || "DESC", # ASC or DESC
                                                    :limit => params[:limit].to_i })
    logger.info "[#{response[:result].upcase}]"

    return json(response)
  end

  # CreateOAuthCredential
  post "/oauth/create" do
    payload = JSON.parse(request.body.read.to_s)

    response = Whmcs.call("CreateOAuthCredential", { :grantType => payload[:grantType].to_s,
                                                     :scope => payload[:scope].to_s,
                                                     :name => payload[:name].to_s,
                                                     :serviceId => payload[:serviceId].to_i,
                                                     :description => payload[:description].to_s,
                                                     :logoUri => payload[:logoUri].to_s,
                                                     :redirectUri => payload[:redirectUri].to_s })

    return json(response)
  end

  # UpdateOAuthCredential
  post "/oauth/update" do
    payload = JSON.parse(request.body.read.to_s)

    response = Whmcs.call("UpdateOAuthCredential", { :credentialId => payload[:credentialId].to_i,
                                                     :clientApiIdentifier => payload[:clientApiIdentifier].to_s,
                                                     :name => payload[:name].to_s,
                                                     :description => payload[:description].to_s,
                                                     :grantType => payload[:grantType].to_s,
                                                     :scope => payload[:scope].to_s,
                                                     :serviceId => payload[:serviceId].to_i,
                                                     :logoUri => payload[:logoUri],
                                                     :redirectUri => payload[:redirectUri].to_s,
                                                     :resetSecret => payload[:resetSecret] })

    return json(response)
  end
  # DeleteOAuthCredential
  post "/oauth/delete" do
    payload = JSON.parse(request.body.read.to_s)

    response = Whmcs.call("DeleteOAuthCredential", { :credentialId => payload[:credentialId].to_i })

    return json(response)
  end

  # CreateSsoToken
  post "/sso/create" do
    payload = JSON.parse(request.body.read.to_s)

    response = Whmcs.call("CreateSsoToken", { :client_id => payload[:client_id].to_i,
                                              :user_id => payload[:user_id].to_i,
                                              :destination => payload[:destination].to_s,
                                              :service_id => payload[:service_id].to_i,
                                              :domain_id => payload[:domain_id].to_i,
                                              :sso_redirect_path => payload[:sso_redirect_path].to_s })

    return json(response)
  end
  # ValidateLogin
  #
  post "/validatelogin" do
    # read request body
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Login #{payload}"
    response = Whmcs.login(payload["email"], payload["password"])
    session[:userid] = response[:userid]
    session[:passwordhash] = response[:passwordhash]

    if response[:result] == "success" && response[:passwordhash].present?
      # jwt authentication
      # headers = {
      #   exp: Time.now.to_i + 60, #expire in 60 seconds
      # }
      # @token = JWT.encode({ user_id: response[:userid] }, settings.signing_key, "RS256", headers)
      # @token = JWT.encode({ :user_id => response[:userid], :passwordhash => response[:passwordhash] }, settings.signing_key, "HS256", headers)
      response[:access_token] = @token
      logger.info "Login #{response} "

      return json(response)
    else
      return { "error": "failed to login" }
    end

    # def token(user)
    #   JWT.encode payload(user), ENV["JWT_SECRET"], "HS256"
    # end

    # def payload(user)
    #   {
    #     exp: Time.now.to_i + 60 * 60,
    #     iat: Time.now.to_i,
    #     iss: ENV["JWT_ISSUER"],
    #     user: {
    #       userid: userid,
    #       passwordhash: passwordhash,
    #     },
    #   }
    # end
  end
end
