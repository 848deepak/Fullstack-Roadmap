-- Beginner: handle NULL explicitly in filters and aggregates.
-- Advanced: nullable columns can silently skew analytics without COALESCE/IS NULL checks.

CREATE TABLE IF NOT EXISTS tickets (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  priority VARCHAR(20),
  resolved_at TIMESTAMP NULL
);

-- Edge case: unresolved tickets have NULL resolved_at, so use IS NULL (not = NULL).
SELECT id, title
FROM tickets
WHERE resolved_at IS NULL;

-- Edge case: NULL priorities appear in GROUP BY; COALESCE for stable reporting.
SELECT COALESCE(priority, 'UNSPECIFIED') AS normalized_priority, COUNT(*)
FROM tickets
GROUP BY COALESCE(priority, 'UNSPECIFIED');
