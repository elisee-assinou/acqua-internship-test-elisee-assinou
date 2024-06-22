import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, State, Actions } from '@/types';

const TODO_ITEMS: Task[] = [
  { id: 1, title: 'AI Fish or Phish' },
  { id: 2, title: 'Compile Coral DB' },
  { id: 3, title: 'AI Sub Navigation' },
  { id: 4, title: 'Server Water Cooling' },
  { id: 5, title: 'Whale Song AI' },
  { id: 6, title: 'Marine Chatbot' },
];

const DONE_ITEMS: Task[] = [
  { id: 7, title: 'Dolphin Comm Sim' },
  { id: 8, title: 'Dolphin Elisé Sim' },
];

type TodoState = State & Actions;

const useTodoStore = create<TodoState>(
  persist(
    (set) => ({
      todoItems: TODO_ITEMS,
      doneItems: DONE_ITEMS,
      setTodoItems: (items: Task[]) => set({ todoItems: items }),
      setDoneItems: (items: Task[]) => set({ doneItems: items }),
    }),
    {
      name: 'todo-storage', // nom du localStorage key
      getStorage: () => localStorage,
    },
    //@ts-expect-error ignore this line
  ) as StateCreator<TodoState, [['zustand/persist', unknown]]>,
);

export default useTodoStore;
