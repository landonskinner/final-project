class User < ApplicationRecord
    has_secure_password

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true 
    ## do regex^^

    has_many :likers, class_name: 'Like', foreign_key: 'liker_id', dependent: :delete_all
    has_many :likeds, class_name: 'Like', foreign_key: 'liked_id', dependent: :delete_all

    has_one :profile, dependent: :delete
    has_one :preference, dependent: :delete
end
