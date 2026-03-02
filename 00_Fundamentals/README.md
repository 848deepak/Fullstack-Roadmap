# Module 00: Fundamentals of the Web

## 1. Concept Overview
Before writing a single line of code, a production-level engineer must understand how the web actually works. This module covers the foundational architecture of the internet: how browsers talk to servers, how domain names are resolved, and what happens when you type `google.com` into your address bar.

## 2. Theory from Scratch
- **Client-Server Model:** The web is built on a request-response cycle. A client (browser, mobile app) sends an HTTP Request to a Server. The server processes it and sends an HTTP Response back.
- **IP Addresses & DNS:** Servers live at IP addresses (e.g., `192.168.1.1`). Because humans are bad at remembering numbers, the Domain Name System (DNS) translates human-readable URLs (`example.com`) into IP addresses.
- **Web Hosting:** Storing your website's files on a computer that is connected to the internet 24/7.
- **Browsers:** Software (Chrome, Firefox, Safari) that interprets HTML, CSS, and JS and paints them onto the screen.

## 3. Internal Working (Under the Hood)
When you navigate to `https://www.google.com`:
1. **DNS Lookup:** Browser checks its cache for the IP. If not found, it queries the OS cache -> Router cache -> ISP DNS -> Root DNS Servers until the IP is resolved.
2. **TCP Handshake:** Browser establishes a reliable connection with the server using the Transmission Control Protocol (SYN, SYN-ACK, ACK).
3. **TLS/SSL Handshake:** (If using HTTPS) Cryptographic keys are exchanged to ensure the connection is encrypted and secure.
4. **HTTP Request:** Browser sends a `GET` request for the homepage.
5. **HTTP Response:** Server sends back an HTML file (Status 200 OK).
6. **Browser Rendering:**
   - Parses HTML to build the DOM (Document Object Model).
   - Parses CSS to build the CSSOM (CSS Object Model).
   - Combines them into a Render Tree.
   - Calculates layout and paints pixels to the screen.

## 4. Why it is used in Production
Understanding this lifecycle is non-negotiable for debugging production issues. If a website is slow, is it DNS resolution time? A slow server response? Or is the browser struggling to paint a massive DOM tree? Fundamentals isolate the exact layer where a bug exists.

## 5. Architecture Diagrams

```text
+---------+        1. DNS Lookup         +-----------+
|         | ---------------------------> |           |
| Client  |                              | DNS Server|
| Browser | <--------------------------- |           |
|         |        2. Returns IP         +-----------+
+---------+
   |  ^
   |  | 3. TCP Handshake & TLS
   |  | 4. HTTP GET Request
   v  | 5. HTTP Response (HTML)
+---------+
|         |
| Web     |
| Server  |
|         |
+---------+
```

## 6. Performance Considerations
- **DNS Prefetching:** Browsers can proactively resolve domain names before a user even clicks a link using `<link rel="dns-prefetch" href="..." />`.
- **Minimizing Round Trips:** Every TCP/TLS handshake adds latency (measured in ms). Using HTTP/2 or HTTP/3 multiplexes multiple requests over a single connection.

## 7. Security Considerations
- **HTTPS is Mandatory:** Unencrypted HTTP sends data in plain text, making it trivial for attackers on a public Wi-Fi network to steal passwords/cookies via packet sniffing.
- **DDoS Attacks:** Distributed Denial of Service overwhelms a server with fake requests. CDNs (like Cloudflare) sit in front of the server to filter out malicious traffic.

## 8. Common Mistakes
- Confusing the World Wide Web (WWW) with the Internet. (The Internet is the hardware/networking infrastructure; WWW is the collection of web pages running on top of it via HTTP).
- Developing locally (`localhost`) and assuming latency will be zero in production.
- Ignoring the critical rendering path, causing "Flash of Unstyled Content" (FOUC) or massive Layout Shifts.

