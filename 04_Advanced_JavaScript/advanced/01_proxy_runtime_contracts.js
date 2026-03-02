'use strict';

// Beginner: Proxy can intercept get/set operations.
// Advanced: runtime contracts enforce schema-like constraints in dynamic systems.
function createUserContract(target) {
  return new Proxy(target, {
    set(obj, key, value) {
      if (key === 'email' && (typeof value !== 'string' || !value.includes('@'))) {
        throw new Error('Invalid email format');
      }

      if (key === 'age' && (!Number.isInteger(value) || value < 0)) {
        throw new Error('Invalid age value');
      }

      obj[key] = value;
      return true;
    }
  });
}

const user = createUserContract({ email: 'init@example.com', age: 20 });
user.email = 'deepak@example.com';
user.age = 24;
console.log(user);
