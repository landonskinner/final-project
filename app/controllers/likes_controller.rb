class LikesController < ApplicationController

    def index
        likes = Like.all
        render json: likes
    end

    def show
        like = Like.find(params[:id])
        render json: like
    end
    
    def create

        like = Like.find_by({liker_id: params[:liker_id], liked_id: params[:liked_id]})
        # reciprocated_like = Like.where({liker_id: params[:liked_id], liked_id: params[:liker_id]})

        if !!like
            render json: like
        else
            new_like = Like.create!(like_params)
            render json: new_like
        end

    end

    private

    def like_params
        params.permit(:liker_id, :liked_id, :matched)
    end

end
