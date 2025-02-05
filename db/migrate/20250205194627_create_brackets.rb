class CreateBrackets < ActiveRecord::Migration[8.0]
  def change
    create_table :brackets do |t|
      t.string :email

      t.timestamps
    end
  end
end
