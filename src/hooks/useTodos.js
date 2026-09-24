import { useState, useEffect, useReducer, useCallback } from 'react';
import { generateId } from '../utils/id';

// Storage key for session storage
const STORAGE_KEY = 'todo-app-todos';

// Initial state from session storage
function initTodos() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Reducer for todo state
export function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        createdAt: Date.now(),
      };
      return [...state, newTodo];
    }
    case 'TOGGLE_TODO':
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.payload);
    case 'EDIT_TODO':
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
    case 'CLEAR_COMPLETED':
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
}

// Custom hook for todo management
export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);
  const [filter, setFilter] = useState('all');

  // Persist to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Storage might be unavailable
    }
  }, [todos]);

  // Actions
  const addTodo = useCallback((title, description = '') => {
    if (!title.trim()) return null;
    const todo = {
      id: generateId(),
      title: title.trim(),
      description,
      completed: false,
      createdAt: Date.now(),
    };
    dispatch({ type: 'ADD_TODO', payload: todo });
    return todo;
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, []);

  const editTodo = useCallback((id, updates) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, updates } });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  // Derived state
  const filteredTodos = useCallback(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useCallback(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, active, completed };
  }, [todos]);

  return {
    todos: filteredTodos(),
    filter,
    stats: stats(),
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  };
}
