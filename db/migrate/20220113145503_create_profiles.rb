class CreateProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :profiles do |t|
      t.belongs_to :user
      t.text :bio
      t.integer :age
      t.string :size
      t.string :location
      t.string :personality

      t.timestamps
    end
  end
end
