'use strict';

// Beginner: pure functions are predictable because they don't mutate inputs.
// Advanced: purity simplifies testing, caching, and parallelization.
function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) return 0;

  const total = numbers.reduce((sum, value) => sum + value, 0);
  return total / numbers.length;
}

// Beginner: map/filter create new arrays (immutable style).
// Advanced: avoid shared mutable state to reduce hidden side effects.
function getPassingStudents(students, passingScore = 50) {
  return students
    .filter((student) => Number.isFinite(student.score) && student.score >= passingScore)
    .map((student) => ({ ...student, status: 'pass' }));
}

const students = [
  { id: 1, name: 'Asha', score: 78 },
  { id: 2, name: 'Ravi', score: 41 },
  { id: 3, name: 'Neha', score: 89 }
];

console.log('average:', calculateAverage(students.map((s) => s.score)));
console.log('passing:', getPassingStudents(students));
