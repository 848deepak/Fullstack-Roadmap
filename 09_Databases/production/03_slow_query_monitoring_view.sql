-- Beginner: track slow queries for optimization opportunities.
-- Advanced: use pg_stat_statements in production for aggregate query insights.

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- High-cost statements by total execution time.
SELECT
  query,
  calls,
  round(total_exec_time::numeric, 2) AS total_ms,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;
