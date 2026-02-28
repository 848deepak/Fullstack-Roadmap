# Module 21: Real-World Projects & Capstones

## 1. Concept Overview
The ultimate test of a Full-Stack Engineer is not answering trivia on the Event Loop; it's architecting and delivering a production-grade application that integrates Frontend, Backend, Database, Security, and DevOps concepts simultaneously.

## 2. The Projects
These 5 Capstone projects are designed to demonstrate FAANG-level competency. Do not copy tutorials. Build these from scratch using the official documentation for each technology.

### Project 1: Enterprise E-Commerce Platform
- **Goal:** Build a robust, scalable online store that handles inventory, payments, and global traffic.
- **Frontend Stack:** Next.js (App Router), React Server Components, TailwindCSS.
- **Backend Stack:** Java Spring Boot Microservices (Product Catalog DB, Order Processing DB, User Auth DB).
- **Core Requirements:**
  - Implement **Stripe API** for secure payment processing (handling Webhook callbacks).
  - Use **Redis** to cache product listings and the Shopping Cart for instant retrieval.
  - Implement **JWT Authentication** and separate Admin vs Customer dashboards.
  - **DevOps:** Dockerize all 3 Microservices + Next.js frontend and deploy using a `docker-compose.yml` file or AWS ECS.

### Project 2: Real-time Project Management Dashboard (Jira Clone)
- **Goal:** Build an intensely interactive SPA (Single Page Application) with real-time websocket synchronization.
- **Frontend Stack:** React, WebSockets (Socket.io), Zustand (Global State).
- **Backend Stack:** Node.js/Express (or Java Spring WebFlux), MongoDB.
- **Core Requirements:**
  - Build a drag-and-drop Kanban board (e.g., using `dnd-kit`).
  - When User A moves a ticket, User B's screen must instantly update via **WebSockets** without refreshing.
  - Implement strict **Role-Based Access Control (RBAC)** (Workspace Owner, Admin, Member, Guest).
  - Use **MongoDB Aggregation Pipelines** to generate "Sprint Velocity" metric charts.

### Project 3: Secure FinTech Digital Wallet
- **Goal:** Build an application where data consistency and security are 10x more important than UI rendering speed.
- **Frontend Stack:** React (Focus on Form Validation and 2FA).
- **Backend Stack:** Java Spring Boot, strict PostgreSQL.
- **Core Requirements:**
  - Implement a ledger system. Explain and utilize **ACID Transactions** (If User A sends $50 to User B, but User B's credit fails, User A's debit MUST roll back instantly).
  - Integrate **Multi-Factor Authentication (MFA)** using Time-Based One-Time Passwords (TOTP) (e.g., Google Authenticator).
  - Implement heavy **Rate Limiting** (preventing brute-force login attacks).
  - Setup the **ELK Stack** mapping all transactions to detect "fraudulent" IP anomalies visually on Kibana.

### Project 4: High-Traffic Social Media Feed (System Design Focus)
- **Goal:** Build an application that can mathematically handle 10,000 requests per second.
- **Frontend Stack:** React, Infinite Scrolling implementation.
- **Backend Stack:** Node.js API, Apache Kafka, Cassandra/DynamoDB (NoSQL).
- **Core Requirements:**
  - When a massive celebrity posts an image, use the **Fan-out Architecture** to push that post to the Redis timelines of their 5 million active followers asynchronously via Kafka workers.
  - Integrate a **CDN (AWS CloudFront)** to serve user-uploaded images in milliseconds globally.
  - Load-test the architecture using **Apache JMeter** and prove the API Gateway bottleneck via visual metrics on Prometheus/Grafana.

### Project 5: The DevOps Automated Code CI/CD Runner
- **Goal:** Build a specialized SaaS platform (like LeetCode or GitHub Actions) that securely executes user-submitted code in isolated environments.
- **Stack:** Next.js Frontend, Node.js API, Docker Engine API, Linux Servers.
- **Core Requirements:**
  - A user submits a Python script in a browser editor.
  - The Node.js backend receives the script, spins up an isolated, strictly-limited (512MB RAM, 1 CPU Core) **Docker Container**, injects the Python code, executes it, captures `stdout` and `stderr`, destroys the container, and streams the results back to the React UI via Server-Sent Events (SSE).
  - Prevent user-submitted code from crashing the host machine (Infinite loops, network scanning out to the internet).

## 3. How to Present These on a Resume
- **Anti-Pattern:** "Built a Jira clone using React, Node, and MongoDB."
- **Production-Level Pattern:** "Architected a real-time Kanban system using React and WebSockets, reducing synchronization latency to <50ms. Containerized the Node.js backend and MongoDB database, writing GitHub Action CI/CD pipelines to automatically deploy passing commits to an AWS EC2 instance behind an Nginx reverse proxy."

## 4. Final Thoughts
Completing these 5 projects fully guarantees you understand every single module presented in this repository from 00 to 20. Code is learned by doing, failing, and reading the stack traces in production logs. Good luck.
