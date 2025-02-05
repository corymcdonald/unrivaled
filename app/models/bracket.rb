class Bracket < ApplicationRecord
  has_many :bracket_entries

  def initial_entries
    bracket_entries.where(round: "initial")
  end
end
