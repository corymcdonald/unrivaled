class AddRankToPlayer < ActiveRecord::Migration[8.0]
  def change
    add_column :players, :rank, :string
  end
end
