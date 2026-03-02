package com.fullstack.learning.advanced;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

// Beginner: idempotency key prevents duplicate side effects.
// Advanced: critical for payment/order APIs under retries or client timeouts.
public class IdempotencyKeyService {

    public record IdempotencyRecord(String key, String responseHash, Instant createdAt) {}

    private final Map<String, IdempotencyRecord> records = new ConcurrentHashMap<>();

    public boolean isDuplicateRequest(String key, String responseHash) {
        IdempotencyRecord existing = records.get(key);
        return existing != null && existing.responseHash().equals(responseHash);
    }

    public void save(String key, String responseHash) {
        records.putIfAbsent(key, new IdempotencyRecord(key, responseHash, Instant.now()));
    }
}
