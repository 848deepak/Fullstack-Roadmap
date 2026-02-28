# Module 12: DevOps Fundamentals

## 1. Concept Overview
Historically, developers (Dev) wrote code, threw it over a wall to Operations (Ops), and Ops manually copied the code to servers, leading to bugs like *"It works on my machine!"*. 

DevOps is a culture, movement, and set of practices that unites Development and Operations. It emphasizes automation, continuous integration, continuous delivery (CI/CD), and infrastructure as code (IaC) to rapidly, reliably, and repeatedly deploy software to production.

## 2. Theory from Scratch
- **Linux/Unix:** 90% of production servers run Linux. Mastering the terminal (Bash) is mandatory.
- **The "Works on my machine" Problem:** Software depends on specific OS versions, environment variables, and globally installed libraries. When moving code from a Macbook to an Ubuntu server, things break.
- **Containers (Docker):** A solution to the environment problem. It packages the code PLUS the underlying operating system dependencies into a single isolated file called an Image, which runs identically anywhere.
- **Infrastructure as Code (IaC):** Instead of manually clicking buttons in the AWS console to create a database, you write configuration code (Terraform, Ansible) that declaratively provisions servers.

## 3. Internal Working (Under the Hood)
### The Role of Nginx
Nginx is the backbone of web DevOps. It serves as a highly performant **Reverse Proxy**. 
When you run a React app on port 3000 and a Java API on port 8080 on an Ubuntu server, neither is accessible cleanly via standard port 80/443 mapping on a single domain. 
Nginx binds to port 80/443, accepts all public internet traffic, and internally routes `/api` to `localhost:8080`, and `/` to `localhost:3000`.

## 4. Why it is used in Production
Without DevOps, deploying a new feature involves a developer SSHing into an EC2 server, pulling `git`, manually running `npm install`, restarting background process managers (pm2 / systemctl), and hoping it doesn't crash the live site. DevOps automates this entire pipeline triggered purely by pushing code to the `main` branch.

## 5. Architecture Diagrams

**Traditional DevOps Pipeline (CI/CD):**
```text
 1. Code Commit        2. Continuous Integration     3. Continuous Deployment
+--------------+      +-------------------------+    +-----------------------+
|  Developer   |      |  GitHub Actions /       |    |   Production Server   |
|  Git Push -> |----->|  Jenkins                |--->|   (AWS/DigitalOcean)  |
+--------------+      |                         |    |                       |
                      | - Run Unit Tests        |    | - Pulls new image     |
                      | - Build Docker Image    |    | - Replaces old Nginx  |
                      | - Push to DockerHub     |    |   container           |
                      +-------------------------+    +-----------------------+
```

## 6. Performance Considerations
- **Image Size:** Bloated Docker images (using full Ubuntu base images) take minutes to download and deploy. Use Alpine Linux base images (5MB) or multi-stage builds to dramatically reduce deployment latency and storage costs.

## 7. Security Considerations
- **SSH Keys:** Never use passwords to SSH into production servers. Use cryptographic key pairs (RSA or Ed25519) and disable password authentication entirely in `sshd_config`.
- **Secrets Management:** NEVER hardcode database passwords in code or Dockerfiles. Inject them at runtime using Environment Variables, managed by secure vaults like AWS Secrets Manager or GitHub Secrets.

## 8. Common Mistakes
- **Running containers as ROOT:** By default, Docker processes run as the root user. If a hacker breaches the Node app, they have root access to the container (and potentially the host). Always create a low-privilege dedicated user inside the Dockerfile.
- **Treating servers as "Pets":** Manually logging into a specific server named "Server-Bob" to tweak configurations. Servers must be "Cattle" (disposable, identical, auto-generated via scripts that can be destroyed and recreated in minutes).

## 9. Interview Questions
1. **Q:** What is the difference between a Virtual Machine (VM) and a Docker Container?
   **A:** A VM virtualizes hardware, carrying the immense overhead of a full Guest OS (takes gigabytes and minutes to boot). A container virtualizes the OS *kernel*, sharing the host's kernel while isolating processes (takes megabytes and milliseconds to boot).
2. **Q:** What is the difference between Continuous Delivery and Continuous Deployment?
   **A:** Both automate testing and building. In *Delivery*, the artifacts are ready, but a human must manually click a "Deploy" button to push to production. In *Deployment*, every commit that passes tests goes straight to production automatically with zero human intervention.
3. **Q:** How do you keep a Node/Java app running if the server restarts?
   **A:** Create a `systemd` service file on Linux, or use a process manager like PM2, or use Docker restart policies (`restart: always`).

## 10. Production-Level Best Practices
- **Blue/Green Deployments:** Instead of shutting down the live app (downtime), spin up the new version (Green) alongside the old version (Blue). Once Green passes health checks, switch the Load Balancer to point to Green. Zero downtime.
- **Immutable Infrastructure:** Once a server/container is deployed, never modify it directly. If an update is needed, build a new image, deploy a new container, and destroy the old one.
