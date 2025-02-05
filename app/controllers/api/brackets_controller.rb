class Api::BracketsController < ApplicationController
  def create
  end

  def show
    @bracket = Bracket.find(params[:id]).as_json(include: :bracket_entries)

    render json: @bracket
  end
end
