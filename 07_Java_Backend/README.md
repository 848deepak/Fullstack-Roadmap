# Module 07: Java Backend Development

## 1. Concept Overview
Java is a strongly-typed, object-oriented language renowned for its "Write Once, Run Anywhere" (WORA) philosophy. In backend development, Java powers massive enterprise systems (banking, Amazon, Netflix) due to its unparalleled stability, robust ecosystem (Spring Boot), and advanced multithreading capabilities.

## 2. Theory from Scratch
- **JVM, JRE, JDK:**
  - **JVM (Java Virtual Machine):** Executes Java bytecode.
  - **JRE (Java Runtime Environment):** Contains the JVM and standard libraries.
  - **JDK (Java Development Kit):** Tools for compiling (`javac`) and debugging code.
- **OOP Pillars:** Encapsulation, Inheritance, Polymorphism, Abstraction.
- **Collections Framework:** `List` (ArrayList, LinkedList), `Set` (HashSet, TreeSet), `Map` (HashMap, TreeMap).
- **Spring Boot:** An opinionated framework that removes XML configuration boilerplate, heavily utilizing **Dependency Injection (DI)** and **Inversion of Control (IoC)** to build RESTful web services instantly.

## 3. Internal Working (Under the Hood)
### The JVM Architecture
1. **Classloader Subsystem:** Loads `.class` files into memory.
2. **Memory Area:**
   - *Method Area:* Stores class structures (metadata, constant pool).
   - *Heap:* Stores all instantiated Objects (managed by Garbage Collector).
   - *Stack:* Stores local variables and method calls (one stack per thread).
3. **Execution Engine:**
   - *Interpreter:* Executes bytecode line-by-line.
   - *JIT (Just-In-Time) Compiler:* Compiles frequently executed bytecode ("hot spots") into native machine code for maximum performance.

## 4. Why it is used in Production
Java's strict typing catches thousands of bugs at compile-time instead of crashing at runtime (unlike Node.js). Its sophisticated Garbage Collectors (G1GC, ZGC) can handle heaps of hundreds of gigabytes with pause times under a millisecond. The massive maturity of libraries (Hibernate/JPA, Spring Security) makes standard enterprise tasks trivial.

## 5. Architecture Diagrams

**Standard Spring Boot Web Request Flow (MVC Pattern):**
```text
+----------+      +-------------------+      +-------------------+
|          | HTTP |                   |      |                   |
|  Client  |----->|    Controller     |----->|     Service       |
|          |<-----| (@RestController) |<-----| (@Service Logic)  |
+----------+      +-------------------+      +-------------------+
                                                      |  ^
                                                      v  |
                                             +-------------------+
                                             |    Repository     |
                                             | (@Repository JPA) |
                                             +-------------------+
                                                      |  ^
                                                      v  |
                                             +-------------------+
                                             |     Database      |
                                             | (PostgreSQL/MySQL)|
                                             +-------------------+
```

## 6. Performance Considerations
- **String Immutability:** `String` objects are immutable. Using `+=` in a loop creates thousands of garbage objects. Always use `StringBuilder` for heavy concatenation.
- **Connection Pooling:** Opening a DB connection takes ~50ms. HikariCP (Spring's default) maintains a pool of open connections, granting them instantly to threads to handle thousands of requests per second.
- **N+1 Query Problem:** In JPA/Hibernate, fetching a User and then lazily fetching their 100 Posts triggers 101 separate SQL queries. Use `JOIN FETCH` to retrieve everything in 1 query.

## 7. Security Considerations
- **SQL Injection:** Never concatenate strings for query generation. Always use PreparedStatements (which Spring Data JPA does automatically).
- **Deserialization Attacks:** Be incredibly careful when accepting serialized POJOs from external sources (e.g., Jackson JSON payload limits).
- **Multithreading Race Conditions:** If multiple requests mutate a shared object, data corruption occurs. Use `ConcurrentHashMap`, `AtomicInteger`, or `synchronized` blocks.

## 8. Common Mistakes
- **NullPointerException (NPE):** The billion-dollar mistake. Use `Optional<T>` to explicitly denote that a return value might be empty.
- **Fat Controllers:** Putting business logic and database calls directly inside the `@RestController`. Controllers should only validate input and pass data to the `@Service` layer.
- **Ignoring Dependency Injection:** Using `new KeywordService()` tightly couples classes and makes unit testing via Mocks impossible. Always use constructor injection.

## 9. Interview Questions
1. **Q:** What is the difference between an Abstract Class and an Interface?
   **A:** Interfaces contain only method signatures (and default methods in Java 8+). Abstract classes can contain state (fields) and constructors. A class can implement multiple interfaces but extend only one abstract class.
2. **Q:** Explain how HashMap works internally.
   **A:** It computes the `hashCode()` of the key to index an array of "buckets". If buckets collide, it stores them in a LinkedList. In Java 8+, if the list gets too long (>8), it converts to a Red-Black Tree for O(log n) lookup.
3. **Q:** What is Inversion of Control (IoC) in Spring?
   **A:** Instead of objects creating their dependencies (`new Database()`), the Spring IoC Container creates all objects (Beans) at startup and injects them where needed. 

## 10. Production-Level Best Practices
- **Lombok:** Use `@Data`, `@Getter`, `@Setter` annotations to auto-generate boilerplate getters/setters/constructors.
- **DTOs (Data Transfer Objects):** Never expose your JPA Database Entities directly to the client via REST. Always map the Entity to a specific Request/Response DTO (use MapStruct).
- **Global Exception Handling:** Use `@ControllerAdvice` to catch all exceptions globally and format them into consistent `{ "error": "...", "status": 404 }` JSON responses.
