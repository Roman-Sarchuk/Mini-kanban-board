import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { type Column } from "../types";
import { useAnalytics } from "../analytics/useAnalytics";
import { EVENTS } from "../analytics/events";

const STORAGE_KEY = "my-kanban-columns";

export function useColumns() {
  const { track } = useAnalytics();

  const [columns, setColumns] = useState<Column[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored) as Column[];
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

      track(EVENTS.COLUMN_ADDED, { columnId: newColumn.id, title });

      return [...prev, newColumn];
    });
  };

  const updateColumn = (id: string, updates: Partial<Omit<Column, "id">>) => {
    setColumns((prev) => {
      const existingColumn = prev.find((column) => column.id === id);
      if (!existingColumn) return prev;

      track(EVENTS.COLUMN_UPDATED, { columnId: id, title: updates.title });

      return prev.map((column) =>
        column.id === id ? { ...column, ...updates } : column,
      );
    });
  };

  const deleteColumn = (id: string) => {
    setColumns((prev) => {
      const columnToDelete = prev.find((c) => c.id === id);
      if (!columnToDelete) return prev;

      track(EVENTS.COLUMN_DELETED, { columnId: id });

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

      track(EVENTS.COLUMN_MOVED, {
        columnId: activeId,
        fromIndex: currentIndex,
        toIndex: overIndex,
      });

      return updated;
    });
  };

  return { columns, addColumn, updateColumn, deleteColumn, moveColumn };
}
