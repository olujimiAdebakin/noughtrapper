output "s3_bucket" {
  value = aws_s3_bucket.noughttrapper.id
}

output "bucket_regional_domain_name" {
  value = aws_s3_bucket.noughttrapper.bucket_regional_domain_name
}

output "files" {
  value = {
    "index.html" = {
      source_path  = "${path.module}/build/index.html"
      content_type = "text/html"
      content      = null
      digests = {
        md5 = "md5-hash-of-the-file"
      }
    }
    "style.css" = {
      source_path  = "${path.module}/build/style.css"
      content_type = "text/css"
      content      = null
      digests = {
        md5 = "md5-hash-of-the-file"
      }
    }
  }
}
