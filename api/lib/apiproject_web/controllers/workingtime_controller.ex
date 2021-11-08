defmodule ApiprojectWeb.WorkingtimeController do
  require Logger
  use ApiprojectWeb, :controller

  alias Apiproject.Workingtimes
  alias Apiproject.Workingtimes.Workingtime

  action_fallback ApiprojectWeb.FallbackController

  # def index(conn,  %{"userId" => userId, "start" => startDate, "end" => endDate}) do
  #   workingtime = Workingtimes.get_user_by_userId_startDate_endDate!(userId, startDate, endDate)
  #   render(conn, "show.json", workingtime: workingtime)
  # end

  def index(conn, _params) do
    workingtimes = Workingtimes.list_workingtimes()
    render(conn, "index.json", workingtimes: workingtimes)
  end
  def show(conn, %{"id" => id}) do
    workingtime = Workingtimes.get_workingtime!(id)
    render(conn, "show.json", workingtime: workingtime)
  end

  def showAll(conn, %{"userID" => userId, "start" => start, "end" => ended}) do
    Logger.warn(Timex.parse!(start, "{YYYY}-{0M}-{0D} {h24}:{m}:{s}"))
    workingtime = Workingtimes.get_workingtimeAll!(Timex.parse!(start,"{YYYY}-{0M}-{0D} {h24}:{m}:{s}"), Timex.parse!(ended,"{YYYY}-{0M}-{0D} {h24}:{m}:{s}"), userId)
    render(conn, "index.json", workingtimes: workingtime)
  end


  def update(conn, %{"id" => id, "end" => ended, "start" => start}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.update_workingtime(workingtime, %{"end" => ended, "start" => start}) do
      render(conn, "show.json", workingtime: workingtime)
    end
  end

  # def showByUser(conn, %{"userId" => userId, "start" => startDate, "end" => endDate}) do
  #   workingtime = Workingtimes.getWorkingtimeByUser!(userId, startDate, endDate)
  #   render(conn, "show.json", workingtime: workingtime)
  # end

    # @spec create(any, map) :: any
  def create(conn, %{"userID" => userId, "end" => ended, "start" => start}) do
    with {:ok, %Workingtime{} = workingtime} <- Workingtimes.create_workingtime(%{"userId" => userId, "end" => ended, "start" => start}) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.workingtime_path(conn, :show, workingtime))
      |> render("show.json", workingtime: workingtime)
    end
  end

  def delete(conn, %{"id" => id}) do
    workingtime = Workingtimes.get_workingtime!(id)

    with {:ok, %Workingtime{}} <- Workingtimes.delete_workingtime(workingtime) do
      send_resp(conn, :no_content, "")
    end
  end
end
