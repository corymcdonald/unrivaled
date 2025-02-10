class AddIsOutToPlayer < ActiveRecord::Migration[8.0]
  def change
    add_column :players, :is_out, :boolean, default: false
  end
end
