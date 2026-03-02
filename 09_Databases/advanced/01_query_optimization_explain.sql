-- Beginner: EXPLAIN shows how DB plans to run query.
-- Advanced: ANALYZE + BUFFERS reveals actual runtime and I/O hotspots.

EXPLAIN ANALYZE
SELECT o.id, o.created_at, oi.quantity, oi.unit_price
FROM customer_orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.user_id = 42
ORDER BY o.created_at DESC
LIMIT 20;

-- Optimization hint: ensure index on (user_id, created_at DESC).
CREATE INDEX IF NOT EXISTS idx_orders_user_created_at
ON customer_orders(user_id, created_at DESC);
