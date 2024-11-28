"use client";

import { useEffect } from "react";
import useTaskStore from "@/lib/store";
import DeleteTaskDialog from "./delete-task-dialog";
import TaskDialog from "./task-dialog";

export default function TaskList() {
  const { fetchTasks, toggleTaskCompletion, removeTask, getIncompleteTasks } = useTaskStore();
  const tasks = getIncompleteTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Задачи</h2>
      {tasks.length === 0 ? (
        <p>Нет текущих задач!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 border rounded-md">
              <div className="flex items-center gap-2 w-full ">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(task.id)} />
                <TaskDialog taskId={task.id} />
              </div>
              <DeleteTaskDialog taskId={task.id} taskTitle={task.title} onDelete={removeTask} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
