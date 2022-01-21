class AddLatToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :lat, :numeric, precision: 10
  end
end
