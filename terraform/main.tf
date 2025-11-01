terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.67"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.38"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 3.0"
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
  kubernetes = {
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

resource "helm_release" "nginx_ingress" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  version          = "4.11.1"
  namespace        = "ingress-nginx"
  create_namespace = true

  set = [
    {
      name  = "controller.service.type"
      value = "NodePort"
    },
    {
      name  = "controller.service.nodePorts.http"
      value = "30080"
    },
    {
      name  = "controller.service.nodePorts.https"
      value = "30443"
    },
    {
      name  = "controller.hostPort.enabled"
      value = "true"
    },
    {
      name  = "controller.hostPort.ports.http"
      value = "80"
    },
    {
      name  = "controller.hostPort.ports.https"
      value = "443"
    },
    {
      name  = "controller.hostNetwork"
      value = "true"
    }
  ]

  depends_on = [digitalocean_kubernetes_cluster.zetterstrom]
}

resource "helm_release" "cert_manager" {
  name             = "cert-manager"
  repository       = "https://charts.jetstack.io"
  chart            = "cert-manager"
  version          = "v1.15.1"
  namespace        = "cert-manager"
  create_namespace = true

  set = [
    {
      name  = "installCRDs"
      value = "true"
    }
  ]

  depends_on = [digitalocean_kubernetes_cluster.zetterstrom]
}

data "digitalocean_droplets" "cluster_nodes" {
  filter {
    key    = "tags"
    values = ["k8s:${digitalocean_kubernetes_cluster.zetterstrom.id}"]
  }

  depends_on = [
    digitalocean_kubernetes_cluster.zetterstrom,
    helm_release.nginx_ingress,
    helm_release.cert_manager
  ]
}

resource "digitalocean_domain" "main" {
  name = var.domain
}

resource "digitalocean_record" "root" {
  domain = digitalocean_domain.main.id
  type   = "A"
  name   = "@"
  value  = data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address
  ttl    = 300
}

resource "digitalocean_record" "movies" {
  domain = digitalocean_domain.main.id
  type   = "A"
  name   = "movies"
  value  = data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address
  ttl    = 300
}

resource "digitalocean_record" "recipes" {
  domain = digitalocean_domain.main.id
  type   = "A"
  name   = "recipes"
  value  = data.digitalocean_droplets.cluster_nodes.droplets[0].ipv4_address
  ttl    = 300
}

resource "digitalocean_firewall" "web" {
  name = "k8s-web-access-${digitalocean_kubernetes_cluster.zetterstrom.id}"

  tags = ["k8s:${digitalocean_kubernetes_cluster.zetterstrom.id}"]

  # HTTP access from anywhere
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # HTTPS access from anywhere
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allow all outbound traffic
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}