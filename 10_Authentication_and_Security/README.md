# Module 10: Authentication and Security

## 1. Concept Overview
Authentication answers "Who are you?" (proving identity via passwords or biometrics). Authorization answers "What can you do?" (permissions based on roles like Admin vs User). Since HTTP is stateless, the backend needs a secure way to remember who the user is across thousands of subsequent API requests without asking for the password every time.

## 2. Theory from Scratch
- **Sessions/Cookies (Traditional):** Server creates a session ID, stores it in memory/Redis, and sends it to the browser as a `Set-Cookie`. The browser automatically sends this cookie on all future requests.
- **Tokens (Modern SPA flow):** Server generates an encrypted token (JSON Web Token - JWT) and gives it to the client (React). The client manually attaches it to the `Authorization: Bearer <token>` header for future API calls.
- **Passwords:** Never store plain text. Always hash (using BCrypt/Argon2) which is a one-way mathematical function.
- **OAuth 2.0 / OIDC:** The protocol used for "Log in with Google/GitHub". It delegates authentication to a trusted third party.

## 3. Internal Working (Under the Hood)
### JSON Web Tokens (JWT)
A JWT contains 3 Base64-encoded strings separated by dots: `Header.Payload.Signature`.
1. **Header:** Algorithm used (`HS256`).
2. **Payload:** The actual data (e.g., `{"userId": 1, "role": "admin"}`). *Anyone can decode this!* Do not put passwords here.
3. **Signature:** The server takes the Header + Payload + a `SECRET_KEY` known only to the backend, and hashes it. 

When the React app sends the token back, the server recalculates the signature using its Secret. If the signatures match, it means the Payload wasn't tampered with by a hacker, and the ID `1` can be trusted.

