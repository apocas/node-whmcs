module Whmcs
  ##
  # Base class for our plugin
  class Base
    def initialize(args = {})
      args.each do |key, value|
        send("#{key}=", value)
      end
    end

    ##
    # Initiate remote api calls to WHMCS
    def remote(action, opts = {})
      raise Whmcs::Error.new "Plugin not configured" unless configured?

      endpoint = "https://#{sanitized_endpoint}/includes/api.php"
      params = {
        action: action,
        identifier: Whmcs.config[:identifier],
        secret: Whmcs.config[:secret],
        responsetype: "json",
      }
      unless Whmcs.config[:accesskey].blank?
        params[:accesskey] = Whmcs.config[:accesskey]
      end
      params.merge!(opts) unless opts.empty?
      # Faraday.post(endpoint, params)
      Net::HTTP.post_form(URI(endpoint), params)
    end

    private

    ##
    # Perform some basic sanity checks on the endpoint
    def sanitized_endpoint
      return nil if Whmcs.config[:endpoint].blank?
      e = Whmcs.config[:endpoint].split("://").last # remove all protocol definitions
      e[-1] == "/" ? e[0..-2] : e # Remove trailing '/'.
    end

    ##
    # Simple sanity check to make sure our required parameters are not blank
    def configured?
      !(Whmcs.config[:identifier].blank? || Whmcs.config[:secret].blank? || Whmcs.config[:endpoint].blank?)
    end
  end
end
