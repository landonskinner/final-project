# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(name: "landon", email: "landon@gmail.com", password: "123456")
u2 = User.create(name: "luke", email: "luke@gmail.com", password: "123456")

m1 = Match.create(user_1: u1, user_1_liked: true, user_2: u2, user_2_liked: false, matched: false)

c1 = Conversation.create(match: m1)

p1 = Preference.create(user: u1, size: "medium", distance: 20, personality: "bad")
p2 = Preference.create(user: u2, size: "large", distance: 10, personality: 'good')

pro1 = Profile.create(user: u1, bio: "hi", age: 23, size: "little", location: "", personality: "good")
pro2 = Profile.create(user: u2, bio: "bye", age: 22, size: "smol", location: "", personality: "bad")

pho1 = Photo.create(profile: pro1, image: "1")
pho2 = Photo.create(profile: pro1, image: "2")
pho3 = Photo.create(profile: pro2, image: "3")
pho4 = Photo.create(profile: pro2, image: "4")
