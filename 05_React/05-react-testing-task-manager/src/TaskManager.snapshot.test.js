import React from 'react';
import { render } from '@testing-library/react';
import TaskManager from './TaskManager';

describe('TaskManager Snapshot Tests', () => {
  test('should match snapshot for initial render', () => {
    const { container } = render(<TaskManager />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should match snapshot with no tasks', () => {
    const { container } = render(<TaskManager />);
    const noTasksElement = container.querySelector('.no-tasks');
    expect(noTasksElement).toMatchSnapshot();
  });

  test('should match snapshot for TaskManager component structure', () => {
    const { container } = render(<TaskManager />);
    const taskManager = container.querySelector('.task-manager');
    expect(taskManager).toMatchSnapshot();
  });

  test('should match snapshot for task input section', () => {
    const { container } = render(<TaskManager />);
    const inputSection = container.querySelector('.input-section');
    expect(inputSection).toMatchSnapshot();
  });

  test('should match snapshot for search section', () => {
    const { container } = render(<TaskManager />);
    const searchSection = container.querySelector('.search-section');
    expect(searchSection).toMatchSnapshot();
  });

  test('should match snapshot for task stats section', () => {
    const { container } = render(<TaskManager />);
    const taskStats = container.querySelector('.task-stats');
    expect(taskStats).toMatchSnapshot();
  });
});
