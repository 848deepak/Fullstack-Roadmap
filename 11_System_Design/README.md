# Module 11: System Design

## 1. Concept Overview
System Design is the process of defining the architecture, components, modules, interfaces, and data for a massive system to satisfy structural requirements. It focuses on scaling an application from 10 users running on a laptop, to 10 million users running across global data centers without crashing.

## 2. Theory from Scratch
- **Vertical Scaling (Scaling Up):** Buying a bigger server (more RAM/CPU). Easy, but has a hard physical limit and creates a single point of failure (SPOF).
- **Horizontal Scaling (Scaling Out):** Adding more cheap servers and splitting the traffic among them. Infinitely scalable, but adds immense complexity to software logic (distributed systems).
- **Load Balancers:** A traffic cop sitting in front of your servers, routing incoming requests to servers based on capacity (Round Robin, Least Connections).
- **Caching:** Storing the results of an expensive database query in massive RAM instances (Redis/Memcached) so subsequent identical requests return instantly (O(1)).

## 3. Internal Working (Under the Hood)
### The Content Delivery Network (CDN)
A massive global user base cannot all request images from a server in Virginia; the speed of light makes ping times to Australia horrific (300ms+). 
A CDN copies static assets (Images, Videos, CSS, React JS bundles) to hundreds of "Edge Nodes" worldwide. When an Australian user loads the page, the CDN intercepts the request and serves the images from a server in Sydney in 15ms.

### Message Queues
When a user uploads a video, processing it to 1080p, 720p, and 480p takes 5 minutes. If this happens via a synchronous HTTP request, the browser will timeout.
Instead, the API server instantly places a "Process Video X" message onto a Queue (RabbitMQ, Apache Kafka), returns a `202 Accepted` to the user, and background worker servers pull messages from the queue to process them asynchronously.

## 4. Why it is used in Production
Without System Design, a sudden spike in traffic (a Viral Tweet or Black Friday sale) will exhaust database connections, max out server CPU, and bring down the entire company's revenue stream for hours. System Design ensures High Availability (HA) (99.999% uptime).

## 5. Architecture Diagrams

**Classic Scaled Web Architecture:**
```text
                             [ Users ] (Browsers / Mobile Apps)
                                 |  (Images / JS) ----> [ Edge CDN ]
                                 v
                        [ AWS Route 53 (DNS) ]
                                 |
                                 v
                      [ Nginx Load Balancer ]
                       /         |         \
         +-------------+  +-------------+  +-------------+
         | Node API 1  |  | Node API 2  |  | Node API 3  |
         +------+------+  +------+------+  +------+------+
                |                |                |
                +----------------+----------------+
                |                |
                v                v
      +------------------+    +--------------------------+
      | Redis Cache      |    | Event Queue (Kafka)      |
      | (Fast Read)      |    +--------------------------+
      +------------------+                 |
                |                          v
                v                 +--------------------------+
      +------------------+        | Async Worker Servers     |
      | PostgreSQL DB    |        | (Sending Emails, crunch  |
      | (Master/Slave)   |        |  video processing)       |
      +------------------+        +--------------------------+
```

## 6. Performance Considerations
- **Latency vs Throughput:** Latency is how fast a single request completes (ms). Throughput is how many requests the system can handle simultaneously (Req/sec).
- **The Database Bottleneck:** Web servers are easily horizontally scaled (they are stateless). Databases are stateful and notoriously hard to scale. Caching is the primary defense mechanism to protect the database from crashing under read-heavy loads.

## 7. Security Considerations
- **VPC (Virtual Private Cloud):** The database and cache absolute MUST NOT be accessible from the public internet. Only the Load Balancer has a public IP. It passes traffic to the API servers via an internal private subnet, which then talk to the DB on that same private subnet.

## 8. Common Mistakes
- **Premature Optimization:** Introducing Kafka, Kubernetes, and Microservices for a startup with 100 users. Start with a Monolith and a single DB. Scale only when vertical scaling maxes out.
- **Cache Invalidation:** The hardest problem in computer science. If User A updates their profile in the SQL DB, but the old data stays alive in Redis for 10 minutes, the app displays stale data. Proper TTL (Time To Live) and invalidation strategies are critical.

