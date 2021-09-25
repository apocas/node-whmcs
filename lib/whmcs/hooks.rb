module Whmcs
  ##
  # Hooks allow you to extend your module into different aspects of ComputeStacks.
  #
  # Available Hooks:
  #
  # user_created, user_updated:
  # * params: User model. This allows you to access the user object and make changes to the user
  #
  # process_usage:
  # * params: Array of Hashes | aggregated usage data for the month. This will be triggered on the last day of the month.
  #
  class Hooks < Base

    attr_accessor :errors

    def initialize
      self.errors = []
    end


    ##
    # UserCreated hook
    #
    # This hook receives the full user Model from ComputeStacks. You can make changes to the user using this.
    #
    def user_created(model)
      success, errors = Whmcs::Service.link_user_by_username model
      return true if success
      self.errors += errors
      false
    end

    ##
    # ProcessUsage Hook
    #
    # Take the raw aggregated billing data from ComputeStacks and process it
    #
    def process_usage(raw_data)
      usage = Whmcs::Usage.new(raw_data)
      return true if usage.billable_items.empty?
      result = usage.save
      self.errors += usage.errors
      errors.empty? && result
    end

    ##
    # User Updated
    #
    # Update the username field of a WHMCS service
    #
    def user_updated(model)
      return true if model.labels.empty? || model.labels.dig('whmcs', 'service_id').nil?
      service = Whmcs::Service.find(model.labels['whmcs']['service_id'].to_i)
      if service.nil?
        self.errors << "Unknown service, unable to update."
        return false
      end
      return true if model.email == service.username
      service.username = model.email
      result = service.save
      self.errors += service.errors
      errors.empty? && result
    end

  end
end