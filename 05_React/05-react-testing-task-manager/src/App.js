import './App.css';
import TaskManager from './TaskManager';
import React, { Suspense } from 'react';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <TaskManager />
      </Suspense>
    </div>
  );
}

export default App;
