
# variable "s3_bucket" {
#   type = string
# }
# variable "bucket_regional_domain_name" {
#   type = string
# }

variable "WEBAPP_CERT" {
    type = string
    default = "e31d389d-eea1-404a-abef-b82774019159"
}
variable "WEBAPP_CERT_ARN" {
    type = string
    default = "arn:aws:acm:us-east-1:396608792235:certificate/e31d389d-eea1-404a-abef-b82774019159"
}

variable "domain" {
  
}
variable "amplify_domain" {
  
}