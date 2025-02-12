'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import TodoItem from '../TodoItem/TodoItem';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getAllTodos } from '@/api/todos';
import { ITodoItem } from '../TodoItem/TodoItem.types';

const TodosList = () => {
  const queryClient = useQueryClient();

  const { data, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos,
    placeholderData: () => queryClient.getQueryData(['todos']),
  });

  useEffect(() => {
    if (isSuccess) {
      const oldData = queryClient.getQueryData<ITodoItem[]>(['todos']);
      if (JSON.stringify(oldData) !== JSON.stringify(data)) {
        queryClient.setQueryData(['todos'], data);
      }
    }
  }, [isSuccess, data, queryClient]);

  return (
    <>
      {isFetching && !isError && <Spinner loading={isFetching} />}
      {!isFetching && !isError && (
        <ul className="flex flex-col gap-4">
          {data?.map(({ id, title }) => (
            <li
              className="flex items-center pl-2 rounded-md bg-slate-50 justify-between gap-3 text-lg md:text-xl "
              key={id}
            >
              <TodoItem title={title} id={id} />
            </li>
          ))}
        </ul>
      )}
      {!isFetching && isError && <ErrorMessage />}
    </>
  );
};

export default TodosList;
