class BracketEntry < ApplicationRecord
  belongs_to :bracket
  belongs_to :player1, class_name: "Player", optional: true
  belongs_to :player2, class_name: "Player", optional: true
  belongs_to :predicted_winner, class_name: "Player", optional: true

  scope :first_round, -> { where(round: "First Round") }
  scope :second_round, -> { where(round: "Second Round") }
  # Quarter Finals, Semi Finals, and Finals
  scope :quarter_final, -> { where(round: "Quarter Finals") }
  scope :semi_final, -> { where(round: "Semi Finals") }
  scope :final, -> { where(round: "Final") }
  scope :winner, -> { where(round: "Winner") }

  def parent_bracket
    BracketEntry.where(previous_entry1_id: id).or(BracketEntry.where(previous_entry2_id: id)).first
  end

  def self.top_predicted_winners
    BracketEntry.winner.where.not(player1_id: nil)
          .group(:player1_id, "players.name")
          .joins(:player1)
          .select("player1_id, players.name, COUNT(bracket_entries.id) AS entries_count")
          .order("entries_count DESC")
  end
end
