package com.fullstack.learning.advanced;

import java.util.concurrent.*;

// Beginner: dedicated thread pool isolates expensive work.
// Advanced: bulkhead pattern contains failures and preserves core request path.
public class BulkheadExecutorPattern {

    private final ThreadPoolExecutor paymentExecutor = new ThreadPoolExecutor(
            2,
            4,
            60,
            TimeUnit.SECONDS,
            new ArrayBlockingQueue<>(50),
            new ThreadPoolExecutor.CallerRunsPolicy()
    );

    public Future<String> submitPaymentTask(Callable<String> task) {
        return paymentExecutor.submit(task);
    }

    public void shutdown() {
        paymentExecutor.shutdown();
    }
}
