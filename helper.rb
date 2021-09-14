helpers do
  ## Jwt
  #
  # protected just does a redirect if we don't have a valid token
  #
  def protected!
    return if authorized?
    redirect to("/login")
  end

  # helper to extract the token from the session, header or request param
  # if we are building an api, we would obviously want to handle header or request param
  def extract_token
    # check for the access_token header
    token = request.env["access_token"]

    if token
      return token
    end

    # or the form parameter _access_token
    token = request["access_token"]

    if token
      return token
    end

    # or check the session for the access_token
    token = session["access_token"]

    if token
      return token
    end

    return nil
  end

  # check the token to make sure it is valid with our public key
  def authorized?
    @token = extract_token

    if @token.nil?
      session["message"] = "No JWT found in session.  Please log in."
      return false
    end

    begin
      @payload, @header = JWT.decode(@token, settings.verify_key, true, { algorithm: "HS256" })

      @exp = @header["exp"]

      # check to see if the exp is set (we don't accept forever tokens)
      if @exp.nil?
        session["message"] = "No exp set on JWT token."
        return false
      end

      @exp = Time.at(@exp.to_i)

      # make sure the token hasn't expired
      if Time.now > @exp
        session["message"] = "JWT token expired."
        return false
      end

      @user_id = @payload["user_id"]
    rescue JWT::DecodeError => e
      session["message"] = "JWT decode error: #{e.message}"
      return false
    end
  end
end