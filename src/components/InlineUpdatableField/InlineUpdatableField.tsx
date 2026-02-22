import { useState, useEffect, useRef } from "react";

interface InlineUpdatableFieldProps {
  startValue: string;
  onUpdate: (value: string) => void;
  onIsEditingChange?: (isEditing: boolean) => void;
}

export default function InlineUpdatableField({
  startValue,
  onUpdate,
  onIsEditingChange,
}: InlineUpdatableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(startValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setEditedValue(startValue);
    }
  }, [startValue, isEditing]);

  useEffect(() => {
    onIsEditingChange?.(isEditing);

    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

  return (
    <div
      onContextMenu={handleRightClick}
      style={{ width: "100%" }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleCancel}
          style={{ width: "100%" }}
        />
      ) : (
        <div style={{ width: "100%" }}>
          {startValue}
        </div>
      )}
    </div>
  );
}