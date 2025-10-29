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