provider "aws" {
  region = var.region
}

# 🔹 IAM Role for AWS Amplify
resource "aws_iam_role" "amplify_role" {
  name = "AmplifyServiceRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "amplify.amazonaws.com"
      }
    }]
  })
}

# 🔹 AWS Amplify App
resource "aws_amplify_app" "nextjs_app" {
  name       = "${var.RESOURCES_PREFIX}-app"
  repository = "https://github.com/Spinstudio8/Noughttrapper"  # Update with your GitHub repo URL
  oauth_token = var.oauth_token
  platform = "WEB"

#   build_spec = jsonencode({
#     version = "1.0"
#     frontend = {
#       phases = {
#         preBuild = { commands = ["npm install"] }
#         build    = { commands = ["npm run build"] }
#       }
#       artifacts = {
#         baseDirectory = ".next"
#         files         = ["**/*"]
#       }
#       cache = { paths = ["node_modules/**/*"] }
#     }
#   })

  # build_spec = file("${path.root}/amplify.yml")
  iam_service_role_arn = aws_iam_role.amplify_role.arn

  environment_variables = {
    NODE_ENV = "production"
    API_GATEWAY_URL = "https://api.${var.domain}"  # Replace with your API Gateway URL if needed
  }
}

# 🔹 AWS Amplify Branch
resource "aws_amplify_branch" "main_branch" {
  app_id      = aws_amplify_app.nextjs_app.id
  branch_name = "main" 
}

# 🔹 AWS Amplify Custom Domain
resource "aws_amplify_domain_association" "custom_domain" {
  app_id      = aws_amplify_app.nextjs_app.id
  domain_name = var.domain 

  wait_for_verification = false

  certificate_settings {
    type = "CUSTOM"
    custom_certificate_arn = var.WEBAPP_CERT_ARN
  }

  sub_domain {
    branch_name = aws_amplify_branch.main_branch.branch_name
    prefix      = ""  # Root domain (e.g., yourdomain.com)
  }
  
}

# output "amplify_app_url" {
#   value = aws_amplify_app.nextjs_app.default_domain
# }

