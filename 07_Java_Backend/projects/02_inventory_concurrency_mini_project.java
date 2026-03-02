package com.fullstack.learning.projects;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

// Mini project core: concurrent inventory updates.
// Beginner: AtomicInteger enables thread-safe stock operations.
// Advanced: lock-free increments reduce contention under high concurrency.
public class InventoryConcurrencyMiniProject {

    private final Map<String, AtomicInteger> stockBySku = new ConcurrentHashMap<>();

    public void initializeSku(String sku, int quantity) {
        stockBySku.putIfAbsent(sku, new AtomicInteger(Math.max(quantity, 0)));
    }

    public int increaseStock(String sku, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("quantity must be positive");
        return stockBySku.computeIfAbsent(sku, ignored -> new AtomicInteger(0)).addAndGet(quantity);
    }

    public int reserveStock(String sku, int quantity) {
        if (quantity <= 0) throw new IllegalArgumentException("quantity must be positive");

        AtomicInteger current = stockBySku.computeIfAbsent(sku, ignored -> new AtomicInteger(0));
        return current.updateAndGet(existing -> existing >= quantity ? existing - quantity : existing);
    }
}
