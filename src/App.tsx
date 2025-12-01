import { useState, useRef } from "react";
 
import Tasklist from "./Tasklist";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}
function App() {
  const [input, setInput] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: input,
      completed: false,
    };
    setTaskList((prevTasks) => [...prevTasks, newTask]);
    setInput("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          name="taskinput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task name"
        />
        <button type="submit">Add Task</button>
      </form>
      <Tasklist tasks={taskList} />
    </>
  );
}

export default App;
