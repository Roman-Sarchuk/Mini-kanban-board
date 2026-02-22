import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

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
  isStatic?: boolean;
}

function Column({
  columnData,
  columnTasks,
  onDeleteColumn,
  onUpdateColumn,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
  isStatic,
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
    disabled: isEditingTitle || isStatic, // disable dragging while editing title or if static
    animateLayoutChanges: (args) => {
      return args.isSorting || args.isDragging;
    }
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
      ref={setNodeRef}
      style={{
        ...draggableStyle,
      }}
    >
      <div
        style={{
          backgroundColor: "#ebecf0",
          borderRadius: "3px",
          width: "200px",
          maxHeight: "100%",
          marginRight: "16px",
          display: "flex",
          flexDirection: "column",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {/* --- header --- */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#d6d6d6",
            paddingInline: "8px",
            paddingBlock: "5px",
          }}
        >
          {/* title */}
          <div
            style={{
              display: "flex",
              gap: 5,
              width: "100%",
              cursor: "grab",
            }}
            {...attributes}
            {...listeners}
          >
            <h4>
              {"["}
              {columnTasks.length}
              {"]"}
            </h4>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "8px",
            overflowY: "auto",
          }}
        >
          {!isStatic ? (
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
          style={{
            backgroundColor: "#d5d3d3",
          }}
        >
          <AddField
            title="Enter task title"
            onAdd={(title) => onAddTask(columnData.id, title)}
          />
        </div>
      </div>
    </div>
  );
}

export default Column;
