require "sinatra"
# require "sinatra/contrib/all"
require "sinatra/json"
require "sinatra/reloader" if development?
require "dotenv/load"

require "json"
# require "sinatra/json"
require "sinatra/namespace"
# require "mongoid"

require_relative "./lib/whmcs"
require "./helper"

require 'bcrypt'

# DB Setup
# Mongoid.load! "mongoid.config"

configure :production, :development do
  set :server, :puma
  # set :json_content_type, :json
  enable :sessions
  enable :logging
  enable :reloader
end

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
  end

  config = {
    "endpoint": ENV["ENDPOINT"],
    "identifier": ENV["IDENTIFIER"],
    "secret": ENV["SECRET"],
  }

  Whmcs.configure(config)

  # routes
  get "/users" do
    logger.info "loading users data"

    users = Whmcs.api("GetUsers", {}).body

    return users
  end

  get "/clients" do
    logger.info "loading clients data"
    response = Whmcs.api("GetClients", { 'limitnum': 10, 'orderby': "id" })
    return json(response)
  end

  get '/system' do
    logger.info "loading system data"
    response = Whmcs::System.find_all_by_role_id( {'roleid': params['roleid'].to_i, 'email': params['email'], 'include_disabled': params['include_disabled']})
    return json(response)
  end

  # curl -i -X POST -H "Content-Type: application/json" -d'{"email":"51753160@qq.com", "password":"76dAJ8uuZ9On"}' http://localhost:4567/api/v1/login
  post '/login' do
    payload = JSON.parse(request.body.read.to_s)

    logger.info "Login #{payload}"
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
    response.headers["Location"] = "#{base_url}/api/v1/books/#{book.id}"
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
end
