class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.references :matcher, null: false, foreign_key: { to_table: :likes }
      t.references :matchee, null: false, foreign_key: { to_table: :likes }

      t.timestamps
    end
  end
end
