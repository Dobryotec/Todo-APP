'use client';

import { toast } from 'sonner';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todos';
import { ITodoItem } from './TodoItem.types';

const TodoItem: React.FC<ITodoItem> = ({ title, id }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteTodo(id),

    onMutate: async deletedId => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodoItem[]>(['todos']);

      queryClient.setQueryData(['todos'], (oldTodos: ITodoItem[] | undefined) =>
        oldTodos?.filter(({ id }) => id !== deletedId)
      );

      return { previousTodos };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Your task has been deleted successfully!');
    },

    onError: (error, deleteId, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });

  const handleClick = () => {
    mutate(id);
  };

  return (
    <>
      <h2>
        {id}. {title}
      </h2>
      <button
        className="outline-transparent border border-black p-2 rounded-md hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white transition-all duration-300 ease"
        type="button"
        onClick={handleClick}
      >
        Delete
      </button>
    </>
  );
};

export default TodoItem;
