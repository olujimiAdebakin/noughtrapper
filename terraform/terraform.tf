terraform {
  backend "s3" {
    encrypt = true
    bucket  = "noughttrapper-tf-state-bucket"
    key     = "frontend/noughttrapper.tfstate"
    region  = "us-east-1"
    # profile        = "default"
  }
}