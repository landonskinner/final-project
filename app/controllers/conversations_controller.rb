class ConversationsController < ApplicationController

    def index
        conversations = Conversation.all
        render json: conversations
    end

    def show
        conversation = Conversation.find(params[:id])
        render json: conversation
    end

    def create
        conversation = Conversation.create!(conversation_params)
        render json: conversation
    end

    def update
        conversation = Conversation.find(params[:id])
        conversation.update(conversation_params)
        render json: conversation
    end

    def destroy
        conversation = Conversation.find(params[:id])
        conversation.destroy
        head :no_content
    end

    private

    def conversation_params
        params.permit(:match_id)
    end

end
