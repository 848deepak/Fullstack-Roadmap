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

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 12_DevOps

### Internal Contents
- [Documentation Upgrade Layer](#documentation-upgrade-layer)
- [Conceptual Depth Model](#conceptual-depth-model)
- [Beginner Perspective](#beginner-perspective)
- [Intermediate Perspective](#intermediate-perspective)
- [Advanced Internal Working](#advanced-internal-working)
- [Under-the-Hood Architecture](#under-the-hood-architecture)
- [Real-World Use Cases](#real-world-use-cases)
- [Performance Considerations](#performance-considerations-upgrade)
- [Security Considerations](#security-considerations-upgrade)
- [Edge Cases and Limitations](#edge-cases-and-limitations)
- [Common Mistakes](#common-mistakes-upgrade)
- [Interview-Level Theory Questions](#interview-level-theory-questions-upgrade)
- [Production Best Practices](#production-best-practices-upgrade)
- [Folder Structure Diagram](#folder-structure-diagram-actual)
- [Examples Projects Advanced Production Map](#examples-projects-advanced-production-map)
- [Code References in Repository](#code-references-in-repository)
- [Cross-Module Links](#cross-module-links)
- [Navigation](#navigation)

### Conceptual Depth Model
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 12: DevOps Fundamentals`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **delivery automation and environment reliability**, with internal behavior centered on **build pipelines, deployment steps, and operational scripts** and state/contracts centered on **artifacts, env configs, and release metadata**.

For every major concept in this module, analyze it through this lens:
- **Definition:** what the concept is and the precise technical boundary it defines.
- **Why it exists:** the failure mode or engineering bottleneck it solves.
- **How it works internally:** state changes, control flow, data flow, runtime behavior, and system boundaries.
- **When to use it:** the context where this concept provides leverage.
- **When not to use it:** cost, complexity, coupling, and maintainability trade-offs.
- **Performance implications:** latency, throughput, memory, I/O, network, CPU, and scalability behavior.
- **Security implications:** trust boundaries, attack surface, data exposure risks, and mitigation patterns.
- **Real-world scenario:** a production context where the concept appears in a full-stack system.
- **Code reference in repository:** practical anchor points inside this repository.

### Beginner Perspective
- Start with observable behavior for **delivery automation and environment reliability** before introducing abstractions.
- Track what inputs produce what outputs in **artifacts, env configs, and release metadata** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **delivery automation and environment reliability**.
- Analyze execution boundaries in **build pipelines, deployment steps, and operational scripts** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **build pipelines, deployment steps, and operational scripts**.
- Specify invariants around **artifacts, env configs, and release metadata** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **build pipelines, deployment steps, and operational scripts**.
- Primary state domain and contracts: **artifacts, env configs, and release metadata**.
- Dominant architectural risk to isolate: **fragile release flows and non-reproducible environments**.

### Real-World Use Cases
- Build or migrate a system where **delivery automation and environment reliability** is a critical delivery concern.
- Operate high-change environments where **build pipelines, deployment steps, and operational scripts** behavior must stay predictable.
- Harden production paths where failures in **artifacts, env configs, and release metadata** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **build pipelines, deployment steps, and operational scripts**.
- Reduce unnecessary work in **artifacts, env configs, and release metadata** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **artifacts, env configs, and release metadata** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **delivery automation and environment reliability** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **build pipelines, deployment steps, and operational scripts** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **artifacts, env configs, and release metadata** boundaries.
- Ignoring **fragile release flows and non-reproducible environments** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you design a CI/CD pipeline that optimizes developer feedback speed while maintaining release safety gates?
2. Compare blue-green, canary, and rolling deployments for different risk profiles and team maturity levels.
3. How would you investigate a deployment that succeeds technically but causes elevated error rates minutes later?
4. What controls ensure environment parity so code behaves consistently across local, CI, staging, and production?
5. How do you design rollback strategy when schema changes and app changes are deployed together?

### Production Best Practices Upgrade
- Treat pipelines as production systems with ownership, observability, and reliability goals.
- Enforce immutable artifacts and reproducible builds to prevent “works on my machine” drift.
- Shift-left quality and security checks but keep deploy-time controls for runtime risks.
- Automate rollback decisions with health criteria, not manual guesswork during incidents.
- Keep release metadata, change logs, and deployment evidence auditable end-to-end.

### Folder Structure Diagram (Actual)
```text
12_DevOps/
├── 01_code_examples/
│   ├── multi_stage_node.Dockerfile
│   └── README.md
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
├── 05_advanced_deep_dive/
│   └── README.md
├── advanced/
│   └── 01_blue_green_switching.sh
├── examples/
│   └── 01_makefile_basics.mk
├── production/
│   └── 01_release_checklist.sh
├── projects/
│   └── 01_deploy_script_mini_project.sh
├── README.md
```

### Examples Projects Advanced Production Map
- [Examples](01_code_examples/README.md): foundational patterns and minimal reproducible implementations.
- [Projects](04_mini_project/README.md): integrated workflows with realistic constraints and trade-offs.
- [Advanced](05_advanced_deep_dive/README.md): deeper internals, system boundaries, and scaling-oriented decisions.
- [Production Architecture](../20_Production_Architecture/README.md): reliability, observability, and long-term operability principles.

### Code References in Repository
- This section is concept-first. Reference neighboring examples and projects in this module.

### Cross-Module Links
- [Root Roadmap](../README.md)
- [12_DevOps](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [11_System_Design](../11_System_Design/README.md)
- **Next Module:** [13_Cloud_Infrastructure](../13_Cloud_Infrastructure/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
