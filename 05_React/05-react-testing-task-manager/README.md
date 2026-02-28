# React Testing Task Manager

## Overview
This project is a practical React testing module using a task manager UI and comprehensive test coverage.

## What You Learn
- Unit testing for components
- Integration flow testing
- Snapshot testing
- User interaction testing with React Testing Library
- Basic performance-aware utility validation

## Important Files
- `src/TaskManager.jsx` — main tested component
- `src/TaskManager.test.js` — unit + interaction tests
- `src/TaskManager.snapshot.test.js` — snapshot tests
- `src/App.test.js` — app integration test entry
- `PROJECT_SUMMARY.md` — project-level result notes

## Run
```bash
npm install
npm start
npm test -- --watchAll=false
npm run build
```

## Suggested Enhancements
1. Add API-mocking based tests.
2. Add edge-case tests for rapid interactions.
3. Add accessibility assertions with `jest-dom`.

## Expected Outcome
You should be able to design a test strategy and write reliable tests for real React UI behavior.
