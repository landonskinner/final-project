class Profile < ApplicationRecord

    validates :bio, length: { in: 2..500 }
    validates :age, numericality: { greater_than_or_equal_to: 0 }
    

    has_many :photos
    belongs_to :user

end
