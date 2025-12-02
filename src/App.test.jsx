import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// Mock crypto.randomUUID if you ever switch to it (currently using Date.now())
vi.mock("crypto", () => ({
  randomUUID: () => "mocked-uuid",
}));

describe("Todo App - Full Functionality", () => {
  // Reset state before each test for isolation
  beforeEach(() => {
    localStorage.clear();        // Clear localStorage if you add persistence later
    render(<App />);             // Fresh render of the app for every test
  });

  it("should render the main heading 'Task List'", () => {
    expect(screen.getByText("Task List")).toBeInTheDocument();
  });

  it("should add a new task when the form is submitted", async () => {
    const user = userEvent.setup();

    const input = screen.getByPlaceholderText("Enter task name");
    const addButton = screen.getByRole("button", { name: "Add Task" });

    await user.type(input, "Learn Vitest");
    await user.click(addButton);

    expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
    expect(input).toHaveValue(""); // Input should be cleared after submission
  });

  it("should not add an empty task", async () => {
    const user = userEvent.setup();
    const addButton = screen.getByRole("button", { name: "Add Task" });

    await user.click(addButton);

    // No checkbox should exist → list is empty
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("should toggle task completion status", async () => {
    const user = userEvent.setup();

    // First, add a task
    await user.type(screen.getByPlaceholderText("Enter task name"), "Buy milk");
    await user.click(screen.getByText("Add Task"));

    const checkbox = screen.getByRole("checkbox");

    // First click → mark as completed
    await user.click(checkbox);
    const taskText = screen.getByText("Buy milk");
    expect(taskText).toHaveClass("completed");

    // Second click → mark as incomplete
    await user.click(checkbox);
    expect(taskText).not.toHaveClass("completed");
  });

  it("should delete a task when the delete button is clicked", async () => {
    const user = userEvent.setup();

    // Add a task first
    await user.type(screen.getByPlaceholderText("Enter task name"), "Delete me");
    await user.click(screen.getByText("Add Task"));

    // Find and click the delete button (using × symbol)
    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(screen.queryByText("Delete me")).not.toBeInTheDocument();
  });
});