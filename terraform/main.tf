locals {
  RESOURCES_PREFIX = "${lower(var.ENV)}-noughttrapper"
  ACCOUNTID        = data.aws_caller_identity.current.account_id
  INFO_EMAIL       = "info@noughtrapper.com"
  DOMAIN_NAME       = "noughtrapper.com"


  common_tags = {
    environment = var.ENV
    project     = "noughtrapper"
    managedby   = "cloud@noughtrapper.com"
  }
}

module "s3" {
  source           = "./module/s3"
  ACCOUNTID     = local.ACCOUNTID

  }



#   module "cloudfront" {
#   source                      = "./module/cloudfront"
#   amplify_domain          = module.amplify.amplify_domain
#   domain =       local.DOMAIN_NAME
# }

# module "amplify" {
#   source = "./module/amplify"
#   domain = local.DOMAIN_NAME
#   region = data.aws_region.current.name
#   ACCOUNTID     = local.ACCOUNTID
#   RESOURCES_PREFIX = local.RESOURCES_PREFIX
# }

# module "ses" {
#   source             = "./module/ses"
#   domain             = "example.com"
#   region             = "us-east-1"
#   route53_zone_id    = "Z1234567890"
#   create_dns_records = true
# }