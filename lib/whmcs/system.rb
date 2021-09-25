module Whmcs
  class System < Base

    class << self
      ##
      # GetAdminUsers: String
      # roleid: int
      # email: String
      # include_disabled: bool
      ##
      # result: "success" || "error"
      # count:  int
      # admin_users: array
      def find_all_by_role_id(params)
        admin_users = []
        start_number = 0
        loop_until = Time.now + 300 # 5 minutes from now
        while loop_until >= Time.now
          response = Whmcs::Base.new.remote("GetAdminUsers", params)
          break unless response.kind_of? Net::HTTPSuccess
          result = Oj.load(response.body, { symbol_keys: true, mode: :object })
          break if result[:count].zero?
        end
      end
    end

    private

    def valid?
      self.errors << "Missing service id" if self.id.blank?
      errors.empty?
    end

  end
end