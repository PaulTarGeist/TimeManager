defmodule ApiprojectWeb.UserController do
  use ApiprojectWeb, :controller

  require Logger
  alias Apiproject.Users
  alias Apiproject.Users.User
  alias Apiproject.Guardian

  action_fallback ApiprojectWeb.FallbackController

  def index(conn,  %{"username" => username, "email" => email}) do
    user = Users.get_user_by_username_email!(username, email)
    render(conn, "show.json", user: user)
  end

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params),
         {:ok, token, claims} <- Guardian.encode_and_sign(user, %{cXsrfToken: Plug.CSRFProtection.get_csrf_token(), role: user.role}, ttl: {30, :days}) do
        conn |> render("jwt.json", jwt: token)
    end
  end

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case Users.token_sign_in(email, password) do
      {:ok, token, _claims} ->
        conn |> render("jwt.json", jwt: token)
      _ ->
        {:error, :unauthorized}
    end
  end

  def show(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    conn |> render("user.json", user: user)
 end

 def addUserToTeam(conn, %{"team" => team, "userId" => userId}) do
    user = Users.get_user!(userId)

    with {:ok, %User{} = user} <- Users.update_user(user, %{"team" => team}) do
      render(conn, "show.json", user: user)
    end
 end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def logout(conn, params) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke(jwt)
    send_resp(conn, :no_content, "")
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
