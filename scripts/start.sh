#!/bin/bash

# Start all development servers in parallel
echo "Starting local development servers..."
echo ""
echo "  Index:   http://localhost:3000  |  http://local.zetterstrom.dev"
echo "  Recipes: http://localhost:3001  |  http://local.recipes.zetterstrom.dev"
echo "  Movies:  http://localhost:3002  |  http://local.movies.zetterstrom.dev"
echo "  Stava:   http://localhost:3003  |  http://local.stava.zetterstrom.dev"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup background processes on exit
cleanup() {
  echo ""
  echo "Shutting down all servers..."
  kill $(jobs -p) 2>/dev/null
  exit
}

trap cleanup SIGINT SIGTERM

# Start each service in the background
pnpm --filter index dev &
pnpm --filter scraper dev &
pnpm --filter client dev &
pnpm --filter stava dev &

# Wait for all background processes
wait