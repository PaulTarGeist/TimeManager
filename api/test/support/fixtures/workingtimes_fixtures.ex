defmodule Apiproject.WorkingtimesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Apiproject.Workingtimes` context.
  """

  @doc """
  Generate a workingtime.
  """
  def workingtime_fixture(attrs \\ %{}) do
    {:ok, workingtime} =
      attrs
      |> Enum.into(%{
        end: "some end",
        start: "some start"
      })
      |> Apiproject.Workingtimes.create_workingtime()

    workingtime
  end
end
