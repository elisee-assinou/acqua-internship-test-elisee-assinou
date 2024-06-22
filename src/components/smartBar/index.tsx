'use client';

import { useState } from 'react';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { fetchGPTResponse } from '@/utils/openai';
import useTodoStore from '@/store/store';

export default function SmartBar() {
  const { todoItems, doneItems, setTodoItems, setDoneItems } = useTodoStore();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleSend = async () => {
    if (value === '') return;

    const prompt = `Todo List: ${todoItems
      .map((item) => item.title)
      .join(', ')}\nDone List: ${doneItems
      .map((item) => item.title)
      .join(
        ', ',
      )}\n\nUser Input: ${value}\n\nBased on the user input, should any tasks be moved between the todo list and the done list? Please specify which tasks should be moved and to where.`;

    try {
      const response = await fetchGPTResponse(prompt);

      response.split('\n').forEach((line) => {
        if (line.includes('Move to done:')) {
          const tasks = line
            .replace('Move to done:', '')
            .split(',')
            .map((task) => task.trim());

          const newTodoItems = todoItems.filter(
            (todo) => !tasks.includes(todo.title),
          );
          const newDoneItems = [
            ...doneItems,
            ...todoItems.filter((todo) => tasks.includes(todo.title)),
          ];

          setTodoItems(newTodoItems);
          setDoneItems(newDoneItems);
        } else if (line.includes('Move to todo:')) {
          const tasks = line
            .replace('Move to todo:', '')
            .split(',')
            .map((task) => task.trim());

          const newDoneItems = doneItems.filter(
            (done) => !tasks.includes(done.title),
          );
          const newTodoItems = [
            ...todoItems,
            ...doneItems.filter((done) => tasks.includes(done.title)),
          ];

          setTodoItems(newTodoItems);
          setDoneItems(newDoneItems);
        }
      });
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      setError(true);
    }

    setValue('');
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-acqua-soft-white">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value);
        }}
        placeholder="Type something..."
        className={`flex-1 p-2 text-base border rounded-lg border-gray-300 ${
          error ? 'border-red-500' : ''
        }`}
      />
      <button
        onClick={handleSend}
        className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
        title="Send"
      >
        <MdOutlineWaterDrop className="text-xl" />
      </button>
    </div>
  );
}
