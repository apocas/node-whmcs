# Models::People
class People
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
  include Mongoid::Timestamps

  field :full_name, type: String
  field :company_name, type: String
  field :address1, type: String
  field :postal_code, type: String
  field :city, type: String
  field :country, type: String
  field :mobile, type: String
  field :phone, type: String
  field :fax, type: String
  field :activity, type: String
end
