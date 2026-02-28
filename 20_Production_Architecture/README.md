# Module 20: Production Architecture

## 1. Concept Overview
Production Architecture is the culmination of every previous module (React, Java API, DBs, Docker, CI/CD, Networking). It dictates how these isolated pieces fit together logically, geographically, and securely to serve millions of global users while surviving partial hardware failures.

## 2. Theory from Scratch
- **Monolith:** All code (Frontend templating, API routing, Business logic, Background jobs) compiled into one massive executable running on one server. Easy to build, hard to scale.
- **Microservices:** Breaking the monolith into dozens of small, independently deployable services (Auth Service, Billing Service, Notification Service) that communicate via HTTP or message queues. Harder to build, easy to scale independent components.
- **Serverless:** Outsourcing server management entirely. Deploying small functions (AWS Lambda) that live and die per HTTP request. Theoretically infinite scalability with zero idle cost.

## 3. Internal Working (Under the Hood)
### The API Gateway
In a Microservice architecture, the React app shouldn't have to know the URLs for 50 different backend services (`auth.example.com`, `billing.example.com`).
An API Gateway (like Netflix Zuul or AWS API Gateway) serves as the single entry point. The frontend calls `api.example.com/checkout`. The Gateway handles JWT authentication, rate limiting, and then internally routes the request to the hidden, private internal Checkout Microservice container.

## 4. Why it is used in Production
Because monolithic applications eventually hit a breaking point. When 100 developers commit code to a single Monolith Git repository daily, merge conflicts halt progress, the CI/CD test suite takes 3 hours to run, and the deploy pipeline breaks constantly. Architecture patterns organize both the *Code* and the *Teams* building the code.

## 5. Architecture Diagrams

**Modern Microservice App Architecture:**
```text
           [ React Web App (S3 + CloudFront CDN) ]
                            |
                     (HTTPS Request)
                            v
             +-----------------------------+
             |         API Gateway         |
             |  (Auth, Rate Limit, TLS)    |
             +------+---------------+------+
                    |               |
              (Route /users)  (Route /pay)
                    v               v
           +-----------+         +-----------+
           | User Auth |         | Payment   |
           | Microsvc  |<-(RPC)->| Microsvc  |
           | (Node.js) |         | (Java)    |
           +-----------+         +-----------+
                 |                     |
                 v                     v
            [ MongoDB ]        [ PostgreSQL ]
            (User Data)        (Txn Data)
```

## 6. Performance Considerations
- **CAP Theorem & Microservices:** Because the Auth Service and Payment Service have completely separate databases, achieving strict ACID SQL-like distributed transactions across them is nearly impossible without crushing performance (Two-Phase Commit). Modern architectures embrace **Eventual Consistency** (using the Saga Pattern).

## 7. Security Considerations
- **Zero Trust Architecture:** Do not assume that just because the Auth Microservice and the Payment Microservice are on the same private subnet, they can communicate securely. A hacker breaching one container can pivot. Implement mutual TLS (mTLS) between all internal microservices so they must cryptographically prove their identity to one another.

## 8. Common Mistakes
- **The Distributed Monolith:** Creating 50 microservices, but they all share the exact same PostgreSQL database. If the DB goes down, all 50 services crash simultaneously. True microservices must own their databases exclusively.
- **Synchronous Microservice Death Spiral:** If Service A calls Service B synchronously, and B is slow, A becomes slow. If B crashes, A crashes. (To fix: Service A should push an event to a Kafka queue asynchronously, and Service B processes it when ready).

## 9. Interview Questions
1. **Q:** What are the pros and cons of Microservices vs a Monolith?
   **A:** **Monolith Pros:** Easy to debug, easy to test, no network latency between modules. **Monolith Cons:** Hard to scale independent features, massive codebase, slow CI/CD. **Microservices Pros:** Teams can work independently in different tech stacks, highly scalable, localized fault isolation. **Microservices Cons:** Immense operational complexity, distributed tracing debugging nightmares, data consistency issues.
2. **Q:** What is the Saga Pattern?
   **A:** A way to manage distributed transactions across microservices. Instead of locking 3 databases at once, Service 1 executes a local DB transaction and publishes an event. Service 2 hears the event, executes its local transaction, and publishes an event. If Service 3 fails, the system triggers "Compensating Transactions" (rollback events) backwards down the chain.

## 10. Production-Level Best Practices
- **Strangler Fig Pattern:** NEVER attempt a "Big Bang Rewrite" to move from a Monolith to Microservices. Use a proxy to route 95% of traffic to the old Monolith, and 5% to a newly built Auth Microservice. Over months, slowly slice features out of the Monolith (strangling it) until everything is running on the new architecture. 
