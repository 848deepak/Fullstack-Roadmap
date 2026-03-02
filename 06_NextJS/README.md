# Module 06: Next.js

## 1. Concept Overview
Next.js is a React framework for production. While React dictates *how* to build components, Next.js dictates *where* they render (Client vs. Server), handles routing automatically, optimizes images/fonts, and provides backend API routes, enabling full-stack React applications.

## 2. Theory from Scratch
- **Client-Side Rendering (CSR):** (Standard React) Server sends an empty HTML shell and a massive JS bundle. Browser downloads and runs the JS to finally build the UI. (Slow initial load, bad SEO).
- **Server-Side Rendering (SSR):** Server builds the full HTML page on *every* request and sends it to the browser. (Fast initial load, great SEO, higher server load).
- **Static Site Generation (SSG):** Server builds the full HTML page *once* at build time. Used for blogs/docs. (Fastest, cheapest, but data can get stale).
- **Incremental Static Regeneration (ISR):** SSG, but with an expiration timer. If user visits after 60 seconds, the server serves the stale page while rebuilding it in the background for the next user.
- **RSC (React Server Components):** Components that execute entirely on the server and send serialized UI data to the client, never sending the component's underlying JavaScript.

## 3. Internal Working (Under the Hood)
Next.js uses file-system based routing (the App Router). 

```text
app/
 ├── layout.tsx     (Wraps all pages, maintains state across routes)
 ├── page.tsx       (The root route '/')
 └── dashboard/
      ├── page.tsx  (The '/dashboard' route)
      └── api/
           └── route.ts (Backend endpoint: GET /dashboard/api)
```

When a user visits `/dashboard`, the server generates the HTML using the React components. It then sends this HTML along with small JS chunks (hydration payloads). The browser paints the HTML instantly, then React "hydrates" it, attaching event listeners to make the buttons interactive.

## 4. Why it is used in Production
Pure React apps suffer heavily on SEO because search engine crawlers often don't wait for JS to execute (resulting in them seeing a blank page). Next.js provides instant, crawled HTML pages. Features like automatic Image optimization (`<Image />`) prevent massive cumulative layout shifts (CLS), vastly improving Google Core Web Vitals scores.

## 5. Architecture Diagrams

**App Router Request Flow:**
```text
User Request ----> [Edge Network / CDN (SSG/ISR)] ----> Cache Hit?
                        |                                  |
                   (Cache Miss)                            |
                        v                                  |
              [Next.js Server (Node.js)]                   |
              Renders Server Components                    |
              Fetches DB / External APIs                   |
              Generates HTML + RSC Payload                 |
                        |                                  |
                        v                                  v
Browser paints HTML (Instant FCP) <------------------------+
                        |
React Hydrates Client Components (Interactive)
```

## 6. Performance Considerations
- **Hydration Mismatch:** If the server renders `<p>Time: 12:00</p>` but the client's JS clock renders `<p>Time: 12:01</p>`, React logs a massive hydration error and often forces a full client-side re-render.
- **Bundle Size:** Using `"use client"` forces that component and all its dependencies into the JS bundle sent to the user. Keep components as Server Components by default.

## 7. Security Considerations
- **Exposing Secrets:** If a Server Component passes an API key or DB string as a prop to a Client Component, that secret is exposed in the browser's source code.
- **Route Handlers:** Server-side API routes (`route.ts`) must still implement rate limiting and authentication/authorization before hitting the database.

## 8. Common Mistakes
- **Overusing `"use client"`:** Putting `"use client"` at the very top of `layout.tsx` effectively turns the entire Next.js app back into a massive CSR React app, defeating the purpose of Next.js.
- **Fetching Waterfalls:** 
  ```javascript
  const user = await getUser();
  const posts = await getPosts(); // Waits for user to finish!
  // Fix: await Promise.all([getUser(), getPosts()]);
  ```

## 9. Interview Questions
1. **Q:** What is the difference between SSG and SSR in Next.js?
   **A:** SSG generates the HTML once at build time, serving from a CDN (perfect for blogs). SSR generates the HTML on every incoming request (perfect for personalized dashboards).
