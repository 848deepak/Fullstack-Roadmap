# Module 17: Monitoring and Logging

## 1. Concept Overview
When your application is running in production with thousands of users, it acts as a black box. **Monitoring** involves tracking metrics (CPU, Memory, Request Latency) to ensure system health. **Logging** involves capturing detailed text events (Errors, Transactions) to tell you *exactly what happened* when the system inevitably breaks.

## 2. Theory from Scratch
- **Metrics vs Logs vs Traces:**
  - **Metrics:** Aggregate numeric data over time ("CPU is at 95%", "500 errors spiked to 50/min"). Great for alerting.
  - **Logs:** Discrete timestamped events ("User 123 failed login due to bad password"). Great for deep debugging.
  - **Traces:** Tracks a single user request as it bounces across 5 different microservices (Frontend -> API -> Auth -> DB).
- **The ELK Stack (Logging):** Elasticsearch (Search engine), Logstash (Data pipeline), Kibana (Visualization Dashboard).
- **Prometheus & Grafana (Monitoring):** Prometheus continually pulls ("scrapes") metric numbers from your servers. Grafana displays those numbers on beautiful visual dashboards.

## 3. Internal Working (Under the Hood)
### Structured Logging
Historically, developers used `console.log("Error connecting to DB")`. In massive systems, searching through a billion lines of plain text is impossible. 
Modern apps use **Structured JSON Logging**.
```json
{"timestamp": "2024-10-12T10:00:00Z", "level": "ERROR", "service": "auth-api", "userId": "123", "message": "DB timeout", "latencyMs": 5002}
```
Logstash parses this JSON instantly. Kibana allows you to search: `level=ERROR AND userId=123` bringing up the exact crash instantly out of millions of records.

## 4. Why it is used in Production
Without monitoring, the first time you learn your site is down is when angry customers tweet at you. Proper monitoring detects a memory leak (RAM hitting 90%) and pages the On-Call DevOps engineer automatically via PagerDuty/Slack *before* the server actually crashes.

## 5. Architecture Diagrams

**Standard Logging & Monitoring Pipeline:**
```text
           [ Java API ]                  [ Node.js Web ]
         (Generates JSON Logs)        (Generates JSON Logs)
                 |                             |
                 v                             v
   [ Filebeat / Fluentd (Log Shippers on the Host Machine) ]
                 |
                 v
   [ Logstash (Filters / Formats / Cleans data) ]
                 |
                 v
   [ Elasticsearch (Massive NoSQL Search Engine Index) ]
                 |
                 v
   [ Kibana (Web UI Dashboard / Search Bar) ] <-- DevOps Engineer
```

## 6. Performance Considerations
- **Log Levels in Prod:** Logging every `DEBUG` and `INFO` message for 10 million daily requests will instantly fill up your hard drives and incur massive Elasticsearch bills. Production environments should usually only log `WARN` and `ERROR` levels.
- **Asynchronous Logging:** If disk I/O is slow, synchronous logging can bottleneck HTTP requests. Use asynchronous appenders (like Logback Async in Java) so the main thread moves on immediately while a background thread writes to the disk.

## 7. Security Considerations
- **PII / Secret Masking:** NEVER log passwords, credit card numbers, or Personal Identifiable Information (SSN/Emails) in plain text. If a developer views the Kibana dashboard, they just breached GDPR compliance. Use regex filters in your logging library to mask `<password>****</password>`.
- **Log Injection:** If a user submits `\n[2024] [ADMIN] Granted full access`, without escaping newlines, they can manipulate your log files.

## 8. Common Mistakes
- **Silent Catch Blocks:** 
  ```javascript
  try { connectDB(); } catch(e) { /* do nothing */ }
  ```
  The feature is completely broken, but because the error is swallowed and not logged, the monitoring dashboards look 100% perfectly green.
- **Alert Fatigue:** Setting up monitoring rules mathematically incorrectly so it sends a Slack alert every 5 minutes. Engineers get "Alert Fatigue" and start ignoring the alerts entirely, missing the actual severe outage.

## 9. Interview Questions
1. **Q:** What is the difference between Prometheus and the ELK stack?
   **A:** Prometheus is a time-series database designed specifically for numbers/metrics (tracking CPU % over time). ELK is a document store designed for unstructured or structured text (searching for specific error logs).
2. **Q:** How do you trace a request across microservices?
   **A:** Distributed Tracing (OpenTelemetry / Jaeger). The very first API creates a unique `correlation_id` (UUID). It passes this ID in the HTTP headers to every subsequent downstream service. You query that single ID in the logging dashboard to see the entire journey.
3. **Q:** What are standard Log Levels?
   **A:** From least to most severe: TRACE -> DEBUG -> INFO -> WARN -> ERROR -> FATAL.

## 10. Production-Level Best Practices
- **Standardized Formats:** Ensure the React frontend, the Java API, and the Python Data script all output logs in the *exact same JSON schema*.
- **Anomaly Detection:** Instead of setting a hard alert "If CPU > 90%", use Machine Learning APM tools (Datadog/NewRelic) that alert you if "Traffic is 40% lower than the historical average for a Tuesday morning" (Detecting an invisible network routing issue).
