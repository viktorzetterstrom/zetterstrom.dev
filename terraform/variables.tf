variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "fra1"
}

variable "k8s_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.33.1-do.5"
}