2. **Q:** How does Next.js handle image caching and optimization?
   **A:** The `next/image` component requests WebP variants based on the user's screen size, serves them lazily by default, and reserves physical layout space to prevent Cumulative Layout Shift (CLS).
3. **Q:** What is a Server Component?
   **A:** A React component that never ships JS to the client. It renders purely on the server, making it ideal for direct DB calls without exposing APIs or bloating bundle sizes.

## 10. Production-Level Best Practices
- **Interleaving Components:** You can pass Server Components as `children` into Client Components, allowing you to wrap static server data in interactive client wrappers without bloating bundles.
- **Middleware:** Use `middleware.ts` running at the edge to handle authentication checks, redirects, and A/B testing before the request even hits the heavy node server.

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 06_NextJS

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
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 06: Next.js`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **server/client rendering strategies and routing**, with internal behavior centered on **hybrid SSR/SSG/ISR execution pipeline** and state/contracts centered on **route-level data fetching and cache revalidation**.

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
- Start with observable behavior for **server/client rendering strategies and routing** before introducing abstractions.
- Track what inputs produce what outputs in **route-level data fetching and cache revalidation** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **server/client rendering strategies and routing**.
- Analyze execution boundaries in **hybrid SSR/SSG/ISR execution pipeline** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **hybrid SSR/SSG/ISR execution pipeline**.
- Specify invariants around **route-level data fetching and cache revalidation** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **hybrid SSR/SSG/ISR execution pipeline**.
- Primary state domain and contracts: **route-level data fetching and cache revalidation**.
- Dominant architectural risk to isolate: **cache invalidation and boundary confusion between server and client**.

### Real-World Use Cases
- Build or migrate a system where **server/client rendering strategies and routing** is a critical delivery concern.
- Operate high-change environments where **hybrid SSR/SSG/ISR execution pipeline** behavior must stay predictable.
- Harden production paths where failures in **route-level data fetching and cache revalidation** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **hybrid SSR/SSG/ISR execution pipeline**.
- Reduce unnecessary work in **route-level data fetching and cache revalidation** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **route-level data fetching and cache revalidation** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **server/client rendering strategies and routing** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **hybrid SSR/SSG/ISR execution pipeline** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **route-level data fetching and cache revalidation** boundaries.
- Ignoring **cache invalidation and boundary confusion between server and client** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How do you choose between SSR, SSG, ISR, and client fetching for a route with mixed personalization and SEO requirements?
2. What causes hydration mismatches in App Router projects, and how would you debug them quickly in production?
3. How do Server Components and Client Components change bundle size, security boundaries, and data-access patterns?
4. How would you design cache invalidation (`revalidateTag`/`revalidatePath`) for high-change commerce or dashboard pages?
5. Which architectural signals indicate it is time to split a monolithic Next.js app into clearer domains or services?

### Production Best Practices Upgrade
- Define route-by-route rendering policy (SSR/SSG/ISR/CSR) and keep the rationale documented.
- Enforce cache ownership rules so each domain controls revalidation semantics explicitly.
- Track runtime boundaries: what executes on edge/server/client and why.
- Add release checks for hydration errors, route latency budgets, and stale-content tolerances.

### Folder Structure Diagram (Actual)
```text
06_NextJS/
├── 01_code_examples/
│   ├── app_router_server_component.tsx
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
│   ├── 01_parallel_data_fetching.tsx
│   ├── 02_route_handler_validation.ts
│   └── 03_optimistic_ui_client_action.tsx
├── examples/
│   ├── 01_beginner_ssr_page.tsx
│   ├── 02_intermediate_isr_catalog_page.tsx
│   ├── 03_edge_case_hydration_safe_clock.tsx
│   └── advanced-api-route.ts
├── production/
│   ├── 01_middleware_auth_guard.ts
│   ├── 02_cache_tags_revalidation.ts
│   └── 03_edge_rate_limit_route.ts
├── projects/
│   ├── 01_dashboard_server_actions_example.tsx
│   └── 02_blog_listing_with_metadata.tsx
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
- [06_NextJS](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [05_React](../05_React/README.md)
- **Next Module:** [07_Java_Backend](../07_Java_Backend/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
