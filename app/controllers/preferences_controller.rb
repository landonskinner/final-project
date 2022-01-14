class PreferencesController < ApplicationController

    def show
        preference = Preference.find(params[:id])
        render json: preference
    end

    def create
        preference = Preference.create!(preference_params)
        render json: preference
    end

    def update
        preference = Preference.find(params[:id])
        preference.update(preference_params)
        render json: preference
    end

    def destroy
        preference = Preference.find(params[:id])
        preference.destroy
        head :no_content
    end

    private

    def preference_params
        params.permit(:user_id, :size, :distance, :personality)
    end

end
