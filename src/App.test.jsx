import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock crypto if needed (Date.now() se id ban raha hai)
vi.mock("crypto", () => ({
  randomUUID: () => "mocked-uuid",
}));

describe("Todo App - Full Functionality", () => {
  beforeEach(() => {
    // Har test se pehle localStorage clear kar do
    localStorage.clear();
    // Ya phir App render karne se pehle clean state
    render(<App />);
  });

  it("should render heading 'Task List'", () => {
    expect(screen.getByText("Task List")).toBeInTheDocument();
  });

  it("should add a new task when form is submitted", async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Enter task name");
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "Learn Vitest");
    await user.click(button);

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
    expect(input).toHaveValue(""); // input clear hona chahiye
  });

  it("should not add empty task", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: "Add Task" });

    await user.click(button);

    // Task list khali hona chahiye
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("should toggle task completion status", async () => {
    const user = userEvent.setup();

    // Pehle task add karo
    await user.type(screen.getByPlaceholderText("Enter task name"), "Buy milk");
    await user.click(screen.getByText("Add Task"));

    const checkbox = screen.getByRole("checkbox");

    // Pehli baar click → completed = true
    await user.click(checkbox);
    const taskText = screen.getByText("Buy milk");
    expect(taskText).toHaveClass("completed"); // CSS class lagi hogi

    // Dusri baar click → completed = false
    await user.click(checkbox);
    expect(taskText).not.toHaveClass("completed");
  });

  it("should delete a task when delete button is clicked", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Enter task name"), "Delete me");
    await user.click(screen.getByText("Add Task"));

    const deleteButton = screen.getByText("Delete"); // jo × button hai
    await user.click(deleteButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });
});