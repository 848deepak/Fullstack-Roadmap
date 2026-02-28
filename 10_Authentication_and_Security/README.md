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
