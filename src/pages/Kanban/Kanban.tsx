import {
  DndContext,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  KeyboardSensor,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useFeatureFlagEnabled } from "posthog-js/react";

import style from "./Kanban.module.css";
import AddField from "../../components/AddField/AddField";
import Column from "../../components/Column/Column";
import { useColumns } from "../../hooks/useColumns";
import { useTasks } from "../../hooks/useTasks";
import type { Column as ColumnType, Task } from "../../types";
import Card from "../../components/Card/Card";

function Kanban() {
  // --- analytics ---
  const isFlagShowErrorButtonEnabled =
    useFeatureFlagEnabled("show-error-button");

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
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = (event: DragStartEvent) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.columnData);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

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

    if (
      active.data.current?.type === "Task" &&
      over.data.current?.type === "Task"
    ) {
      if (active.data.current.task.id === over.data.current.task.id) return;

      moveTask(
        active.data.current.task.id,
        over.data.current.task.id,
        over.data.current.task.columnId,
      );
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    // if (
    //   active.data.current?.type === "Column" &&
    //   over.data.current?.type === "Task" &&
    //   active.data.current.columnData.id !== over.data.current.task.columnId
    // ) {
    //   moveColumn(
    //     active.data.current.columnData.id,
    //     over.data.current.task.columnId,
    //   );
    // }

    if (
      active.data.current?.type === "Task" &&
      over.data.current?.type === "Task" &&
      active.data.current.task.columnId !== over.data.current.task.columnId
    ) {
      moveTask(
        active.data.current.task.id,
        over.data.current.task.id,
        over.data.current.task.columnId,
      );
    }

    if (
      active.data.current?.type === "Task" &&
      over?.data.current?.type === "Column" &&
      active.data.current.task.columnId !== over.data.current.columnData.id
    ) {
      updateTask(active.data.current.task.id, {
        columnId: over.data.current.columnData.id,
      });
    }
  };

  // --- render ---
  return (
    <div className={style.kanbanBackground}>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className={style.boardContainer}>
          <div className={style.board}>
            <SortableContext
              items={columnIds}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((column) => (
                <Column
                  key={column.id}
                  columnData={column}
                  columnTasks={tasksByColumn[column.id] || []}
                  onDeleteColumn={onDeleteColumn}
                  onUpdateColumn={updateColumn}
                  onAddTask={addTask}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                />
              ))}
            </SortableContext>
            <div data-testid="add-column-field">
              <AddField title="Enter column title" onAdd={addColumn} />
            </div>
          </div>

          <div className={style.footerComponentContainer}>
            <span className={style.appModeText}>
              App mode: {import.meta.env.VITE_APP_STATUS}
            </span>
            {isFlagShowErrorButtonEnabled === true && (
              <span
                className={style.raiseErrorButton}
                onClick={() => {
                  throw new Error("Test error from 'Raise error' button");
                }}
              >
                Raise error
              </span>
            )}
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn ? (
              <Column
                columnData={activeColumn}
                columnTasks={tasksByColumn[activeColumn.id] || []}
                onDeleteColumn={onDeleteColumn}
                onUpdateColumn={updateColumn}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                isDragOverlay={true}
              />
            ) : activeTask ? (
              <Card
                task={activeTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}

export default Kanban;
