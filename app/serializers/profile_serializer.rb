class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :bio, :age, :size, :location, :personality, :lat, :lng

  belongs_to :user
  has_many :photos
end
