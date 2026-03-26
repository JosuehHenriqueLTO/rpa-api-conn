#!/bin/sh

echo "Collect static..."
python manage.py collectstatic --noinput

echo "Migrations..."
python manage.py migrate --noinput

echo "Starting server..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3