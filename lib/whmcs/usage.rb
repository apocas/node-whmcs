module Whmcs
  ##
  # Process usage data from ComputeStacks
  class Usage < Base

    attr_accessor :billable_items,
                  :errors

    def initialize(raw_data = [])
      self.billable_items = []
      self.errors = []
      aggregate_usage!(raw_data) unless raw_data.empty?
    end

    ##
    # Create billable items in WHMCS
    def save
      t = Time.new(Time.now.utc.year,Time.now.utc.month)+45*24*3600
      due_date = Time.new(t.year, t.month, due_date_day).strftime('%Y-%m-%d')
      # Generate Billable Items
      billable_items.each do |i|
        # Intentionally not including this so we can capture the exception in CS.
        response = remote('AddBillableItem', billabe_by_version(i, due_date))
        begin
          result = Oj.load(response.body, { symbol_keys: true, mode: :object })
          self.errors << result[:message] unless result[:result] == 'success'
        rescue
          # probably a failure anyways
          self.errors << "Fatal error reporting usage to WHMCS."
        end
      end
      errors.empty?
    end

    private

    def billabe_by_version(i, due_date)
      if Whmcs.whmcs_version >= Gem::Version.new('8.2.0')
        {
          'clientid' => i[:client_id],
          'description' => i[:product],
          'amount' => i[:total],
          'invoiceaction' => invoice_generate_on,
          'duedate' => due_date,
          'quantity' => i[:qty],
          'unit' => 'quantity'
        }
      else
        {
          'clientid' => i[:client_id],
          'description' => i[:product],
          'amount' => i[:total],
          'invoiceaction' => invoice_generate_on,
          'duedate' => due_date,
          'hours' => i[:qty]
        }
      end
    end

    def due_date_day
      default_due_date = Whmcs.settings.select{ |i| i[:name] == 'due_date' }[0][:default].to_i
      default_due_date = default_due_date.zero? ? 1 : default_due_date
      Whmcs.config[:due_date].to_i.zero? ? default_due_date : Whmcs.config[:due_date].to_i
    end

    def invoice_generate_on
      generate_on_default = Whmcs.settings.select{ |i| i[:name] == 'invoice_on' }[0][:default]
      %w(duedate nextcron).include?(Whmcs.config[:invoice_on]) ? Whmcs.config[:invoice_on] : generate_on_default
    end

    ##
    # Format data provided by ComputeStacks, for WHMCS
    def aggregate_usage!(data)
      # Collect all WHMCS users IDs
      user_ids = []
      data.each do |i|
        # clientid = i.dig(:user, :labels, 'whmcs', 'client_id')
        # if clientid.blank? && i.dig(:user, :labels, 'whmcs', 'service_id')
        #   s = Whmcs::Service.find(i.dig(:user, :labels, 'whmcs', 'service_id'))
        #   client_id = s.client_id if s
        # end
        whmcs_cid = i.dig(:user, :labels, 'whmcs', 'client_id')
        whmcs_sid = i.dig(:user, :labels, 'whmcs', 'service_id')
        clientid = if whmcs_cid.blank?
                     whmcs_sid.blank? ? nil : Whmcs::Service.find(i.dig(:user, :labels, 'whmcs', 'service_id'))&.client_id
                   else
                     i.dig(:user, :labels, 'whmcs', 'client_id')
                   end
        clientid = i.dig(:user, :external_id) if clientid.blank?
        next if clientid.blank?
        clientid = clientid.to_i # ensure we always have an int
        user_ids << clientid unless user_ids.include?(clientid)
        # Now set our copy of the data to include the clientid as the external id. We will use this later to verify the output
        i[:user][:external_id] = clientid
      end

      billables = []
      user_ids.each do |i|
        products = []
        data.each do |item|
          if item[:user] && item[:user][:external_id] == i
            products << item[:product][:name] unless products.include?(item[:product][:name])
          end
        end
        products.each do |p|
          total = 0.0
          qty = 0.0
          data.each do |item|
            next if item[:user].nil? || item[:user][:external_id] != i
            next unless item[:product][:name] == p
            total += item[:total]
            qty += item[:qty]
          end
          billables << { total: total.round(2), qty: qty , client_id: i, product: p } unless total.zero?
        end
      end
      self.billable_items = billables
    end

  end
end