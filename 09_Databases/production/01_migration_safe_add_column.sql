-- Production migration pattern: safe additive change.
-- Beginner: add nullable column first.
-- Advanced: backfill in batches, then enforce constraints.

ALTER TABLE app_users
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20);

-- Backfill can be batched in real systems to avoid long locks.
UPDATE app_users
SET phone_number = 'UNKNOWN'
WHERE phone_number IS NULL;

ALTER TABLE app_users
ALTER COLUMN phone_number SET NOT NULL;
