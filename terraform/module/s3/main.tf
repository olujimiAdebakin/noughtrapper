resource "aws_s3_bucket" "noughttrapper" {
  bucket = var.bucket_name

  tags = {
    Name = "${var.project}-${var.environment}-bucket"

  }
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "versioning_example" {
  bucket = aws_s3_bucket.noughttrapper.id
  versioning_configuration {
    status = "Enabled"
  }
}

#  resource "aws_s3_bucket_acl" "bucket_acl" {
#      bucket = var.bucket_name
#      acl    = "public-read"
#  }

resource "aws_s3_bucket_public_access_block" "m-trend-app-public_access" {
    bucket = aws_s3_bucket.noughttrapper.id
    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
}

module "template_files" {
   source = "hashicorp/dir/template"
   base_dir = "${path.module}/public"
 }


resource "aws_s3_bucket_policy" "bucket_policy" {
    bucket = var.bucket_name
    policy = jsonencode({
         "Version": "2012-10-17",
         "Statement": [
            {
                "Sid": "Statement1",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:*",
                "Resource": "arn:aws:s3:::${var.bucket_name}/*"
            },
            {
                "Effect": "Allow",
                "Principal": {
                  "Service": "cloudfront.amazonaws.com"
                },
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::${var.bucket_name}/*",
                "Condition": {
                  "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::${var.ACCOUNTID}:distribution/*"
                  }
                }
              }
        ]
    })
}


resource "aws_s3_bucket_website_configuration" "bucket_hosting_config" {
    bucket = var.bucket_name
  index_document {
    suffix = "index.html"
  }
}


###===========================================================
# Don't use this yet..
###===========================================================
# //files to be sent to the s3 bucket
# resource "aws_s3_object" "blog-frontend" {
#     bucket = aws_s3_bucket.m-trend-app.id

#     //Takes all files from build
#     for_each = module.blog-frontend.files
#     key    = each.key
#     source = each.value.source_path

#     content_type = each.value.content_type

#     content = each.value.content

    # The filemd5() function is available in Terraform 0.11.12 and later
    # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
    # etag = "${md5(file("path/to/file"))}"
   # etag = each.value.digests.md5
#}



