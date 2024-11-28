"use client";
import AddTask from "@/components/shared/add-task";
import CompletedTasks from "@/components/shared/complited-tusks";
import TaskList from "@/components/shared/task-list";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <AddTask />
      <div className="mt-6">
        <TaskList />
      </div>
      <div className="mt-6">
        <CompletedTasks />
      </div>
    </main>
  );
}
