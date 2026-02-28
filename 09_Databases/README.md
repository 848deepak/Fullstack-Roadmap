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
