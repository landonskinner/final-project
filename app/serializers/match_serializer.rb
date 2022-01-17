class MatchSerializer < ActiveModel::Serializer
  attributes :id, :matcher, :matchee

  belongs_to :matcher
  belongs_to :matchee
end
