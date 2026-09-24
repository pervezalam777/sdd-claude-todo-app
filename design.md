# Todo Web Application - Technical Design

## Tech Stack

- **Framework**: React 18.x with Vite
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules with global styles
- **State Management**: React Context + useReducer
- **Persistence**: Window.sessionStorage

## Architecture

```
┌─────────────────────────────────────────┐
│              TodoApp (Container)        │
│  - Manages todo state                   │
│  - Handles persistence                  │
└───────────────┬─────────────────────────┘
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
┌────────┐ ┌────────┐ ┌──────────┐
│ Todo   │ │ Todo   │ │ Todo     │
│ Form   │ │ List   │ │ Filter   │
│        │ │        │ │          │
│ - Add  │ │ - List │ │ - Filter │
│ - Edit │ │ - Edit │ │ - Stats  │
└────────┘ └────────┘ └──────────┘
```

## Data Model

```javascript
Todo {
  id: string          // UUID v4
  title: string       // Required
  description: string // Optional
  completed: boolean  // Default: false
  createdAt: number   // Timestamp
}
```

## Component Structure

### TodoApp (Container)
- State: todos, filter
- Actions: addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted

### TodoForm
- Props: onAdd(todo)
- State: local input state
- Events: handleSubmit, handleCancel

### TodoList
- Props: todos, onToggle, onDelete, onEdit
- State: editingId (optional)

### TodoItem
- Props: todo, onToggle, onDelete, onEdit
- Events: handleToggle, handleDelete, handleEdit, handleBlur

### TodoFilter
- Props: filter, todos, onFilterChange, onClearCompleted
- State: none

## File Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Root component
├── components/
│   ├── TodoApp.jsx          # Container component
│   ├── TodoForm.jsx         # Input form
│   ├── TodoList.jsx         # Todo list container
│   ├── TodoItem.jsx         # Individual todo item
│   └── TodoFilter.jsx       # Filter controls
├── hooks/
│   └── useTodos.js          # Custom hook
└── utils/
    └── id.js                # ID generator
```

## State Management Strategy

```javascript
const [todos, dispatch] = useReducer(todoReducer, [], initTodos);

// Actions:
// { type: 'ADD_TODO', payload: todo }
// { type: 'TOGGLE_TODO', payload: id }
// { type: 'DELETE_TODO', payload: id }
// { type: 'EDIT_TODO', payload: { id, updates } }
// { type: 'CLEAR_COMPLETED' }
// { type: 'SET_FILTER', payload: filter }
```

## CSS Strategy

- Global styles: `src/styles/index.css`
- Component styles: Inline `<style>` tags or CSS Modules
- BEM naming convention for clarity