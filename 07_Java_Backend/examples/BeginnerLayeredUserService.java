package com.fullstack.learning.examples;

import java.util.*;

// Beginner: clear service + repository separation.
// Advanced: structure makes persistence layer replaceable without touching business logic.
public class BeginnerLayeredUserService {

    static class User {
        public final long id;
        public final String name;
        public final String email;

        User(long id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }
    }

    interface UserRepository {
        Optional<User> findById(long id);
        User save(User user);
    }

    static class InMemoryUserRepository implements UserRepository {
        private final Map<Long, User> users = new HashMap<>();

        @Override
        public Optional<User> findById(long id) {
            return Optional.ofNullable(users.get(id));
        }

        @Override
        public User save(User user) {
            users.put(user.id, user);
            return user;
        }
    }

    static class UserService {
        private final UserRepository userRepository;

        UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public User createUser(long id, String name, String email) {
            if (name == null || name.trim().length() < 2) throw new IllegalArgumentException("Invalid name");
            if (email == null || !email.contains("@")) throw new IllegalArgumentException("Invalid email");
            return userRepository.save(new User(id, name.trim(), email.toLowerCase()));
        }

        public Optional<User> getUser(long id) {
            return userRepository.findById(id);
        }
    }
}
