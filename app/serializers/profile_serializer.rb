class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :bio, :age, :size, :location, :personality

  belongs_to :user
  has_many :photos
end
