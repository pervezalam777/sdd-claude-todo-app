import { useCallback } from 'react';
import { TodoItem } from './TodoItem';
import './TodoList.css';

export function TodoList({ todos, onToggle, onDelete, onEdit }) {
  const handleToggle = useCallback(
    (id) => {
      onToggle(id);
    },
    [onToggle]
  );

  const handleDelete = useCallback(
    (id) => {
      onDelete(id);
    },
    [onDelete]
  );

  const handleEdit = useCallback(
    (id, updates) => {
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
