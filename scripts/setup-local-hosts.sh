#!/bin/bash

# Script to add local development domains to /etc/hosts

HOSTS=(
  "local.zetterstrom.dev"
  "local.movies.zetterstrom.dev"
  "local.recipes.zetterstrom.dev"
  "local.stava.zetterstrom.dev"
  "local.wdng.zetterstrom.dev"
)

echo "Setting up local development domains in /etc/hosts..."
echo ""

for host in "${HOSTS[@]}"; do
  if grep -q "$host" /etc/hosts; then
    echo "✓ $host already exists in /etc/hosts"
  else
    echo "Adding $host to /etc/hosts..."
    echo "127.0.0.1 $host" | sudo tee -a /etc/hosts > /dev/null
    echo "✓ Added $host"
  fi
done

echo ""
echo "Done! Current /etc/hosts entries for zetterstrom.dev:"
grep "zetterstrom.dev" /etc/hosts
