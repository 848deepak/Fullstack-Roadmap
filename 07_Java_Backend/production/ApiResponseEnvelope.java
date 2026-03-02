package com.fullstack.learning.production;

import java.time.Instant;

// Beginner: unified response wrapper gives consistent API shape.
// Advanced: enables global middleware, observability tags, and safer client contracts.
public class ApiResponseEnvelope<T> {

    private final String timestamp;
    private final boolean success;
    private final T data;
    private final String errorCode;
    private final String message;

    private ApiResponseEnvelope(boolean success, T data, String errorCode, String message) {
        this.timestamp = Instant.now().toString();
        this.success = success;
        this.data = data;
        this.errorCode = errorCode;
        this.message = message;
    }

    public static <T> ApiResponseEnvelope<T> ok(T data) {
        return new ApiResponseEnvelope<>(true, data, null, null);
    }

    public static <T> ApiResponseEnvelope<T> fail(String errorCode, String message) {
        return new ApiResponseEnvelope<>(false, null, errorCode, message);
    }

    public String getTimestamp() { return timestamp; }
    public boolean isSuccess() { return success; }
    public T getData() { return data; }
    public String getErrorCode() { return errorCode; }
    public String getMessage() { return message; }
}
