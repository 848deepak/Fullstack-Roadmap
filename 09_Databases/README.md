# Module 09: Databases

## 1. Concept Overview
A web application without a database is just a static page. Databases store the entire persistable state of an application (users, posts, orders, configurations). They are optimized for massively fast concurrent reads and writes, durability, and crash recovery.

## 2. Theory from Scratch
- **Relational Databases (SQL):** e.g., PostgreSQL, MySQL.
  - Data is organized into strict 2D tables (`Users`, `Orders`).
  - Columns represent data fields (Name, Email), Rows represent individual records.
  - Tables are linked via Foreign Keys (`Orders` table has a `user_id` column linking to `Users.id`).
- **Non-Relational Databases (NoSQL):** e.g., MongoDB, DynamoDB.
  - Data is stored as flexible JSON-like documents.
  - No strict schema (User A can have an `age` field, User B can lack it without schema errors).
  - Designed for horizontal scaling (sharding across multiple machines).

## 3. Internal Working (Under the Hood)
### How Data is Actually Stored (B-Trees)
Databases don't simply write lines to a text file. Relational databases physically store data sorted by their Primary Key on your hard drive, structured as a **B-Tree** (Balanced Tree). 
When you search for `id = 50`, the database traverses the tree nodes (O(log N)) to instantly pinpoint the physical disk sector, rather than scanning all 10 million rows.

### The Write Process (WAL)
When you run `INSERT INTO users`, the database doesn't immediately write it to the massive table file (which is slow). It appends the command to a **Write-Ahead Log (WAL)** (which is blazing fast). Even if the server crashes 1 millisecond later, upon reboot, the DB reads the WAL and finishes writing the data to the main tables, ensuring zero data loss.

## 4. Why it is used in Production
If a Node.js API stored its state in a variable `let users = []`, the moment the server process restarted (for an update or crash), all data would vanish instantly. Databases live on persistent SSD volumes, survive reboots, and manage hundreds of thousands of simultaneous read/write locks that application languages aren't built to handle safely.

## 5. Architecture Diagrams

**RDBMS Table Relationship vs Document Store:**

```text
       SQL (Relational)                      NoSQL (Document)

+---------+      +----------+          {
| Users   |      | Orders   |            "_id": 1,
+--+------+      +------+---+            "name": "Deepak",
|id| name | 1:M  |id|uid|amt|            "orders": [
+--+------+      +--+---+---+              {"id": 101, "amount": 50},
|1 | Deep |----->|1 | 1 | 50|              {"id": 102, "amount": 25}
|2 | Sam  |      |2 | 1 | 25|            ]
+--+------+      |3 | 2 | 90|          }
                 +--+---+---+
```

## 6. Performance Considerations
- **Indexing:** If you frequently query `WHERE email = 'a@b.com'`, scanning a million rows is disastrous. Creating an index (`CREATE INDEX idx_email ON users(email)`) creates an auxiliary B-Tree solely for emails. Lookups drop from O(N) to O(log N).
- **The Tradeoff:** Indexes make reads 1000x faster, but make writes `INSERT/UPDATE/DELETE` slightly slower (because the DB must update the table AND the B-Tree index). Do not index every column.
- **Connection Limits:** A 2 CPU PostgreSQL instance might only allow ~100 simultaneous network connections. Application servers MUST use Connection Pooling to funnel thousands of HTTP requests through these limited pipes.

## 7. Security Considerations
- **SQL Injection:** A malicious user types `'; DROP TABLE users; --` into a login field. Without validation, the query string parses this as a command and deletes your database. ORMs (like Prisma/Hibernate) or Parameterized Queries physically separate the query logic from the variable data, preventing this entirely.

## 8. Common Mistakes
- **Selecting Everything:** `SELECT * FROM Orders` implies transferring 50 columns over the network when the UI only required 2 (`date`, `amount`). Explicitly list columns (`SELECT date, amount FROM Orders`).
- **N+1 Query Issue in ORMs:** Looping through a list of Users and querying the Comments for each user individually inside the for-loop causes 101 queries. Use `.include()` or prefetching to grab everything in 2 queries total.
- **No Backups:** Failing to run automated CRON jobs to create physical `.dump` backups and ship them to an isolated S3 bucket. Disks fail daily in the cloud.

