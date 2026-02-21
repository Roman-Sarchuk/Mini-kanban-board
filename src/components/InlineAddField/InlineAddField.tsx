import { useState } from 'react'

import PlusIcon from "../../icons/PlusIcon";

interface InlineAddFieldProps {
  title: string;
  onAdd: (title: string) => void;
}

function InlineAddField({ title, onAdd }: InlineAddFieldProps) {
  const [value, setValue] = useState(title)

  const handleAdd = () => {
    const trimmed = value.trim()
    if (!trimmed) return

    onAdd(trimmed)
    setValue('')
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={title}
      />
      <button onClick={handleAdd}>
        <PlusIcon />
      </button>
    </div>
  );
}

export default InlineAddField;
