defmodule Apiproject.Repo.Migrations.CreateClocks do
  use Ecto.Migration

  def change do
    create table(:clocks) do
      add :time, :naive_datetime, null: false
      add :status, :boolean, null: false
      add :userId, references(:users), null: false

      timestamps()
    end
  end
end
