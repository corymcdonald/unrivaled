class BracketEntry < ApplicationRecord
  belongs_to :bracket
  belongs_to :player1
  belongs_to :player2
  belongs_to :predicted_winner
end
