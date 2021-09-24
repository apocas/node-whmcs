# Models::User
class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :username, type: String
  field :email, type: String
  field :passwordhash, type: String
  field :salt, type: String
  field :access_token, type: String
  field :refresh_token, type: String
  field :admin, type: Boolean
end
