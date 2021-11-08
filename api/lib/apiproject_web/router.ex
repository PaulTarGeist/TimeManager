defmodule ApiprojectWeb.Router do
  use ApiprojectWeb, :router
  alias Apiproject.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {ApiprojectWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  # Other scopes may use custom stacks.
  scope "/api", ApiprojectWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    post "/sign_up", UserController, :create
    post "/sign_in", UserController, :sign_in
    resources "/teams", TeamController, except: [:new, :edit]
    scope "/teams" do
      put "/:team/addUserToTeam", UserController, :addUserToTeam
    end
    # resources "/clocks", ClockController, except: [:new, :edit]

    # resources "/workingtimes", WorkingtimeController, only: [:show, :update, :delete]
    # get "/workingtimes/:userID", WorkingtimeController, :showByUser
    # post "/workingtimes/:userID", WorkingtimeController, :createByUser

  end

  scope "/api", ApiprojectWeb do
    pipe_through [:api, :jwt_authenticated]

    get "/my_user", UserController, :show
    get "/logout", UserController, :logout
    scope "/clocks" do
      get "/:userID", ClockController, :showAll
      post "/:userID", ClockController, :create
      get "/:id", ClockController, :show
    end
    scope "/workingtimes" do
      get "/:userID", WorkingtimeController, :showAll
      post "/:userID", WorkingtimeController, :create
      get "/:id", WorkingtimeController, :show
      get "/:userID/:id", WorkingtimeController, :show
      put "/:id", WorkingtimeController, :update
      delete "/:id", WorkingtimeController, :delete
    end
  end
end
