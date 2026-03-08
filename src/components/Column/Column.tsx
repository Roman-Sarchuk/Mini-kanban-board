import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

import style from "./Column.module.css";
import type { Task, Column as ColumnType } from "../../types";
import AddField from "../AddField/AddField";
import TrashIcon from "../../icons/TrashIcon";
import Card from "../Card/Card";
import InlineUpdatableField from "../InlineUpdatableField/InlineUpdatableField";

interface ColumnProps {
  columnData: ColumnType;
  columnTasks: Task[];
  onDeleteColumn: (columnId: string) => void;
  onUpdateColumn: (
    columnId: string,
    columnUpdates: Partial<Omit<ColumnType, "id">>,
  ) => void;
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (
    taskId: string,
    taskUpdates: Partial<Omit<Task, "id">>,
  ) => void;
  isDragOverlay?: boolean;
}

function Column({
  columnData,
  columnTasks,
  onDeleteColumn,
  onUpdateColumn,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  isDragOverlay,
}: ColumnProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // --- drag and drop ---
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnData.id,
    data: {
      type: "Column",
      columnData,
    },
    disabled: isEditingTitle || isDragOverlay, // disable dragging while editing title or if is drag overlay
  });

  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const taskIds = useMemo(
    () => columnTasks.map((task) => task.id),
    [columnTasks],
  );

  // --- render ---
  return (
    <div
      className={style.columnContainer}
      data-testid="column"
      ref={setNodeRef}
      style={{
        ...draggableStyle,
      }}
    >
      <div
        className={style.column}
        style={{
          opacity: isDragging ? 0.5 : 1,
          transform: isDragOverlay ? "rotate(2deg)" : undefined,
        }}
      >
        {/* --- header --- */}
        <div className={style.colunHeader}>
          {/* title */}
          <div
            className={style.columnTitleContainer}
            {...attributes}
            {...listeners}
          >
            <span className={style.columnTaskCounetr}>{columnTasks.length}</span>
            <InlineUpdatableField
              startValue={columnData.title}
              onUpdate={(newTitle) => {
                onUpdateColumn(columnData.id, { title: newTitle });
              }}
              onIsEditingChange={(isEditing) => setIsEditingTitle(isEditing)}
            />
          </div>
          {/* button */}
          <button
            data-testid="delete-column-button"
            style={{
              width: 20,
              height: 20,
            }}
            onClick={() => onDeleteColumn(columnData.id)}
          >
            <TrashIcon />
          </button>
        </div>

        {/* --- tasks container --- */}
        <div className={style.taskContainer}>
          {!isDragOverlay ? (
            <SortableContext
              items={taskIds}
              strategy={verticalListSortingStrategy}
            >
              {columnTasks.map((task) => (
                <Card
                  key={task.id}
                  task={task}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              ))}
            </SortableContext>
          ) : (
            columnTasks.map((task) => (
              <Card
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onUpdate={onUpdateTask}
              />
            ))
          )}
        </div>

        {/* --- footer --- */}
        <div
          className={style.columnFooter}
          data-testid="add-task-field"
        >
          <AddField
            title="Enter task title"
            onAdd={(title) => onAddTask(columnData.id, title)}
            isTextArea={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Column;
