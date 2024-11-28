"use client";

import { useEffect } from "react";
import useTaskStore from "@/lib/store";
import DeleteTaskDialog from "./delete-task-dialog";
import TaskDialog from "./task-dialog";

export default function CompletedTasks() {
  const { fetchTasks, toggleTaskCompletion, removeTask, getCompletedTasks } = useTaskStore();
  const completedTasks = getCompletedTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Выполненные задачи</h2>
      {completedTasks.length === 0 ? (
        <p>Нет выполненных задач.</p>
      ) : (
        <ul className="space-y-2">
          {completedTasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between p-2 border w-full rounded-md bg-gray-100">
              <div className="flex items-center gap-2 w-full">
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
