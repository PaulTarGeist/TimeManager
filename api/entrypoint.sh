# entrypoint.sh

#!/bin/bash
# Docker entrypoint script.

if [ -f ".env" ]; then
    echo "$FILE exists."
else
    echo "$FILE does not exist."
    exit 1
fi

# Wait until Postgres is ready
echo "TEST ENTRYPOINT"
while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $PGDATABASE"` ]]; then
  echo "Database $PGDATABASE does not exist. Creating..."
  createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "Database $PGDATABASE created."
fi

exec mix phx.server