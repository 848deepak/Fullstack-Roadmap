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
