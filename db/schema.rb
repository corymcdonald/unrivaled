# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_06_182231) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bracket_entries", force: :cascade do |t|
    t.bigint "bracket_id", null: false
    t.string "round"
    t.integer "player1_id"
    t.integer "player2_id"
    t.integer "predicted_winner_id"
    t.integer "actual_winner_id"
    t.integer "previous_entry1_id"
    t.integer "previous_entry2_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "brackets", force: :cascade do |t|
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_identifier"
  end

  create_table "players", force: :cascade do |t|
    t.string "name"
    t.string "team"
    t.string "team_link"
    t.string "external_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "rank"
  end
end
