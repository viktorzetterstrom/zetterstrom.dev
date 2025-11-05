#!/bin/bash

# Check if Caddy is installed
CADDY_INSTALLED=false
CADDY_STARTED=false

if command -v caddy &> /dev/null; then
  CADDY_INSTALLED=true
fi

# Start all development servers in parallel
echo "Starting local development servers..."
echo ""

# Start Caddy if installed and not already running
if [ "$CADDY_INSTALLED" = true ]; then
  if pgrep -x "caddy" > /dev/null; then
    echo "✓ Caddy already running - local domains enabled"
  else
    echo "✓ Starting Caddy - local domains enabled"
    caddy run > /dev/null 2>&1 &
    CADDY_STARTED=true
    sleep 1  # Give Caddy a moment to start
  fi
  echo ""
  echo "  Index:   http://localhost:3000  |  https://local.zetterstrom.dev"
  echo "  Recipes: http://localhost:3001  |  https://local.recipes.zetterstrom.dev"
  echo "  Movies:  http://localhost:3002  |  https://local.movies.zetterstrom.dev"
  echo "  Stava:   http://localhost:3003  |  https://local.stava.zetterstrom.dev"
  echo "  WDNG:    http://localhost:3004  |  https://local.wdng.zetterstrom.dev"
else
  echo "  Index:   http://localhost:3000"
  echo "  Recipes: http://localhost:3001"
  echo "  Movies:  http://localhost:3002"
  echo "  Stava:   http://localhost:3003"
  echo "  WDNG:    http://localhost:3004"
  echo ""
  echo "💡 Tip: Install Caddy for local domain support (brew install caddy)"
fi

echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to cleanup background processes on exit
cleanup() {
  echo ""
  echo "Shutting down all servers..."

  # Kill Caddy if we started it
  if [ "$CADDY_STARTED" = true ]; then
    pkill -P $$ caddy 2>/dev/null
  fi

  kill $(jobs -p) 2>/dev/null
  exit
}

trap cleanup SIGINT SIGTERM

# Start each service in the background
pnpm --filter index dev &
pnpm --filter movies dev &
pnpm --filter client dev &
pnpm --filter stava dev &
pnpm --filter wdng dev &

# Wait for all background processes
wait