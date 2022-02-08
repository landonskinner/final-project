Rails.application.routes.draw do
  
  resources :likes
  resources :photos
  resources :profiles
  resources :preferences
  resources :conversations
  resources :matches
  resources :users

  # get "/existing_likes/*path", to: "likes#existing_likes"
  post "/matched", to: "matches#matched"
  get "/own_matches/:id", to: "matches#own_matches"
  post "/signup", to: "users#create"
  get "/me", to: "users#me"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/distance/:id", to: "users#distance"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
