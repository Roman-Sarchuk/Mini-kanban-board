import InlineAddField from "../../components/InlineAddField/InlineAddField";
import Column from "../../components/Column/Column";
import { useColumns } from "../../hooks/useColumns";
import { useTasks } from "../../hooks/useTasks";

function Kanban() {
  const { columns, addColumn, updateColumn, deleteColumn, moveColumn } =
    useColumns();
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();

  return (
    <div className="kanban-background">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            columnData={column}
            tasks={tasks}
            onAddTask={addTask}
            // updateColumn={updateColumn}
            // deleteColumn={deleteColumn}
            // updateTask={updateTask}
            // deleteTask={deleteTask}
            // moveTask={moveTask}
          />
        ))}
        <InlineAddField title="Enter column title" onAdd={addColumn} />
      </div>
    </div>
  );
}

export default Kanban;
