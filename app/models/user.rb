class User < ApplicationRecord
    has_secure_password

    has_many :matches_1, class_name: 'Match', foreign_key: 'user_1_id'
    has_many :matches_2, class_name: 'Match', foreign_key: 'user_2_id'

    has_one :profile
    has_one :preference
end
