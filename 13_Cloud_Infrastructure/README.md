# Module 13: Cloud Infrastructure

## 1. Concept Overview
The "Cloud" is simply someone else's computer (AWS, Google Cloud, Azure) that you rent by the millisecond. It replaces the traditional model of buying physical server racks, ensuring power/cooling, and maintaining hardware. 

## 2. Theory from Scratch
- **IaaS (Infrastructure as a Service):** Renting raw virtual machines (AWS EC2). You manage the OS, runtime, and application.
- **PaaS (Platform as a Service):** Renting a managed environment (Heroku, AWS Elastic Beanstalk). You just supply the code; the cloud provider handles the OS and runtime.
- **SaaS (Software as a Service):** Fully managed end-user applications (Gmail, Salesforce).
- **Regions & Availability Zones (AZs):** A Region is a physical geographic location (e.g., `us-east-1` in N. Virginia). An AZ is an isolated data center within that region. Deploying across multiple AZs ensures High Availability if one building loses power.

## 3. Internal Working (Under the Hood)
### Virtualization & Hypervisors
Cloud providers own massive physical servers (Host Machines). They run software called a **Hypervisor** (like Xen or KVM) which splits the physical CPU, RAM, and Disk into dozens of isolated Virtual Machines (Guest OS / EC2 instances). When you click "Launch Instance", the Hypervisor spins up a new VM in seconds and allocates you a slice of the host's hardware.

## 4. Why it is used in Production
- **Elasticity (Auto-Scaling):** A startup might need 2 servers during the night, but 50 servers during a Black Friday sale. Cloud auto-scaling groups automatically detect CPU load and spin up/down servers dynamically, meaning you only pay for exactly what you use.
- **Global Reach:** Deploying your database to Europe, Asia, and America simultaneously takes 5 minutes via the AWS console, bringing latency down for users globally.

## 5. Architecture Diagrams

**AWS 3-Tier Web Architecture:**
```text
                          [ Internet Gateway ]
                                   |
                   +---------------+---------------+ (VPC Boundary)
                   |       Public Subnet           |
                   |      [ Application ALB ]      |
                   +---------------+---------------+
                                   |
                   +---------------+---------------+
                   |       Private Subnet 1        |
                   |   [ EC2 Auto-Scaling Group ]  |
                   |     (Node.js / Java API)      |
                   +---------------+---------------+
                                   |
                   +---------------+---------------+
                   |       Private Subnet 2        |
                   |       [ Amazon RDS ]          |
                   |    (Managed PostgreSQL)       |
                   +-------------------------------+
```

## 6. Performance Considerations
- **Egress Costs:** It is free to send data *into* AWS, but they charge heavily to send data *out* (Egress) to the public internet. Use CDNs (CloudFront) to cache heavy data at the edge to mitigate these massive bills.
- **Network Boundaries:** If your API is in `us-east-1` but your Database is in `eu-west-1`, every DB query adds 100ms of transatlantic latency. Always keep heavily communicating services in the same Region, preferably within the same VPC.

## 7. Security Considerations
- **IAM (Identity and Access Management):** Never use your "Root" AWS account for daily tasks. Create granular IAM roles (e.g., "This specific EC2 server only has permission to read from S3 Bucket X, but cannot write to it"). The principle of least privilege.
- **Security Groups:** Act as virtual firewalls at the instance level. A database security group should strictly ALLOW inbound traffic ONLY on port 5432, and ONLY originating from the specific IP range of the API Subnet.

## 8. Common Mistakes
- **Exposing S3 Buckets publicly:** Uploading user driver's licenses to S3 and accidentally leaving the bucket permissions set to `public-read`.
- **Leaving huge instances running:** Forgetting to turn off a massive GPU instance (`p3.16xlarge`) over the weekend resulting in a sudden $2,000 bill. Always set up AWS Billing Alarms.

## 9. Interview Questions
1. **Q:** What is the difference between AWS EC2 and AWS S3?
   **A:** EC2 is compute (a virtual machine running an OS). S3 is Object Storage (an infinitely scalable hard drive accessed via HTTP APIs to store files/images, not an OS).
2. **Q:** What is a VPC?
   **A:** Virtual Private Cloud. It's an isolated, logically partitioned section of the AWS cloud where you launch your resources in a customized virtual network, keeping backend servers hidden from the public internet.
3. **Q:** Explain the concept of Serverless compute (AWS Lambda).
   **A:** You upload a single function of code. AWS manages the servers completely. When an event happens (an HTTP request), the function boots up, executes, and goes back to sleep. You pay *strictly per millisecond* of execution time. If there's no traffic, the cost is $0.

## 10. Production-Level Best Practices
- **Infrastructure as Code (IaC):** Use Terraform or AWS CloudFormation. Never click through the AWS console to set up production environments (UI clicking is unrepeatable, un-versionable, and error-prone).
- **Tagging Strategy:** Apply metadata tags (Environment: Prod, Project: Auth) to every single cloud resource. Without tags, sorting out a massive monthly AWS bill is impossible.
