class CreateBracketEntries < ActiveRecord::Migration[8.0]
  def change
    create_table :bracket_entries do |t|
      t.bigint :bracket_id, null: false
      t.string :round

      t.integer :player1_id, null: false
      t.integer :player2_id, null: false
      t.integer :predicted_winner_id
      t.integer :actual_winner_id

      t.integer :previous_entry1_id
      t.integer :previous_entry2_id

      t.timestamps
    end
  end
end
