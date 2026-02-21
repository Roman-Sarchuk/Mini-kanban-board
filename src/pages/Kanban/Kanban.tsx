import InlineAddField from "../../components/InlineAddField/InlineAddField"
import Column from "../../components/Column/Column"
import { useColumns } from "../../hooks/useColumns"
import { useTasks } from "../../hooks/useTasks"

function Kanban() {
  const { columns, addColumn, updateColumn, deleteColumn, moveColumn } = useColumns()
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks()

  return (
    <div className="kanban-background">
      <div className="board">
        {columns.map(column => <Column 
          key={column.id} 
          title={column.title} 
          tasks={tasks} 
          // updateColumn={updateColumn} 
          // deleteColumn={deleteColumn} 
          // addTask={addTask} 
          // updateTask={updateTask} 
          // deleteTask={deleteTask} 
          // moveTask={moveTask} 
        />)}
        <InlineAddField title="Enter column title" onAdd={addColumn} />
      </div>
    </div>
  )
}

export default Kanban
