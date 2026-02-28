# Module 18: Backup and Disaster Recovery

## 1. Concept Overview
Disasters *will* happen. A data center might catch fire, an intern might accidentally run `DROP TABLE Users` on production, or a ransomware attack might encrypt the entire primary database. Backup and Disaster Recovery (DR) is the systematic discipline of ensuring data survival and minimizing downtime when catastrophe strikes.

## 2. Theory from Scratch
- **RTO (Recovery Time Objective):** How quickly must the system be back online? (e.g., "The site can be down for 4 hours maximum").
- **RPO (Recovery Point Objective):** How much data are you willing to lose? (e.g., "We can tolerate losing the last 15 minutes of transactions").
- **Cold Standby:** Backups pushed to cheap storage (S3 Glacier). Recovery takes hours because it requires provisioning new servers and downloading terabytes of data.
- **Warm Standby:** A secondary database running in the background. Recovery takes minutes (simply switching the DNS traffic).
- **Hot Standby:** Full active-active mirrored infrastructure taking live traffic in multiple regions. Zero downtime.

## 3. Internal Working (Under the Hood)
### The 3-2-1 Backup Strategy
A production standard rule:
- **3** Copies of your data. (Primary Data + 2 Backups).
- **2** Different storage media. (e.g., Fast SSD volume + Cheap S3 Object Storage).
- **1** Copy strictly **Offsite** (e.g., Primary database in AWS US-East, Backup physically located in AWS EU-West to survive a regional outage).

## 4. Why it is used in Production
Without DR, a single mistake permanently destroys a company. If you lose user financial records and cannot restore them, the company faces immediate bankruptcy and regulatory lawsuits. Regular backups provide an absolute technical safety net against human error and malicious actors.

## 5. Architecture Diagrams

**Cross-Region Disaster Recovery:**
```text
           [ Route 53 DNS (Health Checks) ]
             |                      |
      Healthy (Primary)      Failed (Fallback)
             |                      |
             v                      v
    +------------------+   +------------------+
    | AWS US-EAST-1    |   | AWS US-WEST-2    |
    | (Virginia)       |   | (Oregon)         |
    |                  |   |                  |
    | [ Load Balancer ]|   | [ Load Balancer ]| (Standby)
    | [ App Servers ]  |   | [ App Servers ]  | (Scale=0)
    | [ Master DB ]    |---|>[ Read Replica ] | (Async Replication)
    +------------------+   +------------------+
                                     |
                          [ Nightly CRON S3 Dump ]
```

## 6. Performance Considerations
- **Backup Windows:** Running a massive `pg_dump` on a 500GB database consumes immense CPU/Disk I/O, slowing down active user queries. Backups must run during non-peak hours (e.g., 3:00 AM) or be executed entirely against a Read-Replica DB so the Master DB remains 100% focused on live traffic.

## 7. Security Considerations
- **Encryption at Rest:** Backups stored in S3 must be encrypted (e.g., AES-256). If an S3 bucket is leaked, the downloaded `backup.sql` file is useless binary garbage without the KMS decryption key.
- **Immutability (Object Lock):** Ransomware hackers will delete your backups before encrypting your primary database. S3 Object Lock enforces a strict Write-Once-Read-Many (WORM) policy, making it physically impossible for *anyone* (even the AWS Root account) to delete the backup for 30 days.

## 8. Common Mistakes
- **Schrödinger's Backup:** Generating backups daily but *never actually testing the restoration process*. When disaster strikes, you realize the backup scripts have been silently corrupting the geometry data format for 6 months. Test restores monthly.
- **Backing up the Cloud Console:** Relying entirely on manual AWS Console snapshots. DR infrastructure must be defined in Infrastructure-as-Code (Terraform) so the entire VPC can be recreated in a new region pressing `Enter`.

## 9. Interview Questions
1. **Q:** What is the difference between RTO and RPO?
   **A:** RPO is the maximum acceptable data loss (Time measured *backwards* from the disaster). RTO is the maximum acceptable downtime (Time measured *forwards* from the disaster until the system is restored).
2. **Q:** Explain Active-Passive vs Active-Active architectures.
   **A:** Active-Passive means a primary system takes 100% of traffic, while a hot-standby system idles and only takes over if the primary fails. Active-Active means both systems take live traffic simultaneously (very hard to implement due to database split-brain sync issues).

## 10. Production-Level Best Practices
- **Point-in-Time Recovery (PITR):** Modern Managed DBs (AWS RDS) allow PITR. If a developer deleted a table at exactly 14:32:01, you can roll the entire database back to exactly 14:32:00, preventing the need for a full daily dump restore.
- **Chaos Engineering:** Intentionally shutting down random production servers in the middle of the day (e.g., Netflix's Chaos Monkey) to forcefully prove that the automated DR systems actually work.
