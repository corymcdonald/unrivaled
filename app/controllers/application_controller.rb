class ApplicationController < ActionController::Base
  before_action :set_user_identifier

  private

  def set_user_identifier
    cookies.signed[:user_identifier] ||= SecureRandom.uuid
  end

  def current_user_identifier
    cookies.signed[:user_identifier]
  end

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  after_action :set_csrf_cookie

  #
  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = {
      value: form_authenticity_token,
      secure: true,
      same_site: :strict
      # domain: 'life-lister.herokuapp.com'
    }
  end
end
