#!/bin/bash

set -e

TAG=${1:-latest}

echo "Building and pushing images with tag: $TAG"

# Build and push index service
echo "Building index service..."
docker build -t viktorzetterstrom/index-zetterstrom-dev:$TAG -f packages/index/Dockerfile packages/index
docker push viktorzetterstrom/index-zetterstrom-dev:$TAG

# Build and push movies service
echo "Building movies service..."
docker build -t viktorzetterstrom/movies-zetterstrom-dev:$TAG -f packages/movies/Dockerfile .
docker push viktorzetterstrom/movies-zetterstrom-dev:$TAG

# Build and push recipes service
echo "Building recipes service..."
docker build -t viktorzetterstrom/recipes-zetterstrom-dev:$TAG -f packages/recipes/Dockerfile .
docker push viktorzetterstrom/recipes-zetterstrom-dev:$TAG

echo "All images built and pushed successfully with tag: $TAG"