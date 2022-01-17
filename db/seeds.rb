# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

u1 = User.create(name: "landon", email: "landon@gmail.com", password: "123456")
u2 = User.create(name: "bentley", email: "bentley@gmail.com", password: "123456")

l1 = Like.create(liker: u1, liked: u2, matched: true)
l2 = Like.create(liker: u2, liked: u1, matched: true)

m1 = Match.create(matcher: l1, matchee: l2)

c1 = Conversation.create(match: m1)

p1 = Preference.create(user: u1, size: "medium", distance: 20, personality: "bad")
p2 = Preference.create(user: u2, size: "large", distance: 10, personality: 'good')

pro1 = Profile.create(user: u1, bio: "hi", age: 23, size: "little", location: "", personality: "good")
pro2 = Profile.create(user: u2, bio: "bye", age: 22, size: "smol", location: "", personality: "bad")

pho1 = Photo.create(profile: pro1, image: "1")
pho2 = Photo.create(profile: pro1, image: "2")
pho3 = Photo.create(profile: pro2, image: "3")
pho4 = Photo.create(profile: pro2, image: "4")