## 9. Interview Questions
1. **Q:** Exactly what happens from the moment you type a URL into the browser until the page fully loads?
   **A:** (Summarize the 6 steps from the 'Internal Working' section above, focusing on DNS, TCP, HTTP, and the DOM/CSSOM parsing).
2. **Q:** What is the difference between TCP and UDP?
   **A:** TCP is connection-oriented, reliable, and guarantees in-order delivery (used for HTTP). UDP is connectionless, fast, but drops packets (used for video streaming, gaming).
3. **Q:** What port does HTTP and HTTPS run on by default?
   **A:** HTTP uses Port 80; HTTPS uses Port 443.

## 10. Production-Level Best Practices
- **Use a CDN (Content Delivery Network):** Serve your static assets (HTML/CSS/JS/Images) from servers geographically close to the user to drastically reduce latency.
- **Always force HTTPS:** Configure your server/load balancer to redirect all HTTP traffic to HTTPS (301 Redirect).
- **Monitor Uptime:** Use tools like Pingdom or Datadog to ensure your DNS and server aren't failing silently.

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 00_Fundamentals

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
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 00: Fundamentals of the Web`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **web fundamentals and request lifecycle**, with internal behavior centered on **browser networking stack and protocol negotiation** and state/contracts centered on **HTTP messages, headers, and rendering-critical assets**.

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
- Start with observable behavior for **web fundamentals and request lifecycle** before introducing abstractions.
- Track what inputs produce what outputs in **HTTP messages, headers, and rendering-critical assets** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **web fundamentals and request lifecycle**.
- Analyze execution boundaries in **browser networking stack and protocol negotiation** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **browser networking stack and protocol negotiation**.
- Specify invariants around **HTTP messages, headers, and rendering-critical assets** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **browser networking stack and protocol negotiation**.
- Primary state domain and contracts: **HTTP messages, headers, and rendering-critical assets**.
- Dominant architectural risk to isolate: **misdiagnosing latency sources across DNS, TLS, network, and rendering**.

### Real-World Use Cases
- Build or migrate a system where **web fundamentals and request lifecycle** is a critical delivery concern.
- Operate high-change environments where **browser networking stack and protocol negotiation** behavior must stay predictable.
- Harden production paths where failures in **HTTP messages, headers, and rendering-critical assets** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **browser networking stack and protocol negotiation**.
- Reduce unnecessary work in **HTTP messages, headers, and rendering-critical assets** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **HTTP messages, headers, and rendering-critical assets** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **web fundamentals and request lifecycle** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **browser networking stack and protocol negotiation** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **HTTP messages, headers, and rendering-critical assets** boundaries.
- Ignoring **misdiagnosing latency sources across DNS, TLS, network, and rendering** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. Which invariants in **web fundamentals and request lifecycle** must hold for correctness, and how would you enforce them?
2. What trade-offs emerge when optimizing **browser networking stack and protocol negotiation** for latency vs reliability?
3. How would you detect and mitigate failures related to **misdiagnosing latency sources across DNS, TLS, network, and rendering**?
4. How would you scale **HTTP messages, headers, and rendering-critical assets** boundaries without rewriting the full module?
5. Which telemetry would you add first to debug this module during incidents?

### Production Best Practices Upgrade
- Keep contracts explicit around **HTTP messages, headers, and rendering-critical assets** and version them intentionally.
- Write ADR-style decisions for major design choices in **web fundamentals and request lifecycle**.
- Validate failure paths and rollback plans with runnable drills, not assumptions.
- Keep docs synchronized with executable examples, projects, and deployment realities.

### Folder Structure Diagram (Actual)
```text
00_Fundamentals/
├── 01_code_examples/
│   ├── http_request_flow.sh
│   └── README.md
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
├── 05_advanced_deep_dive/
│   └── README.md
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
- [00_Fundamentals](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** None
- **Next Module:** [01_HTML](../01_HTML/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
