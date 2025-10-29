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

## Step 1: Create the Kubernetes Cluster with Terraform

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
   k8s_version = "1.31.1-do.4"  # check latest: doctl kubernetes options versions
   ```

4. Initialize and apply Terraform:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

   This will create:
   - A 1-node Kubernetes cluster (s-2vcpu-2gb, ~$12/month)
   - Outputs with cluster information

5. Get the kubeconfig:
   ```bash
   doctl kubernetes cluster kubeconfig save <cluster-id>
   ```
   (The cluster ID will be shown in Terraform outputs)

## Step 2: Install NGINX Ingress Controller

The cluster needs an ingress controller to route traffic:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.1/deploy/static/provider/do/deploy.yaml
```

Wait for the load balancer to be created:
```bash
kubectl get svc -n ingress-nginx
```

Note the EXTERNAL-IP - you'll need to point your DNS to this IP.

## Step 3: Install cert-manager (Optional - for SSL)

For automatic SSL certificates with Let's Encrypt:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.15.1/cert-manager.yaml
```

Wait for cert-manager to be ready:
```bash
kubectl get pods -n cert-manager
```

Create a ClusterIssuer for Let's Encrypt (update with your email):
```bash
cat <<EOF | kubectl apply -f -
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@example.com
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
      - http01:
          ingress:
            class: nginx
EOF
```

Then update `k8s/ingress-srv.yaml` to add this annotation:
```yaml
annotations:
  cert-manager.io/cluster-issuer: "letsencrypt-prod"
```

## Step 4: Configure DNS

Point your domains to the ingress controller's external IP:

```
A Record: zetterstrom.dev -> <EXTERNAL-IP>
A Record: movies.zetterstrom.dev -> <EXTERNAL-IP>
A Record: recipes.zetterstrom.dev -> <EXTERNAL-IP>
```

## Step 5: Build and Push Docker Images

From the project root:

```bash
# Login to Docker Hub
docker login

# Build and push all images
./scripts/build-and-push.sh

# Or with a specific tag
./scripts/build-and-push.sh v1.0.0
```

## Step 6: Deploy to Kubernetes

```bash
./scripts/deploy.sh
```

This will apply all Kubernetes manifests to your cluster.

## Step 7: Verify Deployment

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

## Costs

- **Kubernetes Cluster**: ~$12/month (1 node, s-2vcpu-2gb)
- **Load Balancer** (for ingress): ~$12/month
- **Total**: ~$24/month

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