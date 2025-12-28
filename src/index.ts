/**
 * Interactive Terminal To-Do List
 * 
 * A simple CLI application for managing tasks using Node.js readline
 */

import * as readline from "readline";
import type { Task } from "./todo";
import { addTask, listTasks, markDone } from "./todo";

// In-memory storage for tasks
let tasks: Task[] = [];

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Displays the help message with available commands
 */
function showHelp(): void {
  console.log("\nAvailable commands:");
  console.log("  add <task text>  - Add a new task");
  console.log("  list            - Show all tasks");
  console.log("  done <id>       - Mark a task as completed");
  console.log("  help            - Show this help message");
  console.log("  quit            - Exit the application\n");
}

/**
 * Processes user commands
 */
function processCommand(input: string): void {
  // Trim whitespace and split into command and arguments
  const trimmed = input.trim();
  const parts = trimmed.split(" ");
  const command = parts[0]?.toLowerCase() || "";

  switch (command) {
    case "add":
      // Join all parts after "add" to get the full task text
      const taskText = parts.slice(1).join(" ");
      if (taskText.length === 0) {
        console.log("Error: Task text cannot be empty. Use: add <task text>");
        break;
      }
      tasks = addTask(tasks, taskText);
      console.log(`Task added successfully!`);
      break;

    case "list":
      console.log("\n" + listTasks(tasks) + "\n");
      break;

    case "done":
      // Get the task ID from the command, handling extra spaces
      const idStr = parts.slice(1).join(" ").trim();
      if (!idStr) {
        console.log("Error: Please provide a task ID. Use: done <id>");
        break;
      }
      const id = parseInt(idStr, 10);
      if (isNaN(id)) {
        console.log(`Error: "${idStr}" is not a valid task ID. Please use a number.`);
        break;
      }
      // Check if task exists
      const taskExists = tasks.some((t) => t.id === id);
      if (!taskExists) {
        console.log(`Error: Task with ID ${id} not found.`);
        break;
      }
      tasks = markDone(tasks, id);
      console.log(`Task ${id} marked as done!`);
      break;

    case "help":
      showHelp();
      break;

    case "quit":
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
      break;

    case "":
      // Empty input, do nothing
      break;

    default:
      console.log(`Unknown command: "${command}". Type "help" for available commands.`);
      break;
  }
}

/**
 * Main function - starts the interactive loop
 */
function main(): void {
  console.log("Welcome to the To-Do List CLI!");
  console.log('Type "help" for available commands or "quit" to exit.\n');

  // Prompt for user input
  rl.setPrompt("> ");
  rl.prompt();

  // Handle each line of input
  rl.on("line", (input: string) => {
    processCommand(input);
    rl.prompt(); // Show prompt again after processing
  });

  // Handle Ctrl+C gracefully
  rl.on("close", () => {
    console.log("\nGoodbye!");
    process.exit(0);
  });
}

// Start the application
main();

