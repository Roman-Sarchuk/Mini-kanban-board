import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Task, Column as ColumnType } from "../../types";
import InlineAddField from "../InlineAddField/InlineAddField";
import TrashIcon from "../../icons/TrashIcon";
import Card from "../Card/Card";

interface ColumnProps {
  columnData: ColumnType;
  columnTasks: Task[];
  onDeleteColumn: (columnId: string) => void;
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, taskUpdates: Task) => void;
}

function Column({ columnData, columnTasks, onDeleteColumn, onAddTask, onDeleteTask, onUpdateTask }: ColumnProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnData.id,
    data: {
      type: "Column",
      columnData,
    },
  });

  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...draggableStyle,
        backgroundColor: "#ebecf0",
        borderRadius: "3px",
        width: "200px",
        height: "500px",
        marginRight: "16px",
        display: "flex",
        flexDirection: "column",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {/* --- header --- */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#d6d6d6",
          paddingInline: "8px",
          paddingBlock: "5px",
        }}
      >
        {/* title */}
        <div
          style={{
            display: "flex",
            gap: 5,
            width: "100%",
            cursor: "grab",
          }}
          {...attributes}
          {...listeners}
        >
          <h4>
            {"["}
            {columnTasks.length}
            {"]"}
          </h4>
          <h4>{columnData.title}</h4>
        </div>
        {/* button */}
        <button
          style={{
            width: 20,
            height: 20,
          }}
          onClick={() => onDeleteColumn(columnData.id)}
        >
          <TrashIcon />
        </button>
      </div>

      {/* --- tasks container --- */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          flexGrow: 1,
          padding: "8px",
        }}
      >
        {columnTasks.map((task) => (
          <Card key={task.id} task={task} onDelete={onDeleteTask} onUpdate={onUpdateTask} />
        ))}
      </div>

      {/* --- footer --- */}
      <InlineAddField
        title="Enter task title"
        onAdd={(title) => onAddTask(columnData.id, title)}
      />
    </div>
  );
}

export default Column;
