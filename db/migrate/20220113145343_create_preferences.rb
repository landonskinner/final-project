class CreatePreferences < ActiveRecord::Migration[6.1]
  def change
    create_table :preferences do |t|
      t.belongs_to :user
      t.string :size
      t.integer :distance
      t.string :personality

      t.timestamps
    end
  end
end
