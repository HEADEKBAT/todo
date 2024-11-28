'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { useState } from 'react';
import { AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog';

type DeleteTaskDialogProps = {
  taskId: number;
  taskTitle: string;
  onDelete: (id: number) => void;
};

export default function DeleteTaskDialog({ taskId, taskTitle, onDelete }: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(taskId);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="bg-gray-700 text-white px-3 py-1 rounded">
          Удалить
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить задачу</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить задачу &quot;{taskTitle}&quot;? Это действие нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
