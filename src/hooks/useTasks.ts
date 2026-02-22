import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import type { Task } from "../types";

const STORAGE_KEY = "my-kanban-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as Task[];
    } catch {
      return [];
    }
  });

  // For dev only: clear tasks in local storage on every reload
  // useEffect(() => {
  //   setTasks([]);
  // }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (columnId: string, title: string) => {
    setTasks((prev) => {
      const newTask: Task = {
        id: uuidv4(),
        columnId: columnId,
        title,
      };

      return [...prev, newTask];
    });
  };

  const updateTask = (
    id: string,
    updates: Partial<Omit<Task, "id" | "columnId">>,
  ) => {
    setTasks((prev) => {
      const existingTask = prev.find((task) => task.id === id);
      if (!existingTask) return prev;

      return prev.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      );
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const taskToDelete = prev.find((t) => t.id === id);
      if (!taskToDelete) return prev;

      return prev.filter((t) => t.id !== id);
    });
  };

  const moveTask = (activeId: string, overId: string, newColumnId: string) => {
    setTasks((prev) => {
      const currentIndex = prev.findIndex((t) => t.id === activeId);
      if (currentIndex === -1) return prev;

      const overIndex = prev.findIndex((t) => t.id === overId);
      if (overIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(currentIndex, 1);
      updated.splice(overIndex, 0, {...moved, columnId: newColumnId });

      return updated;
    });
  };

  return { tasks, addTask, updateTask, deleteTask, moveTask };
}
