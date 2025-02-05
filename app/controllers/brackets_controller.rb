class BracketsController < ApplicationController
  def index
  end

  def show
    @bracket = Bracket.find(params[:id])
  end
end
