# Todo Web Application - Technical Design

## Tech Stack

- **Framework**: React 19.x with Vite
- **Language**: TypeScript (Latest)
- **Styling**: CSS Modules with global styles
- **State Management**: Redux Toolkit
- **Persistence**: Window.sessionStorage

## Architecture

```
┌─────────────────────────────────────────┐
│              TodoApp (Container)        │
│  - Connects to Redux store              │
│  - Maps state to props                  │
└───────────────┬─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────┐
│           Redux Store                   │
│  - Root reducer with slices             │
│  - Middleware (thunk)                   │
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

```typescript
interface Todo {
  id: string;           // UUID v4
  title: string;        // Required
  description: string;  // Optional
  completed: boolean;   // Default: false
  createdAt: number;    // Timestamp
}

type Filter = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: Filter;
}

interface TodoEntity {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
```

## Component Structure

### TodoApp (Container)
- Props: none
- State: connected to Redux store
- Actions: addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted

### TodoForm (Component)
- Props: none (uses dispatch directly or connected actions)
- State: local input state
- Events: handleSubmit, handleCancel

### TodoList (Component)
- Props: todos (from store), onToggle, onDelete, onEdit
- State: none (connected component)

### TodoItem (Component)
- Props: todo, onToggle, onDelete, onEdit
- Events: handleToggle, handleDelete, handleEdit, handleBlur

### TodoFilter (Component)
- Props: filter (from store), stats (computed), onFilterChange, onClearCompleted
- State: none

## File Structure

```
src/
├── main.tsx                 # React entry point with Redux Provider
├── App.tsx                  # Root component
├── components/
│   ├── TodoApp.tsx          # Container component (connects to Redux)
│   ├── TodoForm.tsx         # Input form
│   ├── TodoList.tsx         # Todo list container
│   ├── TodoItem.tsx         # Individual todo item
│   └── TodoFilter.tsx       # Filter controls
├── hooks/
│   └── useTodos.ts          # Custom hook (can be removed with Redux)
├── store/
│   ├── index.ts             # Store configuration
│   ├── todosSlice.ts        # Todo slice with reducers
│   └── selectors.ts         # Selectors for derived state
└── utils/
    └── id.ts                # ID generator
```

## State Management Strategy

### Redux Store Configuration

```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Todo Slice

```typescript
// store/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils/id';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type Filter = 'all' | 'active' | 'completed';

interface TodoState {
  todos: Todo[];
  filter: Filter;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; description?: string }>) => {
      const newTodo: Todo = {
        id: generateId(),
        title: action.payload.title,
        description: action.payload.description || '',
        completed: false,
        createdAt: Date.now(),
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; updates: Partial<Todo> }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.updates.title ?? todo.title;
        todo.description = action.payload.updates.description ?? todo.description;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
});

export const { 
  addTodo, 
  toggleTodo, 
  deleteTodo, 
  editTodo, 
  clearCompleted,
  setFilter 
} = todosSlice.actions;

export default todosSlice.reducer;
```

## CSS Strategy

- Global styles: `src/styles/index.css`
- Component styles: CSS Modules with `.module.css` extension
- BEM naming convention for clarity

## TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["react", "react-dom"]
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## Migration Notes

1. Convert all `.jsx` files to `.tsx`
2. Convert all `.js` files to `.ts`
3. Add TypeScript interfaces for all props and state
4. Replace `useReducer` with Redux Toolkit slices
5. Wrap app in `Provider` component with store
6. Update build configuration for TypeScript
