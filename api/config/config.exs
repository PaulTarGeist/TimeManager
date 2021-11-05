# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :apiproject,
  ecto_repos: [Apiproject.Repo]

# Configures the endpoint
config :apiproject, ApiprojectWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "eOK9ksLos+qzKeKw44JBZqeOuyZJyFo+9x94i2Q8hyu/rI4Xzcohh7Lm5PZAnFwC",
  render_errors: [view: ApiprojectWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Apiproject.PubSub,
  live_view: [signing_salt: "iiOgQwoB"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason


# Guardian config
config :apiproject, Apiproject.Guardian,
       issuer: "myApiProject",
       secret_key: "uMNyPIibc1tdwgPgXrehlsIb36NroveT8jX6a+jKNc6x7XQOtvvDncvG4GgyRmJm"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
