class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :user, :bio, :age, :size, :location, :personality
end
