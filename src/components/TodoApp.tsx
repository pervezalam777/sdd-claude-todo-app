import { useCallback } from 'react';
import { useTodos } from '../hooks/useTodos';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';
import './TodoApp.css';

export function TodoApp() {
  const {
    todos,
    filter,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  const handleAddTodo = useCallback(
    (title: string, description: string = '') => {
      addTodo(title, description);
    },
    [addTodo]
  );

  const handleToggleTodo = useCallback(
    (id: string) => {
      toggleTodo(id);
    },
    [toggleTodo]
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      deleteTodo(id);
    },
    [deleteTodo]
  );

  const handleEditTodo = useCallback(
    (id: string, updates: Partial<{ title: string; description: string }>) => {
      editTodo(id, updates);
    },
    [editTodo]
  );

  const handleFilterChange = useCallback(
    (newFilter: 'all' | 'active' | 'completed') => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  return (
    <div className="todo-app">
      <header className="todo-app-header">
        <h1 className="todo-app-title">Todo App</h1>
        <p className="todo-app-subtitle">Manage your tasks efficiently</p>
      </header>

      <main className="todo-app-main">
        <TodoForm onAdd={handleAddTodo} />

        <TodoList
          todos={todos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />

        <TodoFilter
          filter={filter}
          stats={stats}
          onFilterChange={handleFilterChange}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  );
}
