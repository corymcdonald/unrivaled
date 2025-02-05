class CreatePlayers < ActiveRecord::Migration[8.0]
  def change
    create_table :players do |t|
      t.string :name
      t.string :team
      t.string :team_link
      t.string :external_link

      t.timestamps
    end
  end
end
