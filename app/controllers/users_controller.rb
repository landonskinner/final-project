class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: ['profile', 'profile.photos']
    end

    def show
        user = User.find(params[:id])
        render json: user, include: ['profile', 'profile.photos']
    end

    def create
        user = User.create!(user_params)
        render json: user
    end

    def destroy
        user = User.find(id: params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:name, :email, :password)
    end

end
