import { useState, useRef, useCallback } from "react";

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

  const removeTask = useCallback((id: string) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const taskStatus = (id: string, completed: boolean) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed } : task))
    );
  };

  return (
    <main className="app-container">
      <header className="header">
        <h1 className="heading">Task List</h1>
        <h5>with Github Actions</h5>
      </header>

      <form onSubmit={handleSubmit} className="form-container">
        <input
          ref={inputRef}
          name="taskinput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task name"
          className="task-input"
        />
        <button type="submit" className="add-btn">
          Add Task
        </button>
      </form>
      <Tasklist
        tasks={taskList}
        removeTask={removeTask}
        taskStatus={taskStatus}
      />
    </main>
  );
}

export default App;
