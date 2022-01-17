class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email

  has_many :likeds
  has_many :likers
  has_one :profile
end
