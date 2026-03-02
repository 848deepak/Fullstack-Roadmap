// Beginner: A closure lets inner functions remember variables from outer scope.
// Advanced: Be careful with long-lived closures that hold large objects in memory.

function buildSessionCounter() {
  let activeSessions = 0;

  return {
    openSession() {
      activeSessions += 1;
      return activeSessions;
    },
    closeSession() {
      activeSessions = Math.max(0, activeSessions - 1);
      return activeSessions;
    }
  };
}

const counter = buildSessionCounter();
console.log(counter.openSession());
console.log(counter.closeSession());
