package com.fullstack.learning.production;

import java.time.Instant;
import java.util.Map;

// Beginner: structured logs are easier to search than plain strings.
// Advanced: requestId correlation supports distributed tracing and incident debugging.
public class StructuredRequestLogger {

    public String buildLogLine(String level, String message, Map<String, Object> metadata) {
        StringBuilder builder = new StringBuilder();
        builder.append('{')
                .append("\"timestamp\":\"").append(Instant.now()).append("\",")
                .append("\"level\":\"").append(level).append("\",")
                .append("\"message\":\"").append(message).append("\"");

        for (Map.Entry<String, Object> entry : metadata.entrySet()) {
            builder.append(',').append("\"").append(entry.getKey()).append("\":\"")
                    .append(String.valueOf(entry.getValue())).append("\"");
        }

        builder.append('}');
        return builder.toString();
    }
}
