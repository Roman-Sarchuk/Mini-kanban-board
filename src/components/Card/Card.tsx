import { useState, useEffect, useRef } from "react";

import styles from "./Card.module.css";
import type { Task } from "../../types";
import InlineUpdatableField from "../InlineUpdatableField/InlineUpdatableField";

interface CardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, taskUpdates: Task) => void;
}

export default function Card({ task, onDelete, onUpdate }: CardProps) {
  // --- inline editing ---
  const [isEditing, setIsEditing] = useState(false);

  // --- render ---
  return (
    <div className={styles.card}>
      <div className={styles.cardTags}></div>

      <InlineUpdatableField
        startValue={task.title}
        onUpdate={(newTitle) => onUpdate(task.id, { ...task, title: newTitle })}
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
