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
        match = Match.create!(match_params)
        render json: match
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

    def matched

        like_1 = Like.find_by({"liker_id": params[:liker_id], "liked_id": params[:liked_id]})
        like_2 = Like.find_by({"liker_id": params[:liked_id], "liked_id": params[:liker_id]})

        if like_2&.matched
            
            match_1 = Match.find_by({'matcher_id': like_1.id, 'matchee_id': like_2.id})
            match_2 = Match.find_by({'matcher_id': like_2.id, 'matchee_id': like_1.id})

            if !!match_1
                render json: match_1
            elsif !!match_2
                render json: match_2
            else
                match = Match.create!(matcher_id: like_1.id, matchee_id: like_2.id)
                render json: match
            end
        else
            render json: {}
        end
    end

    def own_matches
        matches = Match.where("matcher": Like.where('liker_id': params[:id])).or(Match.where("matcher": Like.where('liked_id': params[:id])))
        render json: matches, include: ['matcher', 'matcher.liker', 'matcher.liked', 'matcher.liker.profile', 'matcher.liked.profile', 'matcher.liker.profile.photos', 'matcher.liked.profile.photos']
    end

    private

    def match_params
        params.permit(:matcher_id, :matchee_id)
    end

end
