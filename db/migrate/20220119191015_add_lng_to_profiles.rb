class AddLngToProfiles < ActiveRecord::Migration[6.1]
  def change
    add_column :profiles, :lng, :numeric, precision: 10
  end
end
