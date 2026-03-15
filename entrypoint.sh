#!/bin/sh
set -e

if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "Running database migrations..."
  npx prisma migrate deploy
else
  echo "Skipping migrations..."
fi

echo "Starting application..."
exec "$@"