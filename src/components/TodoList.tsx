import { useCallback } from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit
}: {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<{ title: string; description: string }>) => void;
}) {
  const handleToggle = useCallback(
    (id: string) => {
      onToggle(id);
    },
    [onToggle]
  );

  const handleDelete = useCallback(
    (id: string) => {
      onDelete(id);
    },
    [onDelete]
  );

  const handleEdit = useCallback(
    (id: string, updates: Partial<{ title: string; description: string }>) => {
      onEdit(id, updates);
    },
    [onEdit]
  );

  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>No todos to display</p>
      </div>
    );
  }

  return (
    <ul className="todo-list" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </ul>
  );
}
