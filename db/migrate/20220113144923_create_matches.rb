class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.references :user_1, null: false, foreign_key: { to_table: :users }
      t.boolean :user_1_liked
      t.references :user_2, null: false, foreign_key: { to_table: :users }
      t.boolean :user_2_liked
      t.boolean :matched

      t.timestamps
    end
  end
end
