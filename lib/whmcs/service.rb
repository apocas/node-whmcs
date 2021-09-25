module Whmcs
  class Service < Base

    attr_accessor :id,
                  :client_id,
                  :product_id,
                  :username,
                  :status,
                  :p_module,
                  :errors

    def initialize(args = {})
      self.errors = []
      super
    end

    # Set service username
    def save
      return false unless valid?
      response = remote('UpdateClientProduct', { 'serviceid' => id, 'serviceusername' => username })
      begin
        result = Oj.load(response.body, { symbol_keys: true, mode: :object })
        self.errors << result[:message] unless result[:result] == 'success'
      rescue
        # probably a failure anyways
        self.errors << "Fatal error reporting usage to WHMCS."
      end
      errors.empty?
    end

    class << self

      ##
      # Load service
      def find(id)
        response = Whmcs::Base.new.remote('GetClientsProducts', { 'serviceid' => id })
        return nil unless response.kind_of? Net::HTTPSuccess
        result = Oj.load(response.body, { symbol_keys: true, mode: :object })
        return nil unless result[:totalresults].to_i == 1
        service = result[:products][:product][0]
        new(
          id: service[:id],
          client_id: service[:clientid],
          product_id: service[:pid],
          username: service[:username],
          p_module: product_module(service[:pid]),
          status: service[:status].downcase
        )
      end

      ##
      # Find a user given their product/service username
      def find_all_by_username(username)
        services = []
        start_number = 0
        loop_until = Time.now + 300 # 5 minutes from now
        while loop_until >= Time.now do
          response = Whmcs::Base.new.remote('GetClientsProducts', { limitstart: start_number, username2: username })
          break unless response.kind_of? Net::HTTPSuccess
          result = Oj.load(response.body, { symbol_keys: true, mode: :object })
          break if result[:totalresults].zero?

          result[:products][:product].each do |i|
            services << new(
              id: i[:id],
              product_id: i[:pid],
              client_id: i[:clientid],
              status: i[:status],
              username: i[:username],
              p_module: Whmcs::Service.product_module(i[:pid])
            )
          end

          break unless (result[:startnumber] + result[:numreturned]) < result[:totalresults]
          start_number = result[:startnumber] + result[:numreturned]
        end
        services
      end

      ##
      # Determine the product module name given a productid
      def product_module(pid)
        response = Whmcs::Base.new.remote('GetProducts', { pid: pid })
        return nil unless response.kind_of? Net::HTTPSuccess
        result = Oj.load(response.body, { symbol_keys: true, mode: :object })
        return nil unless result[:result] == 'success'
        result[:products][:product].each do |i|
          return i[:module] if i[:module]
        end
        nil
      end

      ##
      # Link a user given their Username
      #
      # Triggered by `user_created` hook to link a CS user with their WHMCS account.
      #
      # This method is passed the model from ComputeStacks, allowing us to save our own labels.
      #
      def link_user_by_username(model)
        return true, [] if model.labels.empty? || model.labels['cpanel'].nil?
        candidates = []
        model.labels['cpanel'].each_key do |server|
          items = Whmcs::Service.find_all_by_username(model.labels['cpanel'][server])
          items.each do |i|
            candidates << {
              client_id: i.client_id,
              service_id: i.id,
              p_module: i.p_module
            } unless candidates.map { |i| i[:client_id] }.include?(i.client_id)
          end
        end

        if candidates.empty?
          return false, ["No candidates found"]
        end

        if candidates.count > 1
          return false, ["Multiple candidates found (found: #{candidates.count}"]
        end

        candidate = candidates.first

        # Load the WHMCS user
        whmcs_user = Whmcs::User.find_by_id candidate[:client_id]

        return false, ["Missing WHMCS user"] if whmcs_user.nil?

        labels = model.labels
        labels.merge!(
          'whmcs' => {
            'client_id' => candidate[:client_id],
            'service_id' => candidate[:p_module] == 'computestacks' ? candidate[:service_id] : nil
          }
        )

        unless whmcs_user.nil?
          model.active = true

          # `requested_email` means that we will try to give this email, otherwise we will create a generated one
          model.requested_email = whmcs_user.email

          model.fname = whmcs_user.fname
          model.lname = whmcs_user.lname
          model.address1 = whmcs_user.address1
          model.address2 = whmcs_user.address2
          model.city = whmcs_user.city
          model.state = whmcs_user.state
          model.zip = whmcs_user.zip
          model.country = whmcs_user.country
          model.phone = whmcs_user.phone
          model.labels = labels

          unless model.save
            return false, model.errors.full_messages
          end

        end
        return true, []
      end
    end

    private

    def valid?
      self.errors << "Missing service id" if self.id.blank?
      errors.empty?
    end

  end
end