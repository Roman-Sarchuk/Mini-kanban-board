import { useState } from "react";

import styles from "./Card.module.css";
import type { Task } from "../../types";
import InlineUpdatableField from "../InlineUpdatableField/InlineUpdatableField";

interface CardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, taskUpdates: Partial<Omit<Task, "id" | "columnId">>) => void;
}

export default function Card({ task, onDelete, onUpdate }: CardProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardTags}></div>

      <InlineUpdatableField
        startValue={task.title}
        onUpdate={(newTitle) => onUpdate(task.id, { title: newTitle })}
        onIsEditingChange={(isEditing) => setIsEditing(isEditing)}
      
      />

      {!isEditing && (
        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          &times;
        </button>
      )}
    </div>
  );
}
