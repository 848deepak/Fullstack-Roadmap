-- Beginner: base schema with PK, UNIQUE, and FK constraints.
-- Advanced: constraints protect data integrity before application logic runs.

CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT NOT NULL REFERENCES customers(id),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  status VARCHAR(30) NOT NULL DEFAULT 'CREATED',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Edge case: duplicated email should fail because of UNIQUE constraint.
-- INSERT INTO customers (email, full_name) VALUES ('a@b.com', 'A');
-- INSERT INTO customers (email, full_name) VALUES ('a@b.com', 'B');
