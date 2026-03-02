# Production: remote Terraform state with locking.
# Advanced: prevents state corruption in team workflows.
terraform {
  backend "s3" {
    bucket         = "fullstack-learning-tf-state"
    key            = "env/prod/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-state-locks"
    encrypt        = true
  }
}
