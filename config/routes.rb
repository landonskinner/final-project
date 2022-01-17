Rails.application.routes.draw do
  
  resources :likes
  resources :photos
  resources :profiles
  resources :preferences
  resources :conversations
  resources :matches
  resources :users

  get "/existing_likes/*path", to: "likes#existing_likes"
  post "/matched", to: "matches#matched"
  get "/own_matches/:id", to: "matches#own_matches"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
