#!/bin/bash

# Script to generate local TLS certificates for development
# Requires mkcert: brew install mkcert

echo "Generating local TLS certificates..."
echo ""

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
  echo "❌ mkcert is not installed"
  echo ""
  echo "Install with: brew install mkcert"
  echo ""
  exit 1
fi

# Install local CA if not already installed
echo "Installing local CA..."
mkcert -install

# Create certs directory if it doesn't exist
mkdir -p .local-tls-certs

# Generate certificate for all local domains
echo ""
echo "Generating certificate for local domains..."
cd .local-tls-certs

mkcert \
  "local.zetterstrom.dev" \
  "local.recipes.zetterstrom.dev" \
  "local.movies.zetterstrom.dev" \
  "local.stava.zetterstrom.dev"

echo ""
echo "✓ Certificates generated in .local-tls-certs/"
echo ""
echo "Generated files:"
ls -lh

cd ..
