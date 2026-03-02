-- Beginner: transactions ensure all steps succeed or none apply.
-- Advanced: row-level locking prevents race conditions in concurrent updates.

BEGIN;

-- Lock balance row before debit operation.
SELECT balance
FROM wallet_accounts
WHERE user_id = 1001
FOR UPDATE;

UPDATE wallet_accounts
SET balance = balance - 500
WHERE user_id = 1001
  AND balance >= 500;

INSERT INTO wallet_ledger (user_id, amount, direction, created_at)
VALUES (1001, 500, 'DEBIT', NOW());

COMMIT;

-- If any step fails, use ROLLBACK;
