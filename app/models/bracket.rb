class Bracket < ApplicationRecord
  has_many :bracket_entries

  validates :user_identifier, presence: true

  # after_initialize :initial_entries

  def initial_entries
    # bracket_entries.destroy_all
    # return if bracket_entries.present?

    first_round_entries = [
      [ Player.find_by(name: "Jewell Loyd"), Player.bye ],
      [ Player.find_by(name: "Rae Burrell"), Player.find_by(name: "Natasha Cloud") ],
      [ Player.find_by(name: "Alyssa Thomas"), Player.find_by(name: "Azurá Stevens") ],
      [ Player.find_by(name: "Chelsea Gray"), Player.find_by(name: "Shakira Austin") ],
      [ Player.find_by(name: "Napheesa Collier"), Player.find_by(name: "Katie Lou Samuelson") ],
      [ Player.find_by(name: "Jackie Young"), Player.find_by(name: "Rickea Jackson") ],
      [ Player.find_by(name: "Tiffany Hayes"), Player.find_by(name: "Courtney Williams") ],
      [ Player.find_by(name: "Rhyne Howard"), Player.find_by(name: "Lexie Hull") ],
      [ Player.find_by(name: "Breanna Stewart"), Player.find_by(name: "Aaliyah Edwards") ],
      [ Player.find_by(name: "Marina Mabrey"), Player.find_by(name: "Kate Martin") ],
      [ Player.find_by(name: "Allisha Gray"), Player.find_by(name: "Jordin Canada") ],
      [ Player.find_by(name: "Kahleah Copper"), Player.find_by(name: "Aliyah Boston") ],
      [ Player.find_by(name: "Arike Ogunbowale"), Player.bye ],
      [ Player.find_by(name: "Skylar Diggins-Smith"), Player.find_by(name: "Dearica Hamby") ],
      [ Player.find_by(name: "Satou Sabally"), Player.find_by(name: "Brittney Sykes") ],
      [ Player.find_by(name: "Kayla McBride"), Player.find_by(name: "DiJonai Carrington") ]
    ]



    first_round_entries.each do |entry|
      player1 = entry[0]
      player2 = entry[1]

      if player2.bye? || player2.is_out?
        winner = player1
      elsif player1.bye? || player1.is_out?
        winner = player2
      end

      if player1.is_out? && player2.is_out?
        winner = nil
      end


      bracket_entries << BracketEntry.new(
        round: "First Round",
        player1: player1,
        player2: player2,
        actual_winner_id: winner&.id
      )
    end

    # only one can progress, let's generate all empty entries for the Second Round, Quatrer Final, Semi Finals, and Finals
    bracket_entries.first_round.each_slice(2) do |entries|
      first_bracket = entries.first
      second_bracket = entries.second

      player1 = Player.find(first_bracket.actual_winner_id) if first_bracket.actual_winner_id.present?
      player2 = Player.find(second_bracket.actual_winner_id) if second_bracket.actual_winner_id.present?

      # if both of the players are out from either the first_bracket or the second_bracket, then move the first and second players from the bracket forward in the matchup
      if first_bracket.player1.is_out? && first_bracket.player2.is_out?
        player1 = second_bracket.player1
        player2 = second_bracket.player2
      elsif second_bracket.player1.is_out? && second_bracket.player2.is_out?
        player1 = first_bracket.player1
        player2 = first_bracket.player2
      end


      bracket_entries << BracketEntry.new(
        round: "Second Round",
        player1: player1,
        player2: player2,
        previous_entry1_id: entries.first.id,
        previous_entry2_id: entries.second&.id
      )
    end

    bracket_entries.second_round.each_slice(2) do |entries|
      bracket_entries << BracketEntry.new(
        round: "Quarter Finals",
        player1: nil,
        player2: nil,
        previous_entry1_id: entries.first.id,
        previous_entry2_id: entries.second&.id
      )
    end

    bracket_entries.quarter_final.each_slice(2) do |entries|
      bracket_entries << BracketEntry.new(
        round: "Semi Finals",
        player1: nil,
        player2: nil,
        previous_entry1_id: entries.first.id,
        previous_entry2_id: entries.second&.id
      )
    end

    bracket_entries.semi_final.each_slice(2) do |entries|
      bracket_entries <<  BracketEntry.new(
        round: "Final",
        player1: nil,
        player2: nil,
        previous_entry1_id: entries.first.id,
        previous_entry2_id: entries.second&.id
      )
    end

    bracket_entries.final.each_slice(2) do |entries|
      bracket_entries << BracketEntry.new(
        round: "Winner",
        player1: nil,
        player2: nil,
        previous_entry1_id: entries.first.id,
        previous_entry2_id: entries.second&.id
      )
    end


    bracket_entries
  end
end
