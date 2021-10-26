# ApiProject

## Requirements

  * PostgreSql (default owner "postgres", default password "postgres")
  * Elixir
  * Phoenix
  * Terminal access
  * Git access to clone the project
  * Postman

### Launch API Server

To start, clone the git project.
To start your Phoenix server, type commands below in a terminal from the project directory you cloned before:

  * Install dependencies with `mix deps.get`. In case of errors, you can try this:
    * `mix deps.unlock --all`
    * `mix deps.update --all`
  * Create and migrate your database with `mix ecto.setup`
  * Start Phoenix endpoints with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### How To Use

  * To have the list of available routes, just go to http://localhost:4000/api
  * You can use Postman application and import API Collection file to have all routes (you can find the collection in the root directory of the project: API.postman_collection.json) or your browser directly for GET requests.

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
