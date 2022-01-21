class Like < ApplicationRecord
    belongs_to :liker, class_name: 'User'
    belongs_to :liked, class_name: 'User'

    has_one :matcher, class_name: 'Match', foreign_key: 'matcher_id', dependent: :delete
    has_one :matchee, class_name: 'Match', foreign_key: 'matchee_id', dependent: :delete
end
