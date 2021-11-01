defmodule ApiprojectWeb.ClockController do
  use ApiprojectWeb, :controller

  alias Apiproject.Clocks
  alias Apiproject.Clocks.Clock

  action_fallback ApiprojectWeb.FallbackController


  def index(conn, _params) do
    clocks = Clocks.list_clocks()
    render(conn, "index.json", clocks: clocks)
  end

  def showAll(conn, %{"userID" => userId}) do
    clock = Clocks.getAllClockByUser(userId)
    render(conn, "index.json", clocks: clock)
  end

  def create(conn, %{"userID" => userId, "time" => time, "status" => status}) do
    with {:ok, %Clock{} = clock} <- Clocks.create_clock(%{"userId" => userId, "time" => time, "status" => status}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.clock_path(conn, :show, clock))
      |> render("show.json", clock: clock)
    end
  end

  def show(conn, %{"id" => id}) do
    clock = Clocks.get_clock!(id)
    render(conn, "show.json", clock: clock)
  end


end
