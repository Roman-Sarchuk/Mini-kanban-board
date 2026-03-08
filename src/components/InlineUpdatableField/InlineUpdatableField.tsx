import { useState, useEffect, useRef } from "react";

import styles from "./InlineUpdatableField.module.css";

interface InlineUpdatableFieldProps {
  startValue: string;
  onUpdate: (value: string) => void;
  onIsEditingChange?: (isEditing: boolean) => void;
  isTextArea?: boolean;
}

export default function InlineUpdatableField({
  startValue,
  onUpdate,
  onIsEditingChange,
  isTextArea,
}: InlineUpdatableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(startValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditedValue(startValue);
    }
  }, [startValue, isEditing]);

  useEffect(() => {
    onIsEditingChange?.(isEditing);

    if (isEditing) {
      if (isTextArea) {
        textAreaRef.current?.focus();
        textAreaRef.current?.select();
      } else {
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    }
  }, [isEditing, onIsEditingChange]);

  const handleSave = () => {
    const trimmed = editedValue.trim();

    if (!trimmed) {
      setEditedValue(startValue);
    } else if (trimmed !== startValue) {
      onUpdate(trimmed);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(startValue);
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !isTextArea) {
      handleSave();
    }

    if (e.key === "Enter" && isTextArea && e.ctrlKey) {
      handleSave();
    }

    if (e.key === "Escape") {
      handleCancel();
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEditing(true);
  };

  // --- render ---
  return (
    <div onContextMenu={handleRightClick} className={styles.fieldContainer}>
      {isEditing ? (
        isTextArea ? (
          <textarea
            ref={textAreaRef}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancel}
          />
        ) : (
          <input
            ref={inputRef}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleCancel}
          />
        )
      ) : (
        <div className={styles.fieldText}>{startValue}</div>
      )}
    </div>
  );
}
