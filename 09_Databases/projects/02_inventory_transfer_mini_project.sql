-- Mini project core: atomic stock transfer between warehouses.
-- Advanced: use transaction + row locks to avoid double-spend of stock.

BEGIN;

SELECT quantity
FROM warehouse_stock
WHERE warehouse_id = 1 AND sku = 'KB-100'
FOR UPDATE;

SELECT quantity
FROM warehouse_stock
WHERE warehouse_id = 2 AND sku = 'KB-100'
FOR UPDATE;

UPDATE warehouse_stock
SET quantity = quantity - 5
WHERE warehouse_id = 1
  AND sku = 'KB-100'
  AND quantity >= 5;

UPDATE warehouse_stock
SET quantity = quantity + 5
WHERE warehouse_id = 2
  AND sku = 'KB-100';

INSERT INTO stock_movements (sku, from_warehouse, to_warehouse, quantity, moved_at)
VALUES ('KB-100', 1, 2, 5, NOW());

COMMIT;
