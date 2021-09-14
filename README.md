<!-- require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'openssl'
require 'jwt'


######
# first we load up the private and public keys that we will use to sign and verify our JWT token
# using RS256 algo
######

signing_key_path = File.expand_path("../app.rsa", __FILE__)
verify_key_path = File.expand_path("../app.rsa.pub", __FILE__)

signing_key = ""
verify_key = ""

File.open(signing_key_path) do |file|
  signing_key = OpenSSL::PKey.read(file)
end

File.open(verify_key_path) do |file|
  verify_key = OpenSSL::PKey.read(file)
end

set :signing_key, signing_key
set :verify_key, verify_key

# enable sessions which will be our default for storing the token
enable :sessions

#this is to encrypt the session, but not really necessary just for token because we aren't putting any sensitive info in there
set :session_secret, 'super secret 2'

helpers do

  # protected just does a redirect if we don't have a valid token
  def protected!
    return if authorized?
    redirect to('/login')
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
      @payload, @header = JWT.decode(@token, settings.verify_key, true, { algorithm: 'RS256'} )

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

get '/' do
  protected!
  erb :index
end

get '/login' do

  @message = session["message"]
  session.delete("message")
  erb :login
end

get '/logout' do
  session["access_token"] = nil
  redirect to("/")
end

post '/login' do
  # check the username and password
  # you would use some sort of User record here to verify the credentials
  if params[:username] == "username" && params[:password] == "password"
    # if the user/pass credentials are valid, lets issue a JSON Web Token:
    # normally you might put the user_id in payload, or some other identifying
    # attributes that we can use to get the current authenticated user's identity
    # on future visists to the site

    headers = {
      exp: Time.now.to_i + 20 #expire in 20 seconds
    }

    @token = JWT.encode({user_id: 123456}, settings.signing_key, "RS256", headers)

    session["access_token"] = @token

    redirect to("/")
  else
    @message = "Username/Password failed."
    erb :login
  end
end -->
