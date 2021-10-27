defmodule Apiproject.Repo do
  use Ecto.Repo,
    otp_app: :apiproject,
    adapter: Ecto.Adapters.Postgres
end
