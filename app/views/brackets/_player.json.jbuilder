if player.present?
  json.(player, :id)
  json.first_name player.first_name
  json.last_name player.last_name
  unless player.bye?
    json.image image_url("players_transparent/#{player.id}.png")
  end
end
