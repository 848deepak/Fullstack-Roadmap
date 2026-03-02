'use strict';

// Beginner: JSON.parse throws if input is malformed.
// Advanced: safe parsing prevents crashes from bad or unexpected payloads.
function safeJsonParse(rawValue, fallback = null) {
  if (typeof rawValue !== 'string') return fallback;
  if (rawValue.trim() === '') return fallback;

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return {
      ...fallback,
      __parseError: true,
      message: error.message
    };
  }
}

console.log(safeJsonParse('{"feature": true}', {}));
console.log(safeJsonParse('{invalid json}', { feature: false }));
console.log(safeJsonParse('', { feature: false }));
