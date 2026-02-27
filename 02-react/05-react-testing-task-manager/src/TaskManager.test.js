import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskManager from './TaskManager';

describe('TaskManager Component', () => {
  // Rendering Tests
  describe('Rendering', () => {
    test('should render TaskManager component', () => {
      render(<TaskManager />);
      expect(screen.getByText('Task Manager')).toBeInTheDocument();
    });

    test('should render input field', () => {
      render(<TaskManager />);
      expect(screen.getByTestId('task-input')).toBeInTheDocument();
    });

    test('should render add button', () => {
      render(<TaskManager />);
      expect(screen.getByTestId('add-button')).toBeInTheDocument();
    });

    test('should render search input field', () => {
      render(<TaskManager />);
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });

    test('should render search button', () => {
      render(<TaskManager />);
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
    });

    test('should display "No tasks found" when empty', () => {
      render(<TaskManager />);
      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });
  });

  // Add Task Tests
  describe('Add Task Functionality', () => {
    test('should add a task when Add button is clicked', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });

    test('should clear input field after adding a task', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addButton);

      expect(input.value).toBe('');
    });

    test('should add multiple tasks', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 3' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    test('should not add task with empty input', () => {
      render(<TaskManager />);
      const addButton = screen.getByTestId('add-button');

      fireEvent.click(addButton);

      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    test('should not add task with only whitespace', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: '   ' } });
      fireEvent.click(addButton);

      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    test('should add task when Enter key is pressed', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');

      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

      expect(screen.getByText('New Task')).toBeInTheDocument();
    });
  });

  // Search Functionality Tests
  describe('Search Functionality', () => {
    beforeEach(() => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      // Add sample tasks
      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Clean house' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Complete project' } });
      fireEvent.click(addButton);
    });

    test('should filter tasks by search term', () => {
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'buy' } });

      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
      expect(screen.queryByText('Clean house')).not.toBeInTheDocument();
      expect(screen.queryByText('Complete project')).not.toBeInTheDocument();
    });

    test('should perform case-insensitive search', () => {
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'CLEAN' } });

      expect(screen.getByText('Clean house')).toBeInTheDocument();
    });

    test('should show all tasks when search is cleared', () => {
      const searchInput = screen.getByTestId('search-input');
      const searchButton = screen.getByTestId('search-button');

      fireEvent.change(searchInput, { target: { value: 'buy' } });
      expect(screen.queryByText('Clean house')).not.toBeInTheDocument();

      fireEvent.click(searchButton);
      expect(searchInput.value).toBe('');
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
      expect(screen.getByText('Clean house')).toBeInTheDocument();
      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });

    test('should show "No tasks found" when search returns no results', () => {
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    test('should find multiple matching tasks', () => {
      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'project' } });

      expect(screen.getByText('Complete project')).toBeInTheDocument();
    });
  });

  // Delete Task Tests
  describe('Delete Task Functionality', () => {
    test('should delete a task', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Task to delete' } });
      fireEvent.click(addButton);

      const deleteButton = screen.getByTestId(/delete-button-/);
      fireEvent.click(deleteButton);

      expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
      expect(screen.getByText('No tasks found')).toBeInTheDocument();
    });

    test('should remove task from list after deletion', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();

      const deleteButtons = screen.getAllByTestId(/delete-button-/);
      fireEvent.click(deleteButtons[0]);

      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  // Toggle Task Completion Tests
  describe('Toggle Task Completion', () => {
    beforeEach(() => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Complete this task' } });
      fireEvent.click(addButton);
    });

    test('should toggle task completion status', () => {
      const checkbox = screen.getByTestId(/checkbox-/);
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    test('should apply completed styling when task is completed', () => {
      const checkbox = screen.getByTestId(/checkbox-/);
      const taskItem = screen.getByTestId(/task-item-/);

      expect(taskItem).not.toHaveClass('completed');
      fireEvent.click(checkbox);
      expect(taskItem).toHaveClass('completed');
    });
  });

  // Task Counter Tests
  describe('Task Statistics', () => {
    test('should display total tasks count', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Task 1' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Task 2' } });
      fireEvent.click(addButton);

      expect(screen.getByText('Total Tasks: 2')).toBeInTheDocument();
    });

    test('should display correct filtered tasks count', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');

      fireEvent.change(input, { target: { value: 'Apple' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Banana' } });
      fireEvent.click(addButton);

      const searchInput = screen.getByTestId('search-input');
      fireEvent.change(searchInput, { target: { value: 'Apple' } });

      expect(screen.getByText('Total Tasks: 2')).toBeInTheDocument();
      expect(screen.getByText('Filtered Tasks: 1')).toBeInTheDocument();
    });
  });

  // Integration Tests
  describe('Integration Tests', () => {
    test('should handle complete workflow: add, search, delete', () => {
      render(<TaskManager />);
      const input = screen.getByTestId('task-input');
      const addButton = screen.getByTestId('add-button');
      const searchInput = screen.getByTestId('search-input');

      // Add tasks
      fireEvent.change(input, { target: { value: 'Learn React' } });
      fireEvent.click(addButton);
      fireEvent.change(input, { target: { value: 'Write tests' } });
      fireEvent.click(addButton);

      // Search
      fireEvent.change(searchInput, { target: { value: 'tests' } });
      expect(screen.getByText('Write tests')).toBeInTheDocument();
      expect(screen.queryByText('Learn React')).not.toBeInTheDocument();

      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(screen.getByText('Learn React')).toBeInTheDocument();
      expect(screen.getByText('Write tests')).toBeInTheDocument();
    });
  });
});
