'use strict';

// Beginner: structuredClone deep copies objects safely in modern runtimes.
// Advanced: handles cyclic references unlike naive JSON stringify/parse.
function safeDeepClone(value) {
  try {
    return structuredClone(value);
  } catch {
    // Fallback for environments without structuredClone.
    const seen = new WeakMap();

    function clone(input) {
      if (input === null || typeof input !== 'object') return input;
      if (seen.has(input)) return seen.get(input);

      const output = Array.isArray(input) ? [] : {};
      seen.set(input, output);

      for (const [key, val] of Object.entries(input)) {
        output[key] = clone(val);
      }

      return output;
    }

    return clone(value);
  }
}

const node = { id: 1, meta: { ok: true } };
node.self = node;
const copy = safeDeepClone(node);
console.log(copy.id, copy.meta.ok, copy.self === copy);
