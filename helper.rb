helpers do

  def base_url
    @base_url ||= "#{request.env["rack.url_scheme"]}://#{request.env["HTTP_HOST"]}"
  end

  def json_params
    begin
      JSON.parse(request.body.read)
    rescue
      halt 400, { message: "Invalid JSON" }.to_json
    end
  end

  def book
    @book ||= Book.where(id: params[:id]).first
  end

  def halt_if_not_found!
    halt(404, { message: "Book Not Found" }.to_json) unless book
  end

  def serialize(book)
    BookSerializer.new(book).to_json
  end

  # Serializers
  class Serializer
    def initialize(response)
      @response = response
    end
  end
end
