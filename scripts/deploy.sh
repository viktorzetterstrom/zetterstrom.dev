#!/bin/bash

set -e

echo "=== Deploying to DigitalOcean Kubernetes cluster ==="
echo ""

echo "Step 2: Deploying application resources..."
kubectl apply -f k8s/namespace.yaml
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