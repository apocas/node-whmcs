#  Endpoints
get "/" do
  return test("params")
end

get "/debug" do
  return session.inspect
end

get "/test/:key" do
  result = REDIS.get(params[:key])

  return json({ "username": result })
end

get "/logout" do
  session["access_token"] = nil
  session.clear

  redirect to("/")
end

get "/register" do
end

namespace "/api/v1" do
  before do
    content_type "application/json"
    expires 500, :public, :must_revalidate

    # set global variables @payload
    # @payload = JSON.parse(request.body.read.to_s)
    config = {
      'endpoint': ENV["ENDPOINT"],
      'identifier': ENV["IDENTIFIER"],
      'secret': ENV["SECRET"],
    }

    Whmcs.configure(config)

    Dir[File.join(File.dirname(__FILE__), "api", "*.rb")].each { |file| require file }
  end
end
