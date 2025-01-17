import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Search Functionality in To-Do List', () => {
  test('renders search input field', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    console.log(searchInput)
    expect(searchInput).toBeInTheDocument();
  });

  test('updates search input value when typing', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(searchInput.value).toBe('John');
  });

  test('filters tasks based on search query (Assigned To field)', () => {
    render(<App />);
    
    const addTaskButton = screen.getByText('Add Task');
    fireEvent.click(addTaskButton);

    const assignedToInput = screen.getByLabelText(/Assigned To:/i);
    const saveButton = screen.getByText('Save Task');
    
    fireEvent.change(assignedToInput, { target: { value: 'John Doe' } });
    fireEvent.click(saveButton);
    
    fireEvent.click(addTaskButton);
    fireEvent.change(assignedToInput, { target: { value: 'Jane Smith' } });
    fireEvent.click(saveButton);

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    const tasks = screen.getAllByRole('row');
    expect(tasks.length).toBe(2); 
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('filters tasks based on search query (Comments field)', () => {
    render(<App />);
    
    const addTaskButton = screen.getByText('Add Task');
    fireEvent.click(addTaskButton);

    const commentsInput = screen.getByLabelText(/Comments:/i);
    const saveButton = screen.getByText('Save Task');
    
    fireEvent.change(commentsInput, { target: { value: 'Urgent task' } });
    fireEvent.click(saveButton);
    
    fireEvent.click(addTaskButton);
    fireEvent.change(commentsInput, { target: { value: 'Routine checkup' } });
    fireEvent.click(saveButton);

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(searchInput, { target: { value: 'Urgent' } });

    const tasks = screen.getAllByRole('row');
    expect(tasks.length).toBe(2); 
    expect(screen.getByText('Urgent task')).toBeInTheDocument();
    expect(screen.queryByText('Routine checkup')).not.toBeInTheDocument();
  });

  test('clears search input and shows all tasks', () => {
    render(<App />);
    
    const addTaskButton = screen.getByText('Add Task');
    fireEvent.click(addTaskButton);

    const assignedToInput = screen.getByLabelText(/Assigned To:/i);
    const saveButton = screen.getByText('Save Task');
    
    fireEvent.change(assignedToInput, { target: { value: 'John Doe' } });
    fireEvent.click(saveButton);
    
    fireEvent.click(addTaskButton);
    fireEvent.change(assignedToInput, { target: { value: 'Jane Smith' } });
    fireEvent.click(saveButton);

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    console.log('searchInput',searchInput)
    fireEvent.change(searchInput, { target: { value: 'John' } });

    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: '' } });

    const tasks = screen.getAllByRole('row');
    expect(tasks.length).toBe(2); 
  });
});
