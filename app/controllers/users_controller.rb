class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def index
        seen_users = @current_user.likers.map { |liker| liker.liked_id }
        render_users = User.where.not(id: seen_users) && User.where.not(id: @current_user.id)
        render json: render_users
    end

    def show
        user = User.find(params[:id])
        render json: user, include: ['profile', 'profile.photos']
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user
    end

    def destroy
        user = User.find(id: params[:id])
        user.destroy
        head :no_content
    end

    def me
        render json: @current_user, include: ['profile', 'profile.photos']
    end

    def distance
        users = [User.find(28)]

        rad_per_deg = Math::PI/180
        rm = 3963

        lat = User.find(params[:id]).profile.lat.to_f
        lng = User.find(params[:id]).profile.lng.to_f
        lat_rad = lat * rad_per_deg
        lng_rad = lng * rad_per_deg

        # calculates distance in miles between coordinates
        distances = users.map do |user| 
            lat_1 = user.profile.lat.to_f
            lng_1 = user.profile.lng.to_f
            dlat = (lat_1 - lat) * rad_per_deg
            dlng = (lng_1 - lng) * rad_per_deg
            lat_rad_1 = lat_1 * rad_per_deg
            lng_rad_1 = lng_1 * rad_per_deg

            a = Math.sin(dlat/2)**2 + Math.cos(lat_rad) * Math.cos(lat_rad_1) * Math.sin(dlng/2)**2
            d = 2 * Math::atan2(Math::sqrt(a), Math::sqrt(1-a))
            
            [user.id, rm * d]
        end

        render json: {distances: distances}
    end

    private

    def user_params
        params.permit(:name, :email, :password)
    end

end
