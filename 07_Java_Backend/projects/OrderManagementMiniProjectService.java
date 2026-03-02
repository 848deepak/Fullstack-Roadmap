package com.fullstack.learning.projects;

import java.math.BigDecimal;
import java.util.*;

// Mini project core: order management service.
// Beginner: basic create and fetch operations.
// Advanced: immutable domain objects reduce accidental state corruption.
public class OrderManagementMiniProjectService {

    public record OrderItem(String sku, int quantity, BigDecimal unitPrice) {}
    public record Order(UUID id, String customerId, List<OrderItem> items, BigDecimal totalAmount) {}

    private final Map<UUID, Order> orders = new HashMap<>();

    public Order createOrder(String customerId, List<OrderItem> items) {
        if (customerId == null || customerId.isBlank()) throw new IllegalArgumentException("customerId required");
        if (items == null || items.isEmpty()) throw new IllegalArgumentException("items required");

        BigDecimal total = items.stream()
                .map(item -> item.unitPrice().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order(UUID.randomUUID(), customerId, List.copyOf(items), total);
        orders.put(order.id(), order);
        return order;
    }

    public Optional<Order> findById(UUID orderId) {
        return Optional.ofNullable(orders.get(orderId));
    }
}
