import type { Task } from "../../types";
import { useState, useEffect, useRef } from "react";

interface InlineUpdatableFieldProps {
  startValue: string;
  onUpdate: (value: string) => void;
}

export default function InlineUpdatableField({
  startValue,
  onUpdate,
}: InlineUpdatableFieldProps) {
  // --- inline editing ---
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(startValue);
  const [editedValue, setEditedValue] = useState(startValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = editedValue.trim();

    if (!trimmed) {
      setEditedValue(value);
    } else if (trimmed !== startValue) {
      onUpdate(trimmed);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value)
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
    <div onContextMenu={handleRightClick}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
        />
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}
