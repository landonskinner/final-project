class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    # const sizeOptions = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']
    # const personalityOptions = ['Timid', 'Lazy', 'Calm', 'Outgoing', 'Independent']

    def index
        seen_users = @current_user.likers.map { |liker| liker.liked_id }
        if (@current_user.preference && @current_user.preference.size != "")
            size = @current_user.preference.size
        end
        if (@current_user.preference && @current_user.preference.personality != "")
            personality = @current_user.preference.personality
        end
        if (@current_user.preference && @current_user.preference.distance != nil)
            distance = @current_user.preference.distance
        end
        filter_users = Profile.where(size: size || ['Tiny', 'Small', 'Medium', 'Large', 'Huge'])
                            .where(personality: personality || ['Timid', 'Lazy', 'Calm', 'Outgoing', 'Independent'])
                            .map { |profile| profile.user_id}
        # byebug
        render_users = User.where.not(id: seen_users).where.not(id: @current_user.id).where(id: filter_users)
        render json: render_users, include: ['profile', 'profile.photos']
    end

    def show
        user = User.find(params[:id])
        render json: user, include: ['profile', 'profile.photos', 'preference']
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, include: ['profile', 'profile.photos']
    end

    def destroy
        user = User.find(id: params[:id])
        user.destroy
        head :no_content
    end

    def me
        render json: @current_user, include: ['profile', 'profile.photos', 'preference']
    end

    private

    def user_params
        params.permit(:name, :email, :password)
    end

end
