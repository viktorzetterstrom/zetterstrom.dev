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

output "node_public_ip" {
  description = "The public IP address of the cluster node"
  value       = data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address
}

output "dns_records" {
  description = "DNS records configured"
  value = {
    root    = "${var.domain} -> ${data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address}"
    movies  = "movies.${var.domain} -> ${data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address}"
    recipes = "recipes.${var.domain} -> ${data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address}"
  }
}

output "next_steps" {
  description = "Next steps after infrastructure is created"
  value = <<-EOT
    Infrastructure created successfully!
  EOT
}