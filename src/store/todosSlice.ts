import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../utils/id';
import { Todo, Filter, TodoState } from '../types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todosSlice = createSlice({
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
        if (action.payload.updates.title !== undefined) {
          todo.title = action.payload.updates.title;
        }
        if (action.payload.updates.description !== undefined) {
          todo.description = action.payload.updates.description;
        }
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
