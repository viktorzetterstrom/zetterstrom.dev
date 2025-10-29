terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
  required_version = ">= 1.0"
}

provider "digitalocean" {
  token = var.do_token
}

provider "kubernetes" {
  host  = digitalocean_kubernetes_cluster.zetterstrom.endpoint
  token = digitalocean_kubernetes_cluster.zetterstrom.kube_config[0].token
  cluster_ca_certificate = base64decode(
    digitalocean_kubernetes_cluster.zetterstrom.kube_config[0].cluster_ca_certificate
  )
}

provider "helm" {
  kubernetes {
    host  = digitalocean_kubernetes_cluster.zetterstrom.endpoint
    token = digitalocean_kubernetes_cluster.zetterstrom.kube_config[0].token
    cluster_ca_certificate = base64decode(
      digitalocean_kubernetes_cluster.zetterstrom.kube_config[0].cluster_ca_certificate
    )
  }
}

resource "digitalocean_kubernetes_cluster" "zetterstrom" {
  name    = "zetterstrom-dev"
  region  = var.region
  version = var.k8s_version

  node_pool {
    name       = "worker-pool"
    size       = "s-1vcpu-2gb"
    node_count = 1
    auto_scale = false
  }

  tags = ["zetterstrom-dev", "production"]
}