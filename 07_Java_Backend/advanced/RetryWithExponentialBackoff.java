package com.fullstack.learning.advanced;

import java.time.Duration;
import java.util.function.Supplier;

// Beginner: retries transient failures for unstable dependencies.
// Advanced: exponential backoff + cap avoids overload during outages.
public class RetryWithExponentialBackoff {

    public static <T> T executeWithRetry(Supplier<T> operation, int maxAttempts, Duration baseDelay) {
        RuntimeException lastException = null;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return operation.get();
            } catch (RuntimeException ex) {
                lastException = ex;
                if (attempt == maxAttempts) break;

                long delayMs = Math.min(baseDelay.toMillis() * (1L << (attempt - 1)), 2_000L);
                try {
                    Thread.sleep(delayMs);
                } catch (InterruptedException interrupted) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Retry interrupted", interrupted);
                }
            }
        }

        throw new RuntimeException("Operation failed after retries", lastException);
    }
}
