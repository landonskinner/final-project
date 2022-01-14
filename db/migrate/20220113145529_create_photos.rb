class CreatePhotos < ActiveRecord::Migration[6.1]
  def change
    create_table :photos do |t|
      t.belongs_to :profile
      t.string :image

      t.timestamps
    end
  end
end
