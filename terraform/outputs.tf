output "cluster_id" {
  description = "The ID of the Kubernetes cluster"
  value       = digitalocean_kubernetes_cluster.zetterstrom.id
}

output "cluster_endpoint" {
  description = "The endpoint of the Kubernetes cluster"
  value       = digitalocean_kubernetes_cluster.zetterstrom.endpoint
}

output "cluster_name" {
  description = "The name of the Kubernetes cluster"
  value       = digitalocean_kubernetes_cluster.zetterstrom.name
}

output "kubeconfig_command" {
  description = "Command to download kubeconfig"
  value       = "doctl kubernetes cluster kubeconfig save ${digitalocean_kubernetes_cluster.zetterstrom.id}"
}

output "node_public_ip_command" {
  description = "Command to get the node's public IP for DNS configuration"
  value       = "kubectl get nodes -o jsonpath='{.items[0].status.addresses[?(@.type==\"ExternalIP\")].address}'"
}

output "next_steps" {
  description = "Next steps after infrastructure is created"
  value = <<-EOT
    1. Get kubeconfig: doctl kubernetes cluster kubeconfig save ${digitalocean_kubernetes_cluster.zetterstrom.id}
    2. Get node public IP: kubectl get nodes -o wide
    3. Configure DNS A records pointing to the node's public IP:
       - zetterstrom.dev -> <NODE-IP>
       - movies.zetterstrom.dev -> <NODE-IP>
       - recipes.zetterstrom.dev -> <NODE-IP>
    4. Deploy application: ./scripts/deploy.sh

    Note: Using NodePort (no Load Balancer) - saves $12/month!
  EOT
}