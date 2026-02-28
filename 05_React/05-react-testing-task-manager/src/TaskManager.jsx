import React, { useState, useCallback, useMemo } from 'react';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleAddTask = useCallback(() => {
    if (inputValue.trim() !== '') {
      setTasks(prevTasks => [...prevTasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  }, [inputValue]);

  const handleSearch = useCallback(() => {
    return tasks.filter(task =>
      task.text.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [tasks, searchValue]);

  const handleDeleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const handleToggleTask = useCallback((id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const filteredTasks = useMemo(() => {
    return searchValue ? handleSearch() : tasks;
  }, [searchValue, tasks, handleSearch]);

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a new task..."
          className="task-input"
          data-testid="task-input"
        />
        <button
          onClick={handleAddTask}
          className="add-button"
          data-testid="add-button"
        >
          Add
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
          data-testid="search-input"
        />
        <button
          onClick={() => setSearchValue('')}
          className="search-button"
          data-testid="search-button"
        >
          Search
        </button>
      </div>

      <div className="task-stats">
        <p>Total Tasks: {tasks.length}</p>
        <p>Filtered Tasks: {filteredTasks.length}</p>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              data-testid={`task-item-${task.id}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="task-checkbox"
                data-testid={`checkbox-${task.id}`}
              />
              <span className="task-text">{task.text}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-button"
                data-testid={`delete-button-${task.id}`}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
