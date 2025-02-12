'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTodo } from '@/api/todos';
import { ITodoItem } from '../TodoItem/TodoItem.types';

const TodoForm: React.FC = () => {
  const [textTodo, setTextTodo] = useState('');
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTodo(e.target.value);
  };

  const { mutate } = useMutation({
    mutationFn: (newTodo: Omit<ITodoItem, 'id'>) => createTodo(newTodo),

    onMutate: async newTodo => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodoItem[]>(['todos']);
      queryClient.setQueryData(['todos'], (oldTodos: ITodoItem[] | undefined) => [
        ...(oldTodos || []),
        { ...newTodo, id: Date.now() },
      ]);

      return { previousTodos };
    },

    onSuccess: () => {
      toast.success('Your task has been created successfully!');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

    onError: (error, newTodo, context) => {
      toast.error('Error.Task cannot be empty');
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textTodo.trim()) {
      toast.error('Sorry, but task cannot be empty!');
      return;
    }

    mutate({
      title: textTodo,
    });

    setTextTodo('');
  };

  return (
    <form className="flex text-lg md:text-xl gap-3 mb-8 md:mb-12 lg:mb-14" onSubmit={handleSubmit}>
      <input
        className="w-full outline-transparent  border border-black rounded-md p-4 transition-all duration-300 ease  focus:shadow-[0_0_8px_rgba(0,0,0,0.8)] "
        type="text"
        name="text"
        value={textTodo}
        placeholder="Create your task..."
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-40 outline-transparent border border-black p-2 rounded-md hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white transition-all duration-300 ease"
      >
        Add task
      </button>
    </form>
  );
};

export default TodoForm;
