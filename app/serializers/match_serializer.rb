class MatchSerializer < ActiveModel::Serializer
  attributes :id, :user_1, :user_1_liked, :user_2, :user_2_liked, :matched
end
