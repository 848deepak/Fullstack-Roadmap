# Module 14: Containers and Orchestration

## 1. Concept Overview
While basic Docker handles containerizing a single application (like a Node API), modern enterprise architectures consist of dozens of microservices. Orchestration is the automated configuration, management, scaling, and coordination of thousands of these containers. **Kubernetes (K8s)** is the undeniable industry standard for this task.

## 2. Theory from Scratch
- **Docker Compose:** Great for local development. Spins up multiple containers (App + DB + Redis) on a *single* machine using a `docker-compose.yml` file.
- **Orchestration (Kubernetes):** Designed for clusters of machines. If an EC2 instance running 5 containers suddenly dies, K8s detects the failure and instantly reschedules those 5 containers onto a healthy EC2 instance elsewhere in the cluster.
- **K8s Primitives:**
  - **Pod:** The smallest deployable unit (usually wraps 1 container).
  - **Deployment:** A blueprint managing exact replicas of Pods (e.g., "Keep exactly 3 instances of the Auth API running").
  - **Service:** A stable internal IP/networking abstraction that load-balances traffic across the fluid, constantly dying/respawning Pods.
  - **Ingress:** The gateway exposing internal Services to the outside internet domain (e.g., `api.example.com`).

## 3. Internal Working (Under the Hood)
### The Kubernetes Control Plane
A K8s cluster consists of Master Nodes and Worker Nodes.
1. You submit a YAML manifest `Deployment` to the API Server on the Master Node.
2. The Database (`etcd`) records this desired state.
3. The `Scheduler` notices new Pods need to be assigned and finds Worker Nodes with available CPU/RAM.
4. The `Kubelet` (agent on the Worker Node) receives the order and instructs Docker to spin up the container.
5. In an infinite loop, the Control Plane compares the *Actual State* against the *Desired State*. If an app crashes (Actual = 2, Desired = 3), K8s spawns a new one.

## 4. Why it is used in Production
Microservices are impossible to manage manually. Without Kubernetes, applying a rolling update to 50 web servers means writing chaotic, fragile bash scripts to SSH into servers, gracefully drain traffic, swap containers, and restart. K8s handles Rolling Updates natively with zero downtime simply by applying a new YAML configurations.

## 5. Architecture Diagrams

**Kubernetes Cluster Overview:**
```text
     [ Master Node (Control Plane) ]
       - API Server  (Input YAML)
       - etcd (Database of state)
       - Scheduler
       - Controller Manager
                 |
                 v (Instructs via Network)
     +-----------------------------------+
     |                                   |
[ Worker Node 1 ]                [ Worker Node 2 ]
  - Kubelet                        - Kubelet
  - Kube-Proxy                     - Kube-Proxy
  (Pod: Node API v1)               (Pod: Node API v1)
  (Pod: Redis DB)                  (Pod: Node Auth Service)
```

## 6. Performance Considerations
- **Resource Requests & Limits:** In K8s YAML, you MUST define exactly how much CPU (e.g., `100m`) and RAM (e.g., `256Mi`) a container needs. Without Limits, a memory leak in one Node container will consume 100% of the host's RAM, violently crashing every other container on that Worker Node.
- **Horizontal Pod Autoscaling (HPA):** K8s can automatically increase the "Desired Replicas" from 3 to 10 if average CPU usage across Pods exceeds 80%.

## 7. Security Considerations
- **Namespaces:** Use K8s Namespaces to logically isolate teams/environments (`dev`, `staging`, `prod`) within the same physical cluster.
- **RBAC (Role-Based Access Control):** Ensure a developer only has permission to view Pod logs, but not permission to delete Deployments or view K8s Secrets.
- **Network Policies:** By default, all Pods in a K8s cluster can talk to each other. Secure the cluster by defining rules (e.g., "The API Pods are ONLY allowed to establish traffic with the DB Pods").

## 8. Common Mistakes
- **Containers are Ephemeral:** Storing a user-uploaded image inside the container's file system. If K8s reschedules the Pod, the filesystem is destroyed forever. Always mount Persistent Volumes (PVs) or use an external S3 bucket.
- **Overcomplicating the Stack:** "We need Kubernetes" when a simple PaaS like Heroku or AWS AppRunner effortlessly handles the traffic footprint. Managing a K8s Control Plane requires dedicated DevOps engineers.

## 9. Interview Questions
1. **Q:** What is the difference between Docker and Kubernetes?
   **A:** Docker is a containerization platform used to package applications into an isolated image. Kubernetes is an orchestration engine used to manage, scale, and network hundreds of those Docker containers across a cluster of physical machines.
2. **Q:** What happens when a Pod dies in Kubernetes?
   **A:** The Pod itself is mortal and gone forever. The ReplicaSet Controller instantly notices the available specific replica count dropped below the desired count, and orders the generation of a brand new Pod to replace it.
3. **Q:** What is an Ingress Controller?
   **A:** A sophisticated reverse proxy (usually Nginx underneath) that sits at the edge of the K8s cluster, routing incoming external HTTP(S) traffic to internal K8s Services based on URL paths (`/api` vs `/auth`).

## 10. Production-Level Best Practices
- **Managed K8s:** Do NOT attempt to install and manage the K8s Control Plane yourself (kubeadm/kops). ALWAYS use managed Cloud services like AWS EKS, Google GKE, or Azure AKS where the provider guarantees the Master Nodes' uptime.
- **Helm Charts:** Instead of copying and pasting 15 massive YAML files, use Helm (the package manager for K8s) to deploy complex, version-controlled stacks with single commands `helm install my-database bitnami/postgresql`.
