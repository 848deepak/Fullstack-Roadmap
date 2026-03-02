'use strict';

// Beginner: long loops can block JavaScript main thread.
// Advanced: yielding with setImmediate/setTimeout prevents event loop starvation.
async function processLargeArray(items, chunkSize = 1000) {
  const output = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    const chunk = items.slice(index, index + chunkSize);
    output.push(...chunk.map((value) => value * 2));

    // Yield control so timers/UI callbacks can run.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  return output;
}

processLargeArray(Array.from({ length: 5000 }, (_, i) => i))
  .then((result) => console.log('processed:', result.length));
