defmodule Apiproject.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :Apiproject,
  module: Apiproject.Guardian,
  error_handler: Apiproject.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
