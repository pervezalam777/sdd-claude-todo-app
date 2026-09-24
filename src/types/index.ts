export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: Filter;
}

export interface TodoEntity {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export interface AddTodoAction {
  title: string;
  description?: string;
}

export interface EditTodoAction {
  id: string;
  updates: Partial<Todo>;
}
