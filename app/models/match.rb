class Match < ApplicationRecord
    belongs_to :matcher, class_name: 'Like'
    belongs_to :matchee, class_name: 'Like'

    has_one :conversation
end
