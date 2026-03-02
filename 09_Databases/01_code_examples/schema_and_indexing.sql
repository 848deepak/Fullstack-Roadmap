-- Beginner: Basic relational table for users.
-- Advanced: Use indexes carefully to balance read speed and write cost.
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_full_name ON users(full_name);

SELECT id, email, full_name
FROM users
ORDER BY created_at DESC
LIMIT 20;
