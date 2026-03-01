import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import styles from "./Card.module.css";
import type { Task } from "../../types";
import InlineUpdatableField from "../InlineUpdatableField/InlineUpdatableField";

interface CardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, taskUpdates: Partial<Omit<Task, "id">>) => void;
}

export default function Card({ task, onDelete, onUpdate }: CardProps) {
  const [isEditingText, setIsEditingText] = useState(false);

  // --- drag and drop ---
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: isEditingText, // disable dragging while editing title
    animateLayoutChanges: (args) => {
      return args.isSorting || args.isDragging;
    },
  });

  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      data-testid="card"
      ref={setNodeRef}
      style={{
        ...draggableStyle,
        opacity: isDragging ? 0.5 : 1,
      }}
      className={styles.card}
    >
      <div
        className={styles.cardContent}
        style={{
          cursor: isEditingText ? "default" : "grab",
          width: "100%",
        }}
        {...attributes}
        {...listeners}
      >
        <InlineUpdatableField
          startValue={task.title}
          onUpdate={(newTitle) => onUpdate(task.id, { title: newTitle })}
          onIsEditingChange={(isEditing) => setIsEditingText(isEditing)}
        />
      </div>

      {!isEditingText && (
        <button
          data-testid="delete-task-button"
          className={styles.deleteBtn}
          onClick={() => onDelete(task.id)}
        >
          &times;
        </button>
      )}
    </div>
  );
}
