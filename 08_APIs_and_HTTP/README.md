# Module 08: APIs and HTTP

## 1. Concept Overview
An Application Programming Interface (API) is a set of rules that allow two software systems to communicate. In web development, we use Web APIs over the HTTP protocol to allow our Frontend (React/Next.js) to retrieve and mutate data on our Backend (Java/Node.js).

## 2. Theory from Scratch
- **The Protocol:** HTTP (HyperText Transfer Protocol) is a stateless protocol. Every request is completely independent.
- **REST (REpresentational State Transfer):** The architectural standard for APIs.
  - Treats URLs as "resources" (e.g., `/users`, `/posts`).
  - Uses standard HTTP verbs (methods).
  - Usually returns structured data in JSON format.
- **HTTP Methods:**
  - `GET`: Retrieve data (no body, read-only).
  - `POST`: Create new data.
  - `PUT`: Update/replace existing data entirely.
  - `PATCH`: Partially update data.
  - `DELETE`: Remove data.
- **Status Codes:**
  - `2xx`: Success (`200 OK`, `201 Created`).
  - `3xx`: Redirection (`301 Moved Permanently`).
  - `4xx`: Client Error (`400 Bad Request`, `401 Unauthorized`, `404 Not Found`).
  - `5xx`: Server Error (`500 Internal Server Error`, `502 Bad Gateway`).

## 3. Internal Working (Under the Hood)
When calling `fetch('https://api.example.com/users')`:
1. The browser resolves the IP and performs the TCP/TLS handshakes.
2. It constructs an HTTP Request string:
   ```http
   GET /users HTTP/1.1
   Host: api.example.com
   Authorization: Bearer xyz123
   Accept: application/json
   ```
3. The server's reverse proxy (Nginx) receives the request and forwards it to the application logic (Spring Boot / Node).
4. The backend queries the database, serializes the Object array into a JSON string, and responds:
   ```http
   HTTP/1.1 200 OK
   Content-Type: application/json

   [{"id": 1, "name": "Deepak"}]
   ```

## 4. Why it is used in Production
REST APIs decouple the frontend from the backend. The same Java API backend can simultaneously serve a React Web App, an iOS App, an Android App, and a Python data science script, because JSON over HTTP is universally understood by every language.

## 5. Architecture Diagrams

**Three-Tier Architecture API Flow:**
```text
                          +-------------------------+
   GET /api/v1/orders     |   Web Server (Nginx)    |
   Authorization: JWT     |   (SSL Termination,     |
------------------------->|    Rate Limiting)       |
<-------------------------|                         |
   200 OK                 +------------+------------+
   [{"id":1, "total":90}]              |
                                       v
                          +------------+------------+
                          |  App Server (Spring)    |
                          |  - Parses JWT           |
                          |  - Validates Request    |
                          |  - Runs Business Logic  |
                          +------------+------------+
                                       |
                     SELECT * FROM orders WHERE user_id=1;
                                       v
                          +------------+------------+
                          |        Database         |
                          |       (PostgreSQL)      |
                          +-------------------------+
```

## 6. Performance Considerations
- **Pagination:** Never return `GET /users` with 10,000 records. Always use limit/offset OR cursor-based pagination (e.g., `?page=1&limit=20`) to save DB memory and network bandwidth.
- **Caching:** Browsers and CDNs respect cache headers (`Cache-Control: max-age=3600`). Heavy calculations that rarely change should be cached at the edge. ETag headers allow the client to ask "Has this changed since I last saw it?" and the server responds `304 Not Modified` with an empty body, saving massive bandwidth.

## 7. Security Considerations
- **CORS (Cross-Origin Resource Sharing):** Browsers block scripts from `domainA.com` making requests to `domainB.com` unless `domainB` explicitly replies with a `Access-Control-Allow-Origin: domainA.com` HTTP header.
- **Rate Limiting:** Protect APIs from DoS (Denial of Service) attacks or brute-forcing by limiting a single IP to ~100 requests per minute (returning `429 Too Many Requests`).
- **Input Validation:** Assume *all* incoming JSON payloads are malicious. Validate types, max lengths, and emails BEFORE hitting the database to prevent injection or crash loops.

## 8. Common Mistakes
- **Mixing Verbs and URLs:** Anti-pattern: `POST /createUser` or `GET /deleteUser?id=1`. The RESTful standard is `POST /users` and `DELETE /users/1`. URLs are nouns, Methods are verbs.
- **Failing Silently:** Catching an error on the backend and returning HTTP `200 OK` with `{ error: "User not found" }`. This breaks standard HTTP tooling and clients. Return a `404 Not Found` status code.
- **Hardcoding URLs:** In the frontend, never hardcode `http://localhost:8080/api` into components. Use environment variables `process.env.API_URL` so staging and production deploys switch domains seamlessly.

## 9. Interview Questions
1. **Q:** What makes an API "RESTful"?
   **A:** It must follow 6 constraints: Client-Server architecture, Statelessness (each request contains all needed info), Cacheable parameters, Uniform Interface (using standard HTTP verbs on resource nouns), Layered System, and Code on Demand (optional).
2. **Q:** Explain CORS and how the Preflight request works.
   **A:** CORS relaxes the same-origin policy securely. For complex requests (like `PUT` or a custom `Authorization` header), the browser automatically sends a hidden `OPTIONS` request (Preflight) to ask the server "Am I allowed to do this?". If the server says yes, the actual `PUT` is dispatched.
3. **Q:** What is GraphQL and how does it compare to REST?
   **A:** GraphQL exposes a single endpoint (`POST /graphql`). Instead of the server deciding what data is returned, the client specifies exactly what shape and fields it wants. This solves REST's over-fetching and under-fetching problems.

## 10. Production-Level Best Practices
- **Versioning:** Always prefix endpoints with a version (e.g., `/api/v1/users`). When a breaking change is required, introduction `/v2` while leaving `/v1` alive for older mobile apps that users haven't updated yet.
- **Document with Swagger / OpenAPI:** Do not maintain a Word document describing your API. Use code annotations (SpringFox/OpenAPI) to automatically generate an interactive HTML documentation page for front-end developers to test against.
- **Idempotency Keys:** For critical `POST` actions (like processing a payment), require the client to generate a unique UUID and send it in a header (`Idempotency-Key`). If the network drops and the client clicks "Pay" twice, the backend checks the key and refuses to charge the card twice.
