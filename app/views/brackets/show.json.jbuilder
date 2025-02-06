
json.(@bracket, :created_at, :updated_at)

json.read_only @bracket.user_identifier != cookies.signed[:user_identifier]

json.entries @bracket.bracket_entries.order(id: :asc)  do |entry|
  json.(entry, :id, :round, :actual_winner_id, :previous_entry1_id, :previous_entry2_id)


  json.parent_bracket_id entry.parent_bracket&.id

  json.predicted_winner do
    json.partial! "player", player: entry.predicted_winner
  end

  json.player1 do
    json.partial! "player", player: entry.player1
  end
  json.player2 do
    json.partial! "player", player: entry.player2
  end
end

json.players Player.all do |player|
end
