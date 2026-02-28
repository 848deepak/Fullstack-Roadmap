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
