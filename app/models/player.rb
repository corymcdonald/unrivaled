class Player < ApplicationRecord
  def first_name
    return ""  if name == "BYE"

    # Split the name on the space character and return all elements except the last one
    name.split(" ")[0..-2].join(" ")
  end
  def last_name
    # Split the name on the space character and return the last element
    name.split(" ").last
  end

  def self.bye
    # Find the Player with the name "BYE"
    find_by(name: "BYE")
  end
  def bye?
    name == "BYE"
  end
end
