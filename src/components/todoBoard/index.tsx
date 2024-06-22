'use client';

import { useEffect } from 'react';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import SmartBar from '@/components/smartBar';
import useTodoStore from '@/store/store';
import { Task } from '@/types';

export default function TodoBoard() {
  const { todoItems, doneItems, setTodoItems, setDoneItems } = useTodoStore();

  const [todoList, todoItemsState] = useDragAndDrop<HTMLUListElement, Task>(
    todoItems,
    { group: 'tasks' },
  );

  const [doneList, doneItemsState] = useDragAndDrop<HTMLUListElement, Task>(
    doneItems,
    { group: 'tasks' },
  );

  useEffect(() => {
    //console.log('Updated todoItemsState:', todoItemsState);
    setTodoItems(todoItemsState);
  }, [todoItemsState, setTodoItems]);

  useEffect(() => {
    console.log('Updated doneItemsState:', doneItemsState);
    setDoneItems(doneItemsState);
  }, [doneItemsState, setDoneItems]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-acqua-soft-white">
      <h1 className="text-3xl font-bold text-acqua-deep-blue my-6">
        Acqua Board
      </h1>
      <SmartBar />
      <div className="flex justify-center items-start gap-8 p-5">
        <ul
          ref={todoList}
          className="bg-acqua-yellow rounded-lg p-4 shadow-md w-80 h-96"
        >
          {todoItemsState.map((todo) => (
            <li className="p-2 bg-white rounded-lg shadow mb-2" key={todo.id}>
              {todo.title}
            </li>
          ))}
        </ul>
        <ul
          ref={doneList}
          className="bg-acqua-darker-blue rounded-lg p-4 shadow-md w-80 text-white h-96"
        >
          {doneItemsState.map((done) => (
            <li
              className="p-2 rounded-lg line-through decoration-acqua-retro-yellow decoration-2 shadow mb-2"
              key={done.id}
            >
              {done.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
