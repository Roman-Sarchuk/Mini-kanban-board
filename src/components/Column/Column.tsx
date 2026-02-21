import type { Task } from "../../types";

interface ColumnProps {
  title: string;
  tasks: Task[];
}

function Column({ title, tasks }: ColumnProps) {


  return (
    <div className="column">
      <h2>{title}</h2>
    </div>
  );
}

export default Column;
