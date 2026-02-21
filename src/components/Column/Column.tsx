import type { Task, Column as ColumnType } from "../../types";
import InlineAddField from "../InlineAddField/InlineAddField";

interface ColumnProps {
  columnData: ColumnType;
  tasks: Task[];
  onAddTask: (columnId: string, title: string) => void;
}

function Column({ columnData, tasks, onAddTask }: ColumnProps) {
  const columnTasks = tasks.filter((t) => t.columnId === columnData.id);

  return (
    <div
      style={{
        backgroundColor: "#ebecf0",
        borderRadius: "3px",
        width: "350px",
        height: "500px",
        padding: "8px",
        marginRight: "16px",
      }}
    >
      {/* title */}
      <h4>{columnData.title}</h4>
      {/* tasks container */}
      <div>
        {columnTasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
        <InlineAddField
          title="Enter task title"
          onAdd={(title) => onAddTask(columnData.id, title)}
        />
      </div>
    </div>
  );
}

export default Column;
