'use strict';

// Beginner: limit how many async jobs run at the same time.
// Advanced: bounded concurrency protects dependencies and stabilizes latency.
async function runWithConcurrency(tasks, maxConcurrent = 3) {
  const results = [];
  let inFlight = 0;
  let nextIndex = 0;

  return new Promise((resolve, reject) => {
    function launchNext() {
      while (inFlight < maxConcurrent && nextIndex < tasks.length) {
        const currentIndex = nextIndex;
        const task = tasks[currentIndex];
        nextIndex += 1;
        inFlight += 1;

        Promise.resolve()
          .then(task)
          .then((value) => {
            results[currentIndex] = value;
          })
          .catch(reject)
          .finally(() => {
            inFlight -= 1;
            if (nextIndex >= tasks.length && inFlight === 0) {
              resolve(results);
            } else {
              launchNext();
            }
          });
      }
    }

    launchNext();
  });
}

const jobs = Array.from({ length: 8 }, (_, i) => () =>
  new Promise((resolve) => setTimeout(() => resolve(`job-${i + 1}`), 120))
);

runWithConcurrency(jobs, 2).then((values) => console.log(values));
