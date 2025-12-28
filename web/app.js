/**
 * Simple Web To-Do List Application
 *
 * A beginner-friendly todo app using vanilla TypeScript/JavaScript
 * with localStorage for persistence.
 */
// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearCompletedBtn = document.getElementById("clearCompleted");
// In-memory storage for tasks
let tasks = [];
/**
 * Loads tasks from localStorage
 */
function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        }
        catch (error) {
            console.error("Error loading tasks from localStorage:", error);
            tasks = [];
        }
    }
}
/**
 * Saves tasks to localStorage
 */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
/**
 * Generates a new unique ID for a task
 */
function getNextId() {
    if (tasks.length === 0) {
        return 1;
    }
    return Math.max(...tasks.map(t => t.id)) + 1;
}
/**
 * Adds a new task to the list
 */
function addTask() {
    const text = taskInput.value.trim();
    // Don't add empty tasks
    if (text === "") {
        return;
    }
    // Create new task
    const newTask = {
        id: getNextId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString(),
    };
    // Add to array and save
    tasks.push(newTask);
    saveTasks();
    // Clear input and re-render
    taskInput.value = "";
    renderTasks();
}
/**
 * Toggles the completed status of a task
 */
function toggleTask(id) {
    // Find and update the task
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
/**
 * Deletes a task from the list
 */
function deleteTask(id) {
    // Remove task from array
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}
/**
 * Removes all completed tasks
 */
function clearCompleted() {
    // Keep only tasks that are not completed
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}
/**
 * Renders all tasks to the DOM
 */
function renderTasks() {
    // Clear the list
    taskList.innerHTML = "";
    // If no tasks, show message
    if (tasks.length === 0) {
        const emptyMsg = document.createElement("li");
        emptyMsg.className = "empty-message";
        emptyMsg.textContent = "No tasks yet.";
        taskList.appendChild(emptyMsg);
        return;
    }
    // Create a list item for each task
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-item";
        // Add completed class if task is done
        if (task.completed) {
            li.classList.add("completed");
        }
        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(task.id));
        // Create task text
        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;
        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));
        // Assemble the task item
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        // Add to list
        taskList.appendChild(li);
    });
}
/**
 * Initialize the application
 */
function init() {
    // Load tasks from localStorage
    loadTasks();
    // Render initial tasks
    renderTasks();
    // Add event listeners
    addBtn.addEventListener("click", addTask);
    // Allow adding tasks with Enter key
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    });
    clearCompletedBtn.addEventListener("click", clearCompleted);
}
// Start the app when the page loads
init();
