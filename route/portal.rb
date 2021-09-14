#  Endpoints
get "/" do
  return session.inspect
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
