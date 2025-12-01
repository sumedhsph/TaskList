
import type { Task } from './App';

interface TaskListProps {
  tasks: Task[];
}

function Tasklist({tasks}: TaskListProps) {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.completed} readOnly />
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tasklist
