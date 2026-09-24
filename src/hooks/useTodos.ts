import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  setFilter
} from '../store/todosSlice';
import { selectFilteredTodos, selectStats, selectFilter } from '../store/selectors';

export function useTodos() {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector(selectFilter);
  const todos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectStats);

  const onAddTodo = (title: string, description?: string) => {
    dispatch(addTodo({ title, description }));
  };

  const onToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const onEditTodo = (id: string, updates: Partial<{ title: string; description: string }>) => {
    dispatch(editTodo({ id, updates }));
  };

  const onClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const onSetFilter = (newFilter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(newFilter));
  };

  return {
    todos,
    filter,
    stats,
    addTodo: onAddTodo,
    toggleTodo: onToggleTodo,
    deleteTodo: onDeleteTodo,
    editTodo: onEditTodo,
    clearCompleted: onClearCompleted,
    setFilter: onSetFilter,
  };
}
