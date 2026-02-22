import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { type Column } from "../types";

const STORAGE_KEY = "my-kanban-columns";

function migrateColumns(raw: unknown[]): Column[] {
  return raw.flatMap((item) => {
    const { id, title } = item as Record<string, unknown>;
    if (typeof id !== "string" || typeof title !== "string") return [];
    return [{ id, title }];
  });
}

export function useColumns() {
  const [columns, setColumns] = useState<Column[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return migrateColumns(parsed);
    } catch {
      return [];
    }
  });

  // For dev only: clear columns in local storage on every reload
  // useEffect(() => {
  //   setColumns([]);
  // }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addColumn = (title: string) => {
    setColumns((prev) => {
      const newColumn: Column = {
        id: uuidv4(),
        title,
      };

      return [...prev, newColumn];
    });
  };

  const updateColumn = (
    id: string,
    updates: Partial<Omit<Column, "id">>,
  ) => {
    setColumns((prev) => {
      const existingColumn = prev.find((column) => column.id === id);
      if (!existingColumn) return prev;

      return prev.map((column) =>
        column.id === id ? { ...column, ...updates } : column,
      );
    });
  };

  const deleteColumn = (id: string) => {
    setColumns((prev) => {
      const columnToDelete = prev.find((c) => c.id === id);
      if (!columnToDelete) return prev;

      return prev.filter((c) => c.id !== id);
    });
  };

  const moveColumn = (activeId: string, overId: string) => {
    setColumns((prev) => {
      const currentIndex = prev.findIndex((c) => c.id === activeId);
      if (currentIndex === -1) return prev;

      const overIndex = prev.findIndex((c) => c.id === overId);
      if (overIndex === -1) return prev;

      const updated = [...prev];
      const [moved] = updated.splice(currentIndex, 1);
      updated.splice(overIndex, 0, moved);

      return updated;
    });
  };

  return { columns, addColumn, updateColumn, deleteColumn, moveColumn };
}
