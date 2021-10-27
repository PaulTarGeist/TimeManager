defmodule ApiprojectWeb.PageController do
  use ApiprojectWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
