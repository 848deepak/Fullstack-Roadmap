/**
 * ADVANCED JAVASCRIPT ARCHITECTURE EXAMPLE
 * 
 * Demonstrates: 
 * 1. ES6 Classes & Inheritance (OOP)
 * 2. Closures & Private State (Encapsulation)
 * 3. Asynchronous JavaScript (Async/Await, Promise.all)
 * 4. Error Handling & Custom Error Classes
 * 5. Functional Array Iterators (map, reduce, filter)
 */

"use strict";

// ==========================================
// 1. CUSTOM ERROR HANDLING
// ==========================================
class DatabaseError extends Error {
    constructor(message, queryData) {
        super(message);
        this.name = 'DatabaseError';
        this.queryData = queryData;
        this.timestamp = new Date().toISOString();
    }
}

// ==========================================
// 2. OOP & POLYMORPHISM
// ==========================================
class User {
    // Private field (ES2022 definition) ensuring hard encapsulation
    #passwordHash;

    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }

    /**
     * @param {string} rawPassword 
     */
    setPassword(rawPassword) {
        if (rawPassword.length < 8) throw new Error("Password too short");
        // Simulate a hashing function
        this.#passwordHash = `hash_${btoa(rawPassword)}`;
    }

    // Abstract method placeholder (JS doesn't have true abstractions natively)
    getRole() {
        return 'Standard User';
    }
}

class Admin extends User {
    constructor(id, name, email, permissions = []) {
        // Super must be called before accessing 'this'
        super(id, name, email);
        this.permissions = permissions;
    }

    // Polymorphism: Overriding the parent method
    getRole() {
        return 'System Administrator';
    }

    canDeleteUsers() {
        return this.permissions.includes('DELETE_USERS');
    }
}

// ==========================================
// 3. CLOSURES (The Module Pattern)
// ==========================================
/**
 * Using an IIFE (Immediately Invoked Function Expression) to create a Singleton.
 * The 'db' and 'connectionCount' variables are entirely private and trapped
 * in the lexical scope of the returned object methods.
 */
const DatabaseConnection = (() => {
    // Private State
    let connectionCount = 0;
    const db = new Map(); // Simulating a NoSQL document store

    // Public API
    return {
        connect: () => {
            connectionCount++;
            console.log(`Connected. Total connections: ${connectionCount}`);
        },
        /**
         * Simulates an async database read operation
         * @returns {Promise<any>}
         */
        readAsync: async (collection, id) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const key = `${collection}_${id}`;
                    if (db.has(key)) {
                        resolve(db.get(key));
                    } else {
                        reject(new DatabaseError(`Record ${id} not found in ${collection}`));
                    }
                }, 150); // Simulate 150ms network latency
            });
        },
        /**
         * Simulates an async database write operation
         */
        writeAsync: async (collection, id, data) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const key = `${collection}_${id}`;
                    db.set(key, { ...data, updated_at: Date.now() });
                    resolve({ success: true, key });
                }, 100);
            });
        }
    };
})();

// ==========================================
// 4. ASYNC ORCHESTRATION & EVENT LOOP
// ==========================================

async function simulateTraffic() {
    console.log("--- Starting Application Simulation ---");
    DatabaseConnection.connect();

    // Instantiate models
    const bob = new User(1, "Bob", "bob@example.com");
    bob.setPassword("supersecret123");

    const alice = new Admin(99, "Alice", "alice@example.com", ["READ_LOGS", "DELETE_USERS"]);

    try {
        console.log("Writing initial data...");
        // Write sequentially
        await DatabaseConnection.writeAsync('users', bob.id, bob);
        await DatabaseConnection.writeAsync('users', alice.id, alice);

        console.log("Simulating concurrent high-volume reads...");
        // Concurrency: Start 3 promises simultaneously, don't wait for one to finish
        // before starting the next. Wait for ALL of them to finish using Promise.all
        const start = performance.now();
        const results = await Promise.all([
            DatabaseConnection.readAsync('users', 1),
            DatabaseConnection.readAsync('users', 99),
            // DatabaseConnection.readAsync('users', 404) // This would trigger the catch block
        ]);
        const end = performance.now();

        console.log(`Concurrent reads completed in ${(end - start).toFixed(2)}ms`);

        // ==========================================
        // 5. FUNCTIONAL ARRAY MANIPULATION
        // ==========================================

        // Filter: Extract only Admins
        const admins = results.filter(u => u.permissions !== undefined);

        // Map: Transform the array of objects into an array of strings
        const adminEmails = admins.map(a => `<${a.email}>`);

        // Reduce: Calculate the total length of all admin names combined
        const totalNameLength = admins.reduce((acc, curr) => acc + curr.name.length, 0);

        console.log("Filtered Admins:", adminEmails);
        console.log("Total Admin Name Chars:", totalNameLength);

    } catch (error) {
        if (error instanceof DatabaseError) {
            console.error(`[CRITICAL] Database Exception: ${error.message} at ${error.timestamp}`);
        } else {
            console.error(`[WARN] Standard Error:`, error);
        }
    } finally {
        console.log("--- End of Simulation ---");
    }
}

// Execute the simulation
// simulateTraffic(); // Uncomment to run in Node.js
