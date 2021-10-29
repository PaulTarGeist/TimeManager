defmodule Apiproject.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :username, :string
    has_many :workingtime, Apiproject.Workingtimes.Workingtime
    has_many :clock, Apiproject.Clocks.Clock

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :email])
    |> validate_required([:username, :email])
    |> validate_format(:email, ~r/(.*?)\@\w+\.\w+/)
  end
end
