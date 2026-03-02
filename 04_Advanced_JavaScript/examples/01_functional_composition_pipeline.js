'use strict';

// Beginner: function composition chains multiple small functions.
// Advanced: composable pipelines improve testability and reduce side effects.
const compose = (...functions) => (input) => functions.reduceRight((value, fn) => fn(value), input);

const trim = (value) => value.trim();
const toLowerCase = (value) => value.toLowerCase();
const removeSpaces = (value) => value.replace(/\s+/g, '-');

const slugify = compose(removeSpaces, toLowerCase, trim);
console.log(slugify('  Advanced JavaScript Patterns  '));
