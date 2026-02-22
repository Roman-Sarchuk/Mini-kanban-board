import styles from "./Card.module.css";
import type { Task } from "../../types";
import { useState, useEffect, useRef } from "react";

interface CardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, taskUpdates: Task) => void;
}

export default function Card({ task, onDelete, onUpdate }: CardProps) {
  // --- inline editing ---
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedTitle(task.title);
  }, [task.title]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editedTitle.trim();

    if (!trimmed) {
      setEditedTitle(task.title);
    } else if (trimmed !== task.title) {
      onUpdate(task.id, { ...task, title: trimmed });
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }

    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent context menu
    setIsEditing(true);
  };

  // --- render ---
  return (
    <div className={styles.card} onContextMenu={handleRightClick}>
      <div className={styles.cardTags}></div>

      {isEditing ? (
        <input
          ref={inputRef}
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={styles.editInput}
        />
      ) : (
        <div className={styles.cardContent}>{task.title}</div>
      )}

      {!isEditing && (
        <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
          &times;
        </button>
      )}
    </div>
  );
}
