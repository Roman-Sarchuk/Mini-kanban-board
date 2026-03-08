import { useState } from "react";

import styles from "./AddField.module.css";
import PlusIcon from "../../icons/PlusIcon";

interface AddFieldProps {
  title: string;
  onAdd: (title: string) => void;
  isTextArea?: boolean;
}

function AddField({ title, onAdd, isTextArea }: AddFieldProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !isTextArea) {
    handleAdd();
    }

    if (e.key === "Enter" && isTextArea && e.ctrlKey) {
      handleAdd();
    }
  };

  return (
    <div className={styles.addField}>
      {isTextArea ? (
        <textarea
          data-testid="add-field-enter-area"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={title}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <input
          data-testid="add-field-enter-area"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={title}
          onKeyDown={handleKeyDown}
        />
      )}
      <button
        onClick={handleAdd}
        style={{
          width: "22px",
          height: "22px",
        }}
      >
        <PlusIcon />
      </button>
    </div>
  );
}

export default AddField;
