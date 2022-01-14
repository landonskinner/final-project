class MatchesController < ApplicationController

    def index
        matches = Match.all
        render json: matches
    end

    def show
        match = Match.find(params[:id])
        render json: match
    end
    
    def create
        # check to see if match has already been created for pair of users
        # if exists, render existing instance; otherwise, create new instance

        existing_match_1 = Match.where({"user_2_id": params[:user_2_id], "user_1_id": params[:user_1_id]})[0]
        existing_match_2 = Match.where({"user_1_id": params[:user_2_id], "user_2_id": params[:user_1_id]})[0]

        if !!existing_match_1
            render json: existing_match_1
        elsif !!existing_match_2
            render json: existing_match_2
        else
            match = Match.create!(match_params)
            render json: match
        end
    end

    def update
        match = Match.find(params[:id])
        match.update(match_params)
        render json: match
    end

    def destroy
        match = Match.find(params[:id])
        match.destroy
        head :no_content
    end

    private

    def match_params
        params.permit(:user_1_id, :user_liked, :user_2_id, :user2_liked, :matched)
    end

end
