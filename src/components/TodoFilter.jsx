import { useCallback } from 'react';
import './TodoFilter.css';

export function TodoFilter({ filter, stats, onFilterChange, onClearCompleted }) {
  const handleFilterChange = useCallback(
    (newFilter) => {
      onFilterChange(newFilter);
    },
    [onFilterChange]
  );

  const handleClearCompleted = useCallback(() => {
    onClearCompleted();
  }, [onClearCompleted]);

  const activeCount = stats.active;
  const hasCompleted = stats.completed > 0;

  const filterButtons = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-filter">
      <div className="todo-filter-buttons" role="tablist" aria-label="Filter todos">
        {filterButtons.map((btn) => (
          <button
            key={btn.value}
            className={`todo-filter-btn ${filter === btn.value ? 'active' : ''}`}
            onClick={() => handleFilterChange(btn.value)}
            role="tab"
            aria-selected={filter === btn.value}
            aria-controls={`todo-list-${btn.value}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="todo-filter-stats">
        <span className="todo-stats-count">
          {activeCount} {activeCount === 1 ? 'item' : 'items'} left
        </span>
        {hasCompleted && (
          <button
            className="todo-clear-btn"
            onClick={handleClearCompleted}
            aria-label="Clear completed todos"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
