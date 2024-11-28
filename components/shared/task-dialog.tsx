'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import useTaskStore from '@/lib/store';
import DeleteTaskDialog from './delete-task-dialog';

type TaskDialogProps = {
  taskId: number; // Передается только ID задачи
};

export default function TaskDialog({ taskId }: TaskDialogProps) {
  const { tasks, toggleTaskCompletion, removeTask, fetchTasks } = useTaskStore();
  const task = tasks.find((t) => t.id === taskId); // Получаем задачу по ID из Zustand

  const [isOpen, setIsOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || '');

  if (!task) return null; // Если задачи нет, ничего не рендерим

  const handleSave = async () => {
    if (editedTitle !== task.title) {
      // Обновляем заголовок задачи
      await fetch(`/api/tasks`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: taskId, title: editedTitle }),
      });
      fetchTasks(); // Обновляем данные в Zustand
    }
    setIsOpen(false);
  };

  const handleToggleCompletion = () => {
    toggleTaskCompletion(taskId); // Меняем состояние выполнения через Zustand
    setIsOpen(false);
  };

  const handleDelete = async () => {
    await removeTask(taskId); // Удаляем задачу через Zustand
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full">{task.title}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
          <DialogDescription>
            Вы можете изменить текст задачи, изменить ее статус или удалить.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Название задачи</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <button
            onClick={handleToggleCompletion}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {task.completed ? 'Вернуть в активные' : 'Отметить выполненной'}
          </button>
          <DeleteTaskDialog
            taskId={taskId}
            taskTitle={task.title}
            onDelete={handleDelete} // Передаем функцию удаления
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Сохранить
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
