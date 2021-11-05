defmodule ApiprojectWeb.UserController do
  use ApiprojectWeb, :controller

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

  def logout(conn, %{"user" => user_params}) do {
    with {:ok, _claims} <- Apiproject.Guardian.revoke(token) do

    end
  end
  }

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Users.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
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

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
