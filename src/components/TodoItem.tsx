import { useState, useCallback, useRef, useEffect } from 'react';
import { Todo } from '../types';
import './TodoItem.css';

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit
}: {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<{ title: string; description: string }>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = useCallback(() => {
    onToggle(todo.id);
  }, [todo.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(todo.id);
  }, [todo.id, onDelete]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!editTitle.trim()) return;
    onEdit(todo.id, { title: editTitle.trim(), description: editDescription });
    setIsEditing(false);
  }, [editTitle, editDescription, todo.id, onEdit]);

  const handleBlur = useCallback(() => {
    if (isEditing) {
      handleSave();
    }
  }, [isEditing, handleSave]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        setIsEditing(false);
        setEditTitle(todo.title);
        setEditDescription(todo.description);
      }
    },
    [handleSave, todo.title, todo.description]
  );

  if (isEditing) {
    return (
      <li className="todo-item todo-item-editing">
        <input
          ref={inputRef}
          type="text"
          className="todo-item-title-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Edit title"
        />
        <input
          type="text"
          className="todo-item-description-input"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          onBlur={handleBlur}
          aria-label="Edit description"
        />
        <div className="todo-item-actions">
          <button onClick={handleSave} aria-label="Save">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} aria-label="Cancel">
            Cancel
          </button>
        </div>
      </li>
    );
  }

  const completedClass = todo.completed ? 'completed' : '';
  const descriptionClass = todo.description ? 'has-description' : '';

  return (
    <li className={`todo-item ${completedClass} ${descriptionClass}`}>
      <div className="todo-item-content">
        <input
          type="checkbox"
          className="todo-item-toggle"
          checked={todo.completed}
          onChange={handleToggle}
          aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
        />
        <div className="todo-item-text">
          <h3 className="todo-item-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-item-description">{todo.description}</p>
          )}
        </div>
      </div>
      <div className="todo-item-actions">
        <button onClick={handleEdit} aria-label="Edit">
          Edit
        </button>
        <button onClick={handleDelete} aria-label="Delete">
          Delete
        </button>
      </div>
    </li>
  );
}
