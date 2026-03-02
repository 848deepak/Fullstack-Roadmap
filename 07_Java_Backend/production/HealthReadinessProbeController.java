package com.fullstack.learning.production;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// Beginner: health endpoints indicate app status.
// Advanced: separate liveness and readiness for Kubernetes-safe rollouts.
@RestController
@RequestMapping("/health")
public class HealthReadinessProbeController {

    @GetMapping("/live")
    public ResponseEntity<Map<String, String>> liveness() {
        return ResponseEntity.ok(Map.of("status", "UP"));
    }

    @GetMapping("/ready")
    public ResponseEntity<Map<String, String>> readiness() {
        boolean databaseReachable = true; // Replace with real dependency check.
        if (!databaseReachable) {
            return ResponseEntity.status(503).body(Map.of("status", "NOT_READY"));
        }
        return ResponseEntity.ok(Map.of("status", "READY"));
    }
}
