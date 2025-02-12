import axios from 'axios';

import { ITodoItem } from '@/components/TodoItem/TodoItem.types';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

export const getAllTodos = async (): Promise<ITodoItem[]> => {
  const { data } = await axios.get<ITodoItem[]>('/todos?_limit=10');
  return data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`/todos/${id}`);
};

export const createTodo = async (newTodo: Omit<ITodoItem, 'id'>): Promise<ITodoItem> => {
  const { data } = await axios.post<ITodoItem>('/todos', newTodo);
  return data;
};
