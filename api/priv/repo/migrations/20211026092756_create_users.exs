defmodule Apiproject.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string, null: false
      add :email, :string, null: false
      add :password_hash, :string, null: true
      add :role, :string
      add :team, :integer

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
