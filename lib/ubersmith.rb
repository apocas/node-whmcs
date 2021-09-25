require 'mechanize'
require 'json'
# This gem provides programmatic access to the Ubersmith API from ruby. To use it create
# an instance of the Ubersmith::API class using the url, username, and api token for
# the Ubersmith server.
#
#   require 'ubersmithrb'
#   api = Ubersmith::API.new(myurl, myuser, mytoken)
#   result = api.client.create({:first_name => "Test", :last_name => "User"})
#   puts result.message
module Ubersmith

  # This class serves as the API handle for communicating with an ubersmith server.
  # It contains accessors for communicating with each of the ubersmith API
  # modules. When instantiated it requires the API URL to connect to and the user
  # name and API token to use. For documentation of the Ubersmith API calls
  # available see http://www.ubersmith.com/kbase/index.php?_m=downloads&_a=view&parentcategoryid=2
  class API

    # Initializer method. Accepts API URL, username, and API token as parameters.
    def initialize(url, user, token)
      @url = url
      @user = user
      @token = token
      @modules = {}
      [:uber, :client, :device, :order, :sales, :support].each do |mod|
        @modules[mod] = Ubersmith::Command.new(mod, url, user, token)
      end
    end

    # This accessor is used for calling API methods under the uber module.
    def uber
      @modules[:uber]
    end

    # This accessor is used for calling API methods under the client module.
    def client
      @modules[:client]
    end

    # This accessor is used for calling API methods under the device module.
    def device
      @modules[:device]
    end

    # This accessor is used for calling API methods under the order module.
    def order
      @modules[:order]
    end

    # This accessor is used for calling API methods under the sales module.
    def sales
      @modules[:sales]
    end

    # This accessor is used for calling API methods under the support module.
    def support
      @modules[:support]
    end
  end


  # This class is the command handler for sending API commands and processing the
  # response. Each instance of the handler is given a module name and method calls
  # made to instances of this class will then be delegated to that API module.
  class Command
    def initialize(mod, url, user, token)
      @modname = mod
      @url = url
      @user = user
      @token = token
      @agent = Mechanize.new
    end

    # Returns a formatted API command call URL.
    def command_url(cmd)
      "#{@url}?method=#{@modname.to_s}.#{cmd}"
    end

    # This class uses method_missing for handling delegation to the API method.
    # When making a call from this class call the method as you would a normal
    # ruby method. Parameters passed should be a hash of all the fields to
    # send to the API. Consult the ubersmith API docs for the necessary fields
    # for each API call.
    def method_missing(sym, *args)
      cmd = command_url(sym)
      @agent.add_auth(cmd, @user, @token)
      resp = nil
      begin
        a = args.first
#        puts "#{cmd}(#{a.inspect})"
        page = (a.nil?) ? @agent.get(cmd) : @agent.post(cmd, a)
#        puts "#{page.content}"
        resp = Ubersmith::Response.new(JSON.parse(page.content))
      rescue Exception => e
        if !page.nil? and !page.content.nil? and page.content.include?("PDF")
          resp = Ubersmith::Response.new({'status' => true, 'data' => page.content})
        elsif !page.nil? and !page.content.nil? and page.content.include?("HTML")
          resp = Ubersmith::Response.new({'status' => true, 'data' => page.content})
        else
          resp = Ubersmith::Response.new({'status' => false, 'error_code' => 500, 'error_message' => e.message})
        end
      end
      resp
    end
  end

  # This class represents a response from the API. It maintains the result status
  # and any error codes and messages in addition to the data portion of the API response.
  class Response
    def initialize(raw = {'status' => false, 'error_code' => '999', 'error_message' => 'No response'})
      @response = raw
    end

    # Returns true if the API call was successful.
    def ok?
      @response['status'] == true
    end

    # Returns true if the API had an error.
    def error?
      @response['status'] != true
    end

    # Return an message string. OK if successful, or error code and message if error.
    def message
      (ok?) ? "OK" : "(#{error_code}): #{error_message}"
    end

    # Returns the error code if one was given.
    def error_code
      @response['error_code']
    end

    # Returns the error message if one was given.
    def error_message
      @response['error_message']
    end

    # Returns parsed data result from the API call. For many API calls this will
    # be a nested hash data structure. For some it may be a scalar value. Consult
    # the Ubersmith API docs for the value to expect for each call.
    def data
      @response['data']
    end

    # This class provides a convenience means via method_missing to delegate to the
    # data results of the response so that the main object can be treated like the
    # data directly.
    def method_missing(sym, *args)
      if args.empty?
        @response['data'].send(sym)
      else
        @response['data'].send(sym, *args)
      end
    end

  end

end
