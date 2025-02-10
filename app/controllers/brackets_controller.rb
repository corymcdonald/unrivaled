class BracketsController < ApplicationController
  before_action :authorize_user!, only: %i[ update ]


  def index
  end

  def new
    @bracket = Bracket.new
    @bracket.user_identifier = current_user_identifier
    @bracket.save
    @bracket.initial_entries

    redirect_to bracket_path(@bracket)
  end

  def show
    @bracket = Bracket.find(params[:id])
  end

  def update
    @bracket = Bracket.find(params[:id])

    bracket_entries = @bracket.bracket_entries
    entries_to_update = bracket_params[:bracket_entries]

    entries_to_update.each do |entry|
      bracket_entry = bracket_entries.find { |be| be.id == entry[:id] }

      bracket_entry&.update(
        player1_id: entry.dig(:player1, :id),
        player2_id: entry.dig(:player2, :id),
        predicted_winner_id: entry.dig(:predicted_winner, :id)
      )
    end

    render json: { success: true }
  end

  private

  def bracket_params
    params.require(:bracket).permit(:id, bracket_entries: [ :id, :round, :actual_winner_id, :previous_entry1_id, :previous_entry2_id, :parent_bracket_id,   predicted_winner: {}, player1: {}, player2: {}  ])
  end

  def authorize_user!
    @bracket = Bracket.find(params[:id])
    unless @bracket.user_identifier == current_user_identifier
      redirect_to root_path, alert: "You are not authorized to modify this record."
    end
  end
end
