# Deployment Guide

This guide explains how to deploy zetterstrom.dev to DigitalOcean Kubernetes.

## Prerequisites

1. **DigitalOcean Account** with API token
2. **doctl CLI** - DigitalOcean command line tool
   ```bash
   brew install doctl
   doctl auth init
   ```
3. **Terraform** - Infrastructure as Code tool
   ```bash
   brew install terraform
   ```
4. **kubectl** - Kubernetes CLI
5. **Docker Hub account** - For pushing images (using existing `viktorzetterstrom` account)

## Step 1: Create Infrastructure with Terraform

Terraform will automatically create:
- Kubernetes cluster (1 node, s-1vcpu-2gb, ~$12/month)
- NGINX Ingress Controller (using NodePort - no extra cost!)
- cert-manager for automatic SSL certificates

1. Navigate to the terraform directory:
   ```bash
   cd terraform
   ```

2. Create your `terraform.tfvars` file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

3. Edit `terraform.tfvars` with your values:
   ```hcl
   do_token = "your-digitalocean-api-token"
   region   = "fra1"  # or your preferred region
   k8s_version = "1.33.1-do.5"  # check latest: doctl kubernetes options versions
   ```

4. Initialize and apply Terraform:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

5. Get the kubeconfig:
   ```bash
   doctl kubernetes cluster kubeconfig save <cluster-id>
   ```
   (The cluster ID will be shown in Terraform outputs)

6. Get your node's public IP:
   ```bash
   kubectl get nodes -o wide
   ```
   Look for the EXTERNAL-IP column.

## Step 2: Configure SSL Certificate Email

Before deploying, update the email address in `k8s/cluster-issuer.yaml`:

```yaml
email: your-email@example.com  # Replace with your actual email
```

This is required for Let's Encrypt certificate notifications.

## Step 3: Configure DNS

Point your domains to your node's public IP (from Step 1.6):

```
A Record: zetterstrom.dev -> <NODE-PUBLIC-IP>
A Record: movies.zetterstrom.dev -> <NODE-PUBLIC-IP>
A Record: recipes.zetterstrom.dev -> <NODE-PUBLIC-IP>
```

Wait for DNS propagation (can take a few minutes to hours).

## Step 4: Build and Push Docker Images

From the project root:

```bash
# Login to Docker Hub
docker login

# Build and push all images
./scripts/build-and-push.sh

# Or with a specific tag
./scripts/build-and-push.sh v1.0.0
```

## Step 5: Deploy to Kubernetes

```bash
./scripts/deploy.sh
```

This will apply all Kubernetes manifests to your cluster.

## Step 6: Verify Deployment

Check that everything is running:

```bash
# Check pods
kubectl get pods -n zetterstrom

# Check services
kubectl get services -n zetterstrom

# Check ingress
kubectl get ingress -n zetterstrom

# Check logs if needed
kubectl logs -n zetterstrom -l app=index
kubectl logs -n zetterstrom -l app=movies
kubectl logs -n zetterstrom -l app=recipes
```

## Updating the Application

1. Make your code changes
2. Build and push new images:
   ```bash
   ./scripts/build-and-push.sh v1.0.1
   ```
3. Update the image tags in the deployment files (or use `latest`)
4. Apply the changes:
   ```bash
   kubectl apply -f k8s/index-depl.yaml
   kubectl apply -f k8s/movies-depl.yaml
   kubectl apply -f k8s/recipes-depl.yaml
   ```
5. Or restart the deployments to pull new images:
   ```bash
   kubectl rollout restart deployment -n zetterstrom index-depl
   kubectl rollout restart deployment -n zetterstrom movies-depl
   kubectl rollout restart deployment -n zetterstrom recipes-depl
   ```


## Tearing Down

To destroy the infrastructure:

```bash
cd terraform
terraform destroy
```

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod -n zetterstrom <pod-name>
kubectl logs -n zetterstrom <pod-name>
```

### Ingress not working
```bash
kubectl describe ingress -n zetterstrom
kubectl get svc -n ingress-nginx
```

### SSL certificate not issuing
```bash
kubectl describe certificate -n zetterstrom
kubectl get certificaterequest -n zetterstrom
kubectl logs -n cert-manager -l app=cert-manager
```