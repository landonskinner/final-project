class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def index
        seen_users = @current_user.likers.map { |liker| liker.liked_id }
        render_users = User.where.not(id: seen_users).where.not(id: @current_user.id)
        render json: render_users, include: ['profile', 'profile.photos']
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

    private

    def user_params
        params.permit(:name, :email, :password)
    end

end
