namespace "/api/v1" do
  # ValidateLogin
  #
  post "/login" do
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

  get "/logout" do
    session["access_token"] = nil
    session.clear

    redirect to("/")
  end
end
