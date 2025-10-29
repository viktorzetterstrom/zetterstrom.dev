#!/bin/bash

set -e

echo "=== Deploying to DigitalOcean Kubernetes cluster ==="
echo ""

echo "Step 1: Checking cert-manager is ready..."
if ! kubectl get namespace cert-manager &> /dev/null; then
  echo "  ⚠️  cert-manager namespace not found. Make sure Terraform has been applied first."
  exit 1
fi

echo "  Waiting for cert-manager to be ready..."
kubectl wait --namespace cert-manager \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/instance=cert-manager \
  --timeout=120s

echo "  ✓ cert-manager is ready"
echo ""

echo "Step 2: Deploying application resources..."
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/cluster-issuer.yaml
kubectl apply -f k8s/index-depl.yaml
kubectl apply -f k8s/movies-depl.yaml
kubectl apply -f k8s/recipes-depl.yaml
kubectl apply -f k8s/ingress-srv.yaml
echo ""

echo "=== Deployment complete! ==="
echo ""
echo "Check deployment status:"
echo "  kubectl get pods -n zetterstrom"
echo "  kubectl get services -n zetterstrom"
echo "  kubectl get ingress -n zetterstrom"
echo ""
echo "Get NGINX Ingress external IP (for DNS):"
echo "  kubectl get svc -n ingress-nginx"