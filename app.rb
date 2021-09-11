require "sinatra"
# require 'sinatra/contrib/all'
require "sinatra/reloader" if development?
require "dotenv/load"

# require 'json'
require "sinatra/json"
require "sinatra/namespace"
# require 'mongoid'

require_relative "./lib/whmcs"
require "./helper"

require "bcrypt"

require "./lib/color"

# DB Setup
# Mongoid.load! 'mongoid.config'

configure :production, :development do
  set :server, :puma
  set :show_exceptions, false
  # set :json_content_type, :json
  enable :sessions
  enable :logging
  enable :reloader
end

# Provides a way to handle multiple HTTP verbs with a single block
#
# @example
#   route :get, :post, '/something' do
#       # Handle your route here
#   end
# def self.route(*methods, path, &block)
#     allowed_methods = [:get, :post, :delete, :patch, :put, :head, :options]
#     methods.each do |method|
#         method.to_sym
#         self.send(method, path, &block) if allowed_methods.include? method
#     end
# end

#  Endpoints
get "/" do
  return "hello world"
end

# namespace
# https://x-team.com/blog/how-to-create-a-ruby-api-with-sinatra/
namespace "/api/v1" do
  before do
    content_type "application/json"
    expires 500, :public, :must_revalidate

    # remove global @payload
    # @payload = JSON.parse(request.body.read.to_s)
    config = {
      'endpoint': ENV["ENDPOINT"],
      'identifier': ENV["IDENTIFIER"],
      'secret': ENV["SECRET"],
    }

    Whmcs.configure(config)
  end

  # routes
  get "/users" do
    logger.info "loading users data"

    users = Whmcs.call("GetUsers", {}).body

    return users
  end

  get "/permissions" do
    response = Whmcs.call("GetPermissions")
    logger.info '[#{response[:result].upcase.bg_red}] - #{response[:message]}.'
    return json(response)
  end

  get "/system" do
    logger.info "loading system data"
    response = Whmcs::System.find_all_by_role_id({ 'roleid': params["roleid"].to_i, 'email': params["email"], 'include_disabled': params["include_disabled"] })
    return json(response)
  end

  get "/clients" do
    logger.info "loading clients data"
    # set default parmas
    limitstart = parmas[:limitstart] || 0
    limitnum = params[:limitnum] || 25
    sorting = params[:sorting] || "ASC"
    status = params[:status] || "Active" # ‘Active’, ‘Inactive’, or ‘Closed’.
    search = params[:search] || ""  # email, firstname, lastname, fullname or companyname
    orderby = params[:orderby] || "id"  # id, firstname, lastname, companyname, email, groupid, datecreated, status

    response = Whmcs.call("GetClients", parmas)
    return json(response)
  end

  # curl -i -X POST -H 'Content-Type: application/json' -d'{'email':'51753160@qq.com', 'password':'76dAJ8uuZ9On'}' http://localhost:4567/api/v1/login
  post "/login" do
    payload = JSON.parse(request.body.read.to_s)

    logger.info 'Login #{payload}'
    response = Whmcs.login(payload["email"], payload["password"])
    return json(response)
  end

  get "/service/:id" do |id|
    res = Whmcs::Service.find(id)
    puts res
    return res
  end

  get "/books" do
    books = Books.all

    [:title, :isbn, :author].each do |filter|
      books = books.send(filter, params[filter]) if params[filter]
    end

    books.map { |book| BookSerializer.new(book) }.to_json
  end
  get "/books/:id" do |id|
    halt_if_not_found!
    serialize(book)
  end

  post "/books" do
    book = Book.new(json_params)
    halt 422, serialize(book) unless book.save
    response.headers["Location"] = '#{base_url}/api/v1/books/#{book.id}'
    status 201
  end

  patch "/books/:id" do |id|
    halt_if_not_found!
    halt 422, serialize(book) unless book.update_attributes(json_params)
    serialize(book)
  end

  delete "/books/:id" do |id|
    book.destroy if book
    status 204
  end

  error 404 do
    halt(404, { code: 404, error: "not found" }.to_json)
  end
  error 500 do
    halt(500, { code: 500, error: "server not found" }.to_json)
  end
end
