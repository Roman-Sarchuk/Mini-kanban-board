import { useState } from "react";

import PlusIcon from "../../icons/PlusIcon";

interface AddFieldProps {
  title: string;
  onAdd: (title: string) => void;
}

function AddField({ title, onAdd }: AddFieldProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={title}
        onKeyDown={handleKeyDown}
      />
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
