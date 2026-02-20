import AddColumn from "../../components/AddColumn/AddColumn"
import Column from "../../components/Column/Column"

function Kanban() {
  return (
    <div className="kanban-background">
      <div className="board">
        <Column />
        <AddColumn />
      </div>
    </div>
  )
}

export default Kanban
