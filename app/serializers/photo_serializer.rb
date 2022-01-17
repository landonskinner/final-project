class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :image

  belongs_to :profile
end
