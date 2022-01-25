class PhotosController < ApplicationController

    def index
        photos = Photo.all
        render json: photos
    end

    def show
        photo = Photo.find(params[:id])
        render json: photo
    end

    def create
        photo = Photo.create!(photo_params)
        render json: photo
    end

    def update
        photo = Photo.find(params[:id])
        photo.update(photo_params)
        render json: photo
    end

    def destroy
        photo = Photo.find(params[:id])
        photo.destroy
        render json: {}
    end

    private

    def photo_params
        params.permit(:profile_id, :image)
    end

end
