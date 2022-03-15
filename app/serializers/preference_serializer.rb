class PreferenceSerializer < ActiveModel::Serializer
  attributes :id, :size, :distance, :personality

  belongs_to :user
end
