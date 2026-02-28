package com.techblog.application.service;

import com.techblog.application.model.User;
import com.techblog.application.repository.UserRepository;
import com.techblog.application.dto.UserResponseDto;
import com.techblog.application.exception.UserNotFoundException;
import com.techblog.application.exception.TransactionFailedException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ==========================================
 * JAVA SPRING BOOT PRODUCTION SERVICE LAYER
 * ==========================================
 * 
 * Demonstrates:
 * 1. Dependency Injection (@Autowired)
 * 2. ACID Transactions (@Transactional)
 * 3. Redis Caching strategies (@Cacheable, @CacheEvict)
 * 4. DTO (Data Transfer Object) mapping stream patterns
 * 5. Custom Exception Handling and Logging (SLF4J)
 */
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    // 1. Dependency Injection via Constructor (Best Practice over Field Injection)
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    @Autowired
    public UserService(UserRepository userRepository, AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    /**
     * Cacheable: The first time this method is called for ID 5, it hits the DB.
     * The result is stored in Redis under the "users" cache.
     * Subsequent calls within the TTL bypass the DB entirely and return in ~1ms.
     */
    @Cacheable(value = "users", key = "#id")
    public UserResponseDto getUserById(Long id) {
        logger.debug("Fetching user with ID: {}", id);

        // Using Optional handles null safety gracefully
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));

        return mapToDto(user);
    }

    public List<UserResponseDto> getActiveUsers() {
        return userRepository.findByIsActiveTrue()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Transactional: If ANY exception occurs inside this method (e.g., audit log
     * fails),
     * the entire database transaction rolls back automatically.
     * The user's status will NOT be updated. This guarantees data consistency.
     * 
     * CacheEvict: Since the data changed, we MUST purge the old Redis cache
     * so that the next `getUserById` gets fresh data.
     */
    @Transactional(rollbackFor = Exception.class)
    @CacheEvict(value = "users", key = "#id")
    public UserResponseDto banUser(Long id, Long adminId, String reason) {
        logger.info("Admin {} attempting to ban User {}", adminId, id);

        User targetUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Target user not found"));

        if (!targetUser.isActive()) {
            throw new IllegalArgumentException("User is already banned");
        }

        try {
            // 1. Update primary data table
            targetUser.setActive(false);
            targetUser.setUpdatedAt(LocalDateTime.now());
            User savedUser = userRepository.save(targetUser);

            // 2. Update secondary table (Audit)
            // If this throws an exception, Step 1 is rolled back!
            auditLogService.logAction(adminId, "BAN_USER", "Banned user " + id + ". Reason: " + reason);

            logger.info("User {} successfully banned.", id);
            return mapToDto(savedUser);

        } catch (Exception e) {
            logger.error("Failed to execute ban transaction for User {}", id, e);
            throw new TransactionFailedException("Transaction aborted: " + e.getMessage());
        }
    }

    // ----------------------------------------------------------------------
    // Helper Methods
    // ----------------------------------------------------------------------

    /**
     * DTO Mapping: NEVER return the raw Entity object from the Service layer to the
     * Controller.
     * Entities often contain sensitive data (password hashes, internal IDs) and
     * returning them exposes database schema structures directly to the API
     * consumer.
     */
    private UserResponseDto mapToDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .isActive(user.isActive())
                .joinedAt(user.getCreatedAt().toString())
                .build();
    }
}
