-- Beginner: partition large tables to keep queries fast.
-- Advanced: monthly range partitions reduce index size and improve pruning.

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL,
  event_type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL
) PARTITION BY RANGE (created_at);

CREATE TABLE IF NOT EXISTS events_2026_01 PARTITION OF events
FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE IF NOT EXISTS events_2026_02 PARTITION OF events
FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');

CREATE INDEX IF NOT EXISTS idx_events_2026_02_type_created
ON events_2026_02(event_type, created_at DESC);
