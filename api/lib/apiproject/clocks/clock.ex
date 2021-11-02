defmodule Apiproject.Clocks.Clock do
  use Ecto.Schema
  import Ecto.Changeset

  schema "clocks" do
    field :status, :boolean
    field :time, :naive_datetime
    belongs_to :user, Apiproject.Users.User, foreign_key: :userId

    timestamps()
  end

  @doc false
  def changeset(clock, attrs) do
    clock
    |> cast(attrs, [:time, :status, :userId])
    |> validate_required([:time, :status, :userId])
  end
end
