package com.fullstack.learning;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Beginner: A REST controller handles HTTP requests and returns JSON responses.
// Advanced: Keep controllers thin and move business rules to services.
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping("/{id}")
    public UserResponse getUserById(@PathVariable long id) {
        return new UserResponse(id, "User " + id, "user" + id + "@example.com");
    }

    public record UserResponse(long id, String name, String email) {}
}