## 4. Why it is used in Production
JWTs are stateless. If you have 10 separate backend servers behind a Load Balancer, using server-memory Sessions is a nightmare (if Server 1 issues a session, Server 2 won't recognize it unless you use a centralized Redis store). Since JWTs validate themselves mathematically via the signature, *any* server can authenticate a request instantly, enabling massive horizontal scaling.

## 5. Architecture Diagrams

**Token-Based API Flow:**
```text
React Client                             Java API Backend
    |                                            |
    |---- 1. POST /login (deepak, pass123) ----->|
    |                                            |  <- Verifies hash
    |                                            |  <- Creates JWT
    |<--- 2. Returns 200 OK { token: "abc..." } -|
    |                                            |
    |                                            |
    |---- 3. GET /account                        |
    |     Header: Bearer abc... ---------------->|
    |                                            |  <- Validates Signature
    |<--- 4. Returns 200 OK { balance: $500 } ---|
```

## 6. Performance Considerations
- **JWT Size:** Tokens are sent on *every* HTTP request. A massive payload (10KB) slows down network performance drastically. Keep the payload minimal (just User ID and Role).

## 7. Security Considerations
- **Where to Store JWTs in React:**
  - *Local Storage:* Vulnerable to XSS. If a hacker runs malicious JS on your site, they can read `localStorage.getItem('token')` and steal the user's account entirely.
  - *HttpOnly Cookies:* Vulnerable to CSRF, but immune to XSS. (Browser sets the cookie, JS cannot read it). This is the enterprise standard.
- **Token Invalidation:** Because JWTs are stateless, you cannot "log a user out" strictly on the backend before the token expires. (Unless you maintain a database "blacklist" of revoked tokens, which defeats the stateless purpose of JWTs).

## 8. Common Mistakes
- **Rolling your own Crypto:** Trying to write your own hashing algorithm or login flow. Always use battle-tested libraries like Spring Security or Passport.js.
- **No Password Salting:** Hashing "password123" always yields the exact same hash. Hackers use "Rainbow Tables" (massive databases of pre-computed hashes) to reverse an unsalted database leak in seconds. Salting adds a random string to the password *before* hashing, rendering rainbow tables useless.

## 9. Interview Questions
1. **Q:** What is the difference between Authentication and Authorization?
   **A:** Authentication validates identity (Logging in). Authorization validates permissions (Can this logged-in user delete this post?). 
2. **Q:** Explain CSRF (Cross-Site Request Forgery).
   **A:** If you use cookie-based sessions, and a user is logged into Bank.com, a malicious site (Evil.com) can include a hidden form that submits a POST request to `Bank.com/transfer`. The browser automatically attaches the victim's Bank cookies, executing the transfer. Solved via anti-CSRF tokens.
3. **Q:** What is 2FA/MFA?
   **A:** Multi-Factor Authentication. It requires factors from 2+ categories: Something you know (Password), Something you have (Phone/Authenticator app code), or Something you are (Fingerprint).

## 10. Production-Level Best Practices
- **Refresh & Access Tokens:** JWT Access Tokens should have very short lifespans (15 minutes). If stolen, the window of damage is tiny. The server also issues a long-lived Refresh Token (stored in a secure HttpOnly cookie). When the Access Token dies, the React app uses the Refresh Token to silently get a new Access Token in the background.
- **Rate Limit Login Attempts:** Lock accounts for 15 minutes after 5 failed login attempts to strictly prevent brute-force dictionary attacks against passwords.

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 10_Authentication_and_Security

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
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 10: Authentication and Security`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **identity, authorization, and security controls**, with internal behavior centered on **token issuance/validation and policy enforcement** and state/contracts centered on **credentials, claims, sessions, and permission scopes**.

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
- Start with observable behavior for **identity, authorization, and security controls** before introducing abstractions.
- Track what inputs produce what outputs in **credentials, claims, sessions, and permission scopes** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **identity, authorization, and security controls**.
- Analyze execution boundaries in **token issuance/validation and policy enforcement** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **token issuance/validation and policy enforcement**.
- Specify invariants around **credentials, claims, sessions, and permission scopes** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **token issuance/validation and policy enforcement**.
- Primary state domain and contracts: **credentials, claims, sessions, and permission scopes**.
- Dominant architectural risk to isolate: **broken access control and unsafe secret handling**.

### Real-World Use Cases
- Build or migrate a system where **identity, authorization, and security controls** is a critical delivery concern.
- Operate high-change environments where **token issuance/validation and policy enforcement** behavior must stay predictable.
- Harden production paths where failures in **credentials, claims, sessions, and permission scopes** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **token issuance/validation and policy enforcement**.
- Reduce unnecessary work in **credentials, claims, sessions, and permission scopes** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **credentials, claims, sessions, and permission scopes** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **identity, authorization, and security controls** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **token issuance/validation and policy enforcement** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **credentials, claims, sessions, and permission scopes** boundaries.
- Ignoring **broken access control and unsafe secret handling** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you design auth flows that remain secure across web, mobile, and server-to-server clients without duplicating policy logic?
2. Compare session-based auth and JWT-based auth under revocation, horizontal scaling, and incident response requirements.
3. How would you implement least-privilege authorization beyond simple role checks (resource ownership, scopes, contextual policies)?
4. A token-signing secret is leaked. What is your immediate containment plan and long-term architecture improvement?
5. How do you design MFA and step-up authentication so security improves without breaking user conversion and usability?

### Production Best Practices Upgrade
- Centralize auth policy decisions and permission vocabulary so all services enforce the same semantics.
- Use short-lived access tokens, rotating refresh tokens, and revocation strategy tied to risk events and account state changes.
- Protect secrets with managed key systems, rotate keys regularly, and support key rollover without downtime.
- Enforce defense-in-depth at auth boundaries: rate limiting, anomaly detection, device/session telemetry, and audit trails.
- Treat authentication incidents as operational events with playbooks for secret compromise, token invalidation, and user communication.

### Folder Structure Diagram (Actual)
```text
10_Authentication_and_Security/
├── 01_code_examples/
│   ├── jwt_middleware_example.js
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
│   └── 01_oauth_state_validation.js
├── examples/
│   └── 01_jwt_issue_verify.js
├── production/
│   └── 01_auth_rate_limit_guard.js
├── projects/
│   └── 01_auth_api_mini_project.js
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
- [10_Authentication_and_Security](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [09_Databases](../09_Databases/README.md)
- **Next Module:** [11_System_Design](../11_System_Design/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
