import { useState, useCallback } from 'react';
import './TodoForm.css';

export function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!title.trim()) return;

      onAdd(title, description);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    },
    [title, description, onAdd]
  );

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-inputs">
        <input
          type="text"
          className="todo-form-title"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Todo title"
        />
        {isExpanded && (
          <input
            type="text"
            className="todo-form-description"
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Todo description"
          />
        )}
      </div>
      <div className="todo-form-actions">
        {!isExpanded && description && (
          <button
            type="button"
            className="todo-form-expand"
            onClick={() => setIsExpanded(true)}
            aria-label="Add description"
          >
            +
          </button>
        )}
        <button
          type="submit"
          className="todo-form-submit"
          disabled={!title.trim()}
          aria-label="Add todo"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}
