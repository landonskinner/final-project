class PreferenceSerializer < ActiveModel::Serializer
  attributes :id, :user, :size, :distance, :personality
end
