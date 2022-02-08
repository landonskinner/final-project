# unLeashed
This application was built using a React frontend with a Rails backend. The purpose of unLeashed is to serve as a dog "play dating" app that allows owners to find nearby companions for their own dogs. Upon entry into the application, the user is prompted to login to an existing account or to sign up. Once either action is completed, the user can begin swiping through other user profile cards by liking or disliking each user. 

![Screen Shot 2022-02-08 at 1 06 33 PM](https://user-images.githubusercontent.com/89482763/153058155-c12a37d0-ed85-4735-a19e-0625a65e4473.png)

When two users mutually like one another, a match is created. On the Match page, the user can view their matches' profiles and start conversations with text and photo messaging. 

![Screen Shot 2022-02-08 at 1 07 01 PM](https://user-images.githubusercontent.com/89482763/153058193-d73e02ee-28ce-4735-8099-0f1a1b81184b.png)

Lastly, the Profile page gives the user the ability to view and edit their profile card.

## Hosted Link
The application is in the process of being deployed.

## Technologies Used
* React v17
  * React Router v6
* Ruby
  * Rails 6
  * ActiveRecord
* PostgreSQL
* HTML5/CSS3
* Material UI
* ChatEngine API
* Navigator Web API 

## Requirements to Run App Locally

- Ruby 2.7.4
- NodeJS (v16), and npm
- Heroku CLI
- Postgresql

See Environment Setup below for instructions on installing these tools if you
don't already have them.

You can use the following commands to run the application:

- `rails s`: run the backend on [http://localhost:3000](http://localhost:3000)
- `npm start --prefix client`: run the frontend on
  [http://localhost:4000](http://localhost:4000)

