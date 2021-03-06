defmodule Apiproject.UsersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Apiproject.Users` context.
  """

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: "some email",
        username: "some username"
      })
      |> Apiproject.Users.create_user()

    user
  end
end
