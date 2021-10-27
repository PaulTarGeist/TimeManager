defmodule Apiproject.ClocksFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Apiproject.Clocks` context.
  """

  @doc """
  Generate a clock.
  """
  def clock_fixture(attrs \\ %{}) do
    {:ok, clock} =
      attrs
      |> Enum.into(%{
        status: "some status",
        time: "some time"
      })
      |> Apiproject.Clocks.create_clock()

    clock
  end
end
