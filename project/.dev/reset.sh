#!/bin/bash

echo "Stopping and removing containers..."
docker stop auth-db app-db
docker rm auth-db app-db

echo "Removing volumes..."
docker volume rm dev_pg-app-data dev_pg-auth-data

echo "Restarting containers..."
docker compose up -d auth-db app-db

echo "Reset complete!"
