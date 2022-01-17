class User < ApplicationRecord
    has_secure_password

    has_many :likers, class_name: 'Like', foreign_key: 'liker_id'
    has_many :likeds, class_name: 'Like', foreign_key: 'liked_id'

    has_one :profile
    has_one :preference
end
