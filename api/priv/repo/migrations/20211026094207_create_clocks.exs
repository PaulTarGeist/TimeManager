defmodule Apiproject.Repo.Migrations.CreateClocks do
  use Ecto.Migration

  def change do
    create table(:clocks) do
      add :time, :utc_datetime, null: false
      add :status, :string, null: false
      add :user, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:clocks, [:user])
  end
end
