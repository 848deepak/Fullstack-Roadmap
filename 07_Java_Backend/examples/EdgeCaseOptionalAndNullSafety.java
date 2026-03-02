package com.fullstack.learning.examples;

import java.util.Optional;

// Beginner: Optional makes nullable results explicit.
// Advanced: avoids defensive null-check sprawl and clarifies API contracts.
public class EdgeCaseOptionalAndNullSafety {

    static class User {
        final String email;

        User(String email) {
            this.email = email;
        }
    }

    public Optional<String> findUserEmail(User user) {
        return Optional.ofNullable(user)
                .map(u -> u.email)
                .filter(email -> email.contains("@"));
    }

    public String findUserEmailOrFallback(User user) {
        return findUserEmail(user).orElse("unknown@example.com");
    }
}
