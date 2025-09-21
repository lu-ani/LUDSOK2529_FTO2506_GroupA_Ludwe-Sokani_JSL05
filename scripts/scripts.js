import { initialTask } from "../initialData.js";

var initialHolder = localStorage.getItem("initialTask");

if (initialHolder !== null) {
  var initialTasks = JSON.parse(initialHolder);
} else {
  var initialTasks = initialTask;
}
let isNew = false;
let isOld = false;

console.log(initialTasks);

/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 * @returns {HTMLElement} The created task div element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

/**
 * Finds the task container element based on task status.
 * @param {string} status - The task status ('todo', 'doing', or 'done').
 * @returns {HTMLElement|null} The container element, or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}
 * Initializes the task board and modal handlers.
 */
export function initTaskBoard() {
  clearExistingTasks();
  if (initialHolder !== null) {
    var initialTasks = JSON.parse(initialHolder);
    console.log("using saved initial data");
    renderTasks(initialTasks);
  } else {
    var initialTasks = initialTask;
    console.log("using initial data tasks");
    renderTasks(initialTasks);
  }
  setupModalCloseHandler();
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);
