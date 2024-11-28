import { create } from 'zustand';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: number) => void;
  removeTask: (id: number) => void;
  getIncompleteTasks: () => Task[];
  getCompletedTasks: () => Task[];
};

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async () => {
    const res = await fetch('/api/tasks');
    const data = await res.json();
    set({ tasks: data });
  },
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTaskCompletion: async (id) => {
    const task = get().tasks.find((task) => task.id === id);
    if (task) {
      // Обновляем локальное состояние
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      }));
      // Отправляем обновление на сервер
      await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !task.completed }),
      });
    }
  },
  removeTask: async (id) => {
    // Обновляем локальное состояние
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    // Удаляем задачу на сервере
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
  },
// фильтрация по статусу выполненно
  getIncompleteTasks: () => {
    return get().tasks.filter((task) => !task.completed);
  },
  getCompletedTasks: () => {
    return get().tasks.filter((task) => task.completed);
  },
}));

export default useTaskStore;