## 9. Interview Questions
1. **Q:** Design Twitter / X. 
   **A:** (Interviewers want to see how you calculate DAU/bandwidth, handle explosive writes vs reads. Key concept: Fan-out. When Ronaldo tweets, you don't query his 500M followers. A background worker pre-computes and pushes his tweet directly into the Redis Timeline Cache of active users).
2. **Q:** What is Database Sharding?
   **A:** Splitting a massive database (too big for one hard drive) horizontally. E.g., Users A-M go to Server 1, Users N-Z go to Server 2. It introduces massive complexity (How do you query ALL users?).
3. **Q:** What is a Reverse Proxy?
   **A:** A server that sits in front of backend servers. Unlike a forward proxy (which hides the client's identity), a reverse proxy hides the server's identity, providing load balancing, SSL termination, and caching.

## 10. Production-Level Best Practices
- **Stateless Web Tiers:** Any given web server instance should be able to die, and requests instantly route to another instance without losing state (like login sessions). Store ALL state outside the server (in DBs or Redis).
- **Microservices Boundary:** When breaking a Monolith into microservices, break them by Business Capability (Auth Service, Payment Service), not by technical layers. Each service crucially must own its own isolated database to prevent hidden coupling.

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 11_System_Design

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
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 11: System Design`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **scalable distributed architecture**, with internal behavior centered on **inter-service communication and failure coordination** and state/contracts centered on **event streams, aggregates, and replicated state**.

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
- Start with observable behavior for **scalable distributed architecture** before introducing abstractions.
- Track what inputs produce what outputs in **event streams, aggregates, and replicated state** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **scalable distributed architecture**.
- Analyze execution boundaries in **inter-service communication and failure coordination** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **inter-service communication and failure coordination**.
- Specify invariants around **event streams, aggregates, and replicated state** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **inter-service communication and failure coordination**.
- Primary state domain and contracts: **event streams, aggregates, and replicated state**.
- Dominant architectural risk to isolate: **architectural bottlenecks and weak failure isolation**.

### Real-World Use Cases
- Build or migrate a system where **scalable distributed architecture** is a critical delivery concern.
- Operate high-change environments where **inter-service communication and failure coordination** behavior must stay predictable.
- Harden production paths where failures in **event streams, aggregates, and replicated state** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **inter-service communication and failure coordination**.
- Reduce unnecessary work in **event streams, aggregates, and replicated state** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **event streams, aggregates, and replicated state** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **scalable distributed architecture** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **inter-service communication and failure coordination** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **event streams, aggregates, and replicated state** boundaries.
- Ignoring **architectural bottlenecks and weak failure isolation** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you derive a system design from product requirements, SLOs, and growth assumptions instead of jumping directly to infrastructure components?
2. Compare synchronous and asynchronous service interactions in terms of latency, consistency, operability, and failure blast radius.
3. How would you design graceful degradation for a high-traffic product when key dependencies (cache, DB, third-party APIs) fail partially?
4. What signals indicate a monolith should remain modular versus being split into microservices?
5. How do you choose and defend partitioning strategy, replication model, and cache topology for a read-heavy global workload?

### Production Best Practices Upgrade
- Start every design with explicit capacity estimates, SLO targets, and failure budgets so architecture choices remain measurable.
- Keep critical paths simple and isolate complexity behind clear boundaries with documented ownership.
- Design for failure first: timeouts, retries with jitter, circuit breakers, and fallback behavior per dependency.
- Build observability into architecture diagrams: key metrics, trace boundaries, saturation indicators, and alert intent.
- Revisit architecture decisions periodically as traffic, team shape, and product constraints evolve.

### Folder Structure Diagram (Actual)
```text
11_System_Design/
├── 01_code_examples/
│   ├── README.md
│   └── token_bucket_rate_limiter.js
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
├── 05_advanced_deep_dive/
│   └── README.md
├── advanced/
│   └── 01_circuit_breaker_pattern.js
├── examples/
│   └── 01_consistent_hashing_ring.js
├── production/
│   └── 01_slo_error_budget.js
├── projects/
│   └── 01_url_shortener_core.js
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
- [System Design](README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [10_Authentication_and_Security](../10_Authentication_and_Security/README.md)
- **Next Module:** [12_DevOps](../12_DevOps/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
