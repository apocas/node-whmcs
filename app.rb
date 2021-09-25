require "sinatra"
require "dotenv/load"
require "sinatra/json"
require "sinatra/namespace"
require "sinatra/reloader" if development?

require "redis"
require "bcrypt"
# require "json"
# require "bson"
require "mongoid"

configure :production, :development do
  enable :logging
  enable :reloader

  set :server, :puma
  set :show_exceptions, false
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
                             :expire_after => 60 * 60 * 24 * 1, # 5 days in seconds
                             :secret => ENV["SESSION_SECRET"]

  # eable protection
  use Rack::Protection, :except => :path_traversal

  # connect to db
  REDIS = Redis.new(url: ENV["REDIS_URI"])
  # DB Setup
  Mongoid.load!(File.join(File.dirname(__FILE__), "config", "mongo.yml"), :production)
end

before do
  # Switch to parameter based session management if the client is an ios device
  if env["HTTP_USER_AGENT"] =~ /iOS/
    session.options[:cookie_only] = false
    session.options[:defer] = true
  end
end

def test(params)
  { "test from app": params.to_s }.to_json
end

# load helper
require "./helper"

# Routing
%w[route lib models].each { |path| Dir[File.join(File.dirname(__FILE__), path, "*.rb")].each { |file| require file } }

# Error handlers
error 404 do
  halt(404, { code: 404, error: "[client] Not found" }.to_json)
end
error 500 do
  halt(500, { code: 500, error: "[Server] Not found" }.to_json)
end