## 9. Interview Questions
1. **Q:** What does ACID stand for in relational databases?
   **A:** **Atomicity** (all parts of a transaction succeed, or the whole thing is rolled back), **Consistency** (data must be valid according to defined rules/constraints), **Isolation** (concurrent transactions don't interfere with each other), **Durability** (once committed, it survives a power loss).
2. **Q:** Explain Database Normalization.
   **A:** Organizing columns and tables to reduce data redundancy. Instead of storing Dept Name "Engineering" on 10,000 employee rows, store a Dept_ID and put "Engineering" in a separate Departments table exactly once. (1st, 2nd, 3rd Normal Forms).
3. **Q:** What is the CAP Theorem for distributed systems?
   **A:** A distributed database can only provide 2 of the 3 guarantees simultaneously: **Consistency** (all nodes see the same data), **Availability** (every request receives a non-error response), **Partition Tolerance** (the system functions despite network drops).

## 10. Production-Level Best Practices
- **Migrations:** Never manually run `CREATE TABLE` commands in production via a GUI. Use schema migration tools (e.g., Flyway, Prisma Migrate). Migrations are code: they live in version control, are reviewed, and applied automatically by CI/CD pipelines.
- **Read Replicas:** When an application receives heavy traffic (like Twitter), writes go to one Master database, but the data is mirrored instantly to 5 Read-Replica databases. The frontend distributes all `GET` requests across the replicas, vastly increasing capacity.

<!-- DOCS_UPGRADE_V2026_START -->
## Documentation Upgrade Layer

### Breadcrumb Navigation
[Home](../README.md) > 09_Databases

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
This documentation extension preserves all existing module theory while adding architecture-level depth for `Module 09: Databases`. This README captures the module-level architecture narrative and practical learning progression. The dominant learning axis here is **data modeling, query strategy, and consistency**, with internal behavior centered on **query planning, indexing, locking, and transactions** and state/contracts centered on **normalized relational entities and access patterns**.

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
- Start with observable behavior for **data modeling, query strategy, and consistency** before introducing abstractions.
- Track what inputs produce what outputs in **normalized relational entities and access patterns** workflows.
- Use one example at a time and explain expected behavior before extending it.

### Intermediate Perspective
- Connect module outputs to neighboring layers and contracts impacted by **data modeling, query strategy, and consistency**.
- Analyze execution boundaries in **query planning, indexing, locking, and transactions** to find bottlenecks and race conditions.
- Compare implementation options using maintainability, operability, and migration cost.

### Advanced Internal Working
- Model normal-path and failure-path control flow for **query planning, indexing, locking, and transactions**.
- Specify invariants around **normalized relational entities and access patterns** that must hold under scale and partial failure.
- Document rollback and recovery behavior before introducing optimization layers.

### Under-the-Hood Architecture
- Core execution model in this module: **query planning, indexing, locking, and transactions**.
- Primary state domain and contracts: **normalized relational entities and access patterns**.
- Dominant architectural risk to isolate: **unbounded query cost, contention, and data inconsistency**.

### Real-World Use Cases
- Build or migrate a system where **data modeling, query strategy, and consistency** is a critical delivery concern.
- Operate high-change environments where **query planning, indexing, locking, and transactions** behavior must stay predictable.
- Harden production paths where failures in **normalized relational entities and access patterns** handling have business impact.

### Performance Considerations Upgrade
- Benchmark latency and throughput at boundaries affected by **query planning, indexing, locking, and transactions**.
- Reduce unnecessary work in **normalized relational entities and access patterns** processing paths before micro-optimizations.
- Track p95/p99 under burst traffic and verify graceful degradation behavior.

### Security Considerations Upgrade
- Protect trust boundaries around **normalized relational entities and access patterns** with strict validation and least privilege.
- Review abuse scenarios that exploit weak assumptions in **data modeling, query strategy, and consistency** flows.
- Add auditability for privileged operations and incident reconstruction.

### Edge Cases and Limitations
- Invalid input types, partial payloads, and schema drift across versions.
- Concurrency conflicts, race conditions, and eventual consistency gaps in distributed flows.
- Environment-specific behavior differences (local, CI, staging, production).

### Common Mistakes Upgrade
- Treating **query planning, indexing, locking, and transactions** behavior as deterministic without measuring it under load.
- Introducing abstractions before clarifying ownership of **normalized relational entities and access patterns** boundaries.
- Ignoring **unbounded query cost, contention, and data inconsistency** until late integration or production rollout.

### Interview-Level Theory Questions Upgrade
1. How would you choose between normalized relational design and denormalized read models for a high-traffic commerce domain?
2. A transaction-heavy API shows deadlocks under load. How would you identify lock order issues and redesign transaction scope safely?
3. Compare optimistic locking, pessimistic locking, and version columns for consistency-sensitive write paths.
4. How do you design an indexing strategy that improves read latency without over-penalizing writes and storage?
5. What migration strategy would you use to add a non-null column to a billion-row table with near-zero downtime?

### Production Best Practices Upgrade
- Treat schema changes as staged rollouts: expand schema, deploy backward-compatible app code, backfill safely, then enforce constraints.
- Monitor slow-query logs and execution plans continuously; convert recurring high-cost patterns into indexed or rewritten queries.
- Cap transaction scope and duration to reduce lock contention, and keep write paths deterministic under concurrent load.
- Automate backup verification and point-in-time recovery drills, not just backup creation.
- Separate OLTP and analytical workloads with replicas or dedicated systems to protect critical user-facing latency.

### Folder Structure Diagram (Actual)
```text
09_Databases/
├── 01_code_examples/
│   ├── README.md
│   └── schema_and_indexing.sql
├── 02_practice_problems/
│   └── README.md
├── 03_interview_questions/
│   └── README.md
├── 04_mini_project/
│   └── README.md
├── 05_advanced_deep_dive/
│   └── README.md
├── advanced/
│   ├── 01_query_optimization_explain.sql
│   ├── 02_partitioning_strategy.sql
│   └── 03_nosql_document_patterns.js
├── examples/
│   ├── 01_beginner_schema_constraints.sql
│   ├── 02_intermediate_transactions_and_locks.sql
│   └── 03_edge_case_null_and_data_quality.sql
├── production/
│   ├── 01_migration_safe_add_column.sql
│   ├── 02_backup_restore_validation.sh
│   └── 03_slow_query_monitoring_view.sql
├── projects/
│   ├── 01_ecommerce_schema_mini_project.sql
│   └── 02_inventory_transfer_mini_project.sql
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
- [09_Databases](README.md)
- [System Design](../11_System_Design/README.md)
- [Testing](../16_Testing/README.md)
- [Production Architecture](../20_Production_Architecture/README.md)

### Navigation
- **Previous Module:** [08_APIs_and_HTTP](../08_APIs_and_HTTP/README.md)
- **Next Module:** [10_Authentication_and_Security](../10_Authentication_and_Security/README.md)

<!-- DOCS_UPGRADE_V2026_END -->
