/**
 * Simple Todo Task Model
 * 
 * This module provides a basic task management system with pure functions
 * that operate on task arrays without side effects.
 */

/**
 * Task type definition
 * Represents a single todo task with all its properties
 */
export type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

/**
 * Adds a new task to the tasks array
 * 
 * @param tasks - Array of existing tasks
 * @param text - Text content for the new task
 * @returns New array with the added task (original array is not modified)
 */
export function addTask(tasks: Task[], text: string): Task[] {
  // Create a new task with auto-generated ID and current timestamp
  const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    text: text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  // Return a new array with the new task added (spread operator creates a copy)
  return [...tasks, newTask];
}

/**
 * Formats and returns a string representation of all tasks
 * 
 * @param tasks - Array of tasks to display
 * @returns Formatted string showing all tasks with their status
 */
export function listTasks(tasks: Task[]): string {
  if (tasks.length === 0) {
    return "No tasks yet.";
  }

  // Format each task with its status
  const formattedTasks = tasks.map((task) => {
    const status = task.completed ? "x" : " ";
    return `[${status}] ${task.id} - ${task.text}`;
  });

  // Join all formatted tasks with newlines
  return formattedTasks.join("\n");
}

/**
 * Marks a task as completed by its ID
 * 
 * @param tasks - Array of existing tasks
 * @param id - ID of the task to mark as done
 * @returns New array with the specified task marked as completed (original array is not modified)
 */
export function markDone(tasks: Task[], id: number): Task[] {
  // Map over tasks and update the one with matching ID
  return tasks.map((task) => {
    if (task.id === id) {
      // Return a new task object with completed set to true
      return { ...task, completed: true };
    }
    // Return unchanged task for all others
    return task;
  });
}

