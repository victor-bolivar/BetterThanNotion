#!/bin/bash

# Exit on any error
set -e

# Check if Docker is installed
echo "Checking if Docker is installed..."
if docker --help >/dev/null 2>&1; [ $? -eq 1 ]; then
  echo "Error: Docker is not installed. Please install Docker and try again."
  exit 1
fi
echo "Docker is installed."

# Launch MongoDB using Docker
MONGO_CONTAINER_NAME="mongodb-container"
MONGO_IMAGE="mongo:7.0.0-jammy"
MONGO_PORT=27017
MONGO_USERNAME=mongoadmin
MONGO_PASSWD=secret

echo "Starting MongoDB Docker container..."
docker run -d --rm --name $MONGO_CONTAINER_NAME -p $MONGO_PORT:27017 -e MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME -e MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWD $MONGO_IMAGE 

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start..."
while ! nc -z localhost $MONGO_PORT; do
  sleep 0.5
done
echo "MongoDB is running on port $MONGO_PORT"

# Create .env
echo "VITE_API_BASE_URL=http://localhost:3000" > ./frontend/.env
echo "MONGODB_URI=\"mongodb://$MONGO_USERNAME:$MONGO_PASSWD@localhost/?retryWrites=true&w=majority\"" > ./backend/.env

# handle exit script
cleanup(){
   echo ""
   echo "CTRL+C pressed, clean up things before exiting..."
   docker stop $MONGO_CONTAINER_NAME
   exit 1
 }
# Trap the SIGINT signal (Ctrl+C)
trap cleanup SIGINT

# Install dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Run backend and frontend in parallel using "concurrently"
npm start

