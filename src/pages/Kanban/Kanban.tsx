import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState, useMemo } from "react";
import { createPortal } from "react-dom";

import AddField from "../../components/AddField/AddField";
import Column from "../../components/Column/Column";
import { useColumns } from "../../hooks/useColumns";
import { useTasks } from "../../hooks/useTasks";
import type { Column as ColumnType, Task } from "../../types";

function Kanban() {
  // --- CRUD for columns and tasks ---
  const { columns, addColumn, updateColumn, deleteColumn, moveColumn } =
    useColumns();
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();

  const tasksByColumn = useMemo(() => {
    const map: Record<string, Task[]> = {};

    tasks.forEach((task) => {
      if (!map[task.columnId]) {
        map[task.columnId] = [];
      }
      map[task.columnId].push(task);
    });

    return map;
  }, [tasks]);

  const onDeleteColumn = (columnId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this column? All tasks in this column will also be deleted.",
    );
    if (!confirmDelete) return;

    const columnTasks = tasks.filter((task) => task.columnId === columnId);

    if (columnTasks.length > 0) {
      columnTasks.forEach((task) => deleteTask(task.id));
    }

    deleteColumn(columnId);
  };

  // --- drag and drop ---
  const columnIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<ColumnType | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.columnData);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);

    const { active, over } = event;
    if (!over) return;

    if (
      active.data.current?.type === "Column" &&
      over.data.current?.type === "Column"
    ) {
      moveColumn(
        active.data.current.columnData.id,
        over.data.current.columnData.id,
      );
    }
  };

  // --- render ---
  return (
    <div className="kanban-background">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "16px",
          }}
        >
          <SortableContext items={columnIds}>
            {columns.map((column) => (
              <Column
                key={column.id}
                columnData={column}
                columnTasks={tasksByColumn[column.id] || []}
                onDeleteColumn={onDeleteColumn}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
              />
            ))}
          </SortableContext>
          <AddField title="Enter column title" onAdd={addColumn} />
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <Column
                columnData={activeColumn}
                columnTasks={tasksByColumn[activeColumn.id] || []}
                onDeleteColumn={onDeleteColumn}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default Kanban;
