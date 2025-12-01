import type { Task } from "./App";

interface TaskListProps {
  tasks: Task[];
}

function Tasklist({
  tasks,
  removeTask,
  taskStatus,
}: TaskListProps & {
  removeTask: (id: string) => void;
  taskStatus: (id: string, completed: boolean) => void;
}) {
  return (
    <div className="tasklist-container">
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="task-item">
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => taskStatus(task.id, e.target.checked)}
              />
              <span className={task.completed ? "completed" : ""}>{task.title}</span>
              <button
                onClick={() => removeTask(task.id)}
                className="remove-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasklist;
