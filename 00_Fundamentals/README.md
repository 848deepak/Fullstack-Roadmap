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
