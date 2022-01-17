class LikeSerializer < ActiveModel::Serializer
  attributes :id, :liker, :liked, :matched

  has_one :matcher
  has_one :matchee
  belongs_to :liker
  belongs_to :liked
end
