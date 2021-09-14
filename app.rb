require "sinatra"
# require 'sinatra/contrib/all'
require "sinatra/reloader" if development?
require "dotenv/load"
require "sinatra/json"
require "sinatra/namespace"

# require "openssl"
require "jwt"

# require 'mongoid'
# DB Setup
# Mongoid.load! 'mongoid.config'
configure :production, :development do
  enable :logging
  enable :reloader

  set :server, :puma
  set :show_exceptions, false
  # set :json_content_type, :json
  set :default_content_type, "application/json"

  # Session Middleware
  # set :sessions, :expire_after => 60 * 60 * 1 # 1 hour in seconds
  # set :session_store, Rack::Session::Pool, :key => "session_id",
  #                                          :expire_after => 60 * 60 * 1, # 1 hour in seconds
  #                                          :cookie_only => false,
  #                                          :defer => true
  # set :session_secret, ENV["SESSION_SECRET"]
  #
  # use Rack::Session::Cookie middleware instead of defualt 'enable :sessions' if you need to set additional parameters [pool] => save to memory, lost data after restart [cookie] => With Cookie instead you will have restart-persistent sessions at the price of marshaling.
  #
  # use Rack::Session::Pool, :expire_after => 60 * 60 * 1 # 1 hour in seconds
  use Rack::Session::Cookie, :path => "/",
                             :httponly => true,
                             :expire_after => 60 * 60 * 24 * 5, # 5 days in seconds
                             :secret => ENV["SESSION_SECRET"]

  # eable protection
  use Rack::Protection, :except => :path_traversal
end

before do
  # Switch to parameter based session management if the client is an ios device
  if env["HTTP_USER_AGENT"] =~ /iOS/
    session.options[:cookie_only] = false
    session.options[:defer] = true
  end
end

# Load All Files
# path_to_requies = [
#   "route", "lib",
# ]
# path_to_requies.each { |path| Dir[File.join(File.dirname(__FILE__), path, "*.rb")].each { |file| require file } }

# Load all lib file
Dir[File.join(File.dirname(__FILE__), "lib", "*.rb")].each { |file| require file }
# Load all routes
Dir[File.join(File.dirname(__FILE__), "route", "*.rb")].each { |file| require file }
# Load Helpers
# require "./helper"

# require "./jwt"
# JWT settings
#
# REMOVE rsa encryption
# signing_key_path = File.expand_path("../app.rsa", __FILE__)
# verify_key_path = File.expand_path("../app.rsa.pub", __FILE__)

# signing_key = ""
# verify_key = ""

# File.open(signing_key_path) do |file|
#   signing_key = OpenSSL::PKey.read(file)
# end

# File.open(verify_key_path) do |file|
#   verify_key = OpenSSL::PKey.read(file)
# end

# set :signing_key, ENV["JWT_KEY"]
# set :verify_key, ENV["JWT_SECRET"]

# require "./helper"
# require "./jwtAuth"
# use JwtAuth

error 404 do
  halt(404, { code: 404, error: "[client] Not found" }.to_json)
end
error 500 do
  halt(500, { code: 500, error: "[Server] Not found" }.to_json)
end
