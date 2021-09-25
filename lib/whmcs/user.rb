module Whmcs
  ##
  # WHMCS User
  class User < Base
    attr_accessor :id,
                  :uuid,
                  :fname,
                  :lname,
                  :company,
                  :email,
                  :address1,
                  :address2,
                  :city,
                  :state,
                  :zip,
                  :country,
                  :phone

    class << self

      ##
      # Find a WHMCS user by their ID
      def find_by_id(clientid)
        response = Whmcs::Base.new.remote('GetClientsDetails', {clientid: clientid})
        if response.kind_of? Net::HTTPSuccess
          result = Oj.load(response.body, { symbol_keys: true, mode: :object })
          if result[:result] == 'success' && result[:client]
            new_from_response(result[:client])
          end
        else
          nil
        end
      end

      ##
      # Find a WHMCS user by their email
      def find_by_email(clientemail)
        response = Whmcs::Base.new.remote('GetClientsDetails', {email: clientemail})
        if response.kind_of? Net::HTTPSuccess
          result = Oj.load(response.body, { symbol_keys: true, mode: :object })
          if result[:result] == 'success' && result[:client]
            new_from_response(result[:client])
          end
        else
          nil
        end
      end

      ##
      # Create a Whmcs::User object from the WHMCS response
      def new_from_response(data)
        new(
          id: data[:id],
          uuid: data[:uuid],
          fname: data[:firstname],
          lname: data[:lastname],
          email: data[:email],
          address1: data[:address1],
          address2: data[:address2],
          city: data[:city],
          state: data[:fullstate],
          zip: data[:postcode],
          country: data[:countrycode].blank? ? data[:country] : data[:countrycode],
          phone: data[:phonenumberformatted].blank? ? data[:phonenumber] : data[:phonenumberformatted]
        )
      end

    end
  end
end