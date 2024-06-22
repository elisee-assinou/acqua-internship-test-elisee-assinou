export type Task = {
  id: number;
  title: string;
};

export type State = {
  todoItems: Task[];
  doneItems: Task[];
};

export type Actions = {
  setTodoItems: (items: Task[]) => void;
  setDoneItems: (items: Task[]) => void;
};
