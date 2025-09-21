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

/**
 * Clears all existing task-divs from all task containers.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders all tasks from initial data to the UI.
 * Groups tasks by status and appends them to their respective columns.
 * @param {Array<Object>} tasks - Array of task objects.
 */
function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * @param {variable} placeHolder - used as a placeholder for the current task during testing
 */
var placeHolder = "";

/**
 * Opens the modal dialog with pre-filled task details.
 * @param {Object} task - The task object to display in the modal.
 */
function openTaskModal(task) {
  const modalHeader = document.getElementById("header-text");
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const modalSave = document.getElementById("save");
  modalSave.style.display = "initial";
  const modalDelete = document.getElementById("delete");
  modalDelete.disabled = false;
  const modalCreate = document.getElementById("create");

  modalHeader.innerText = "Task";
  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;
  modalSave.innerHTML = "Save Changes";
  modalDelete.innerHTML = "Delete Task";
  modalCreate.style.display = "none";

  modalDelete.type = "button";

  modal.showModal();

  console.log("selected div: ", task);

  placeHolder = task;

  let form = document.querySelector("form");

  form.id = "existing-form";

  modalSave.type = "submit";

  isOld = true;

  /**
   * takes updates to task and saves them as new object and deletes original object.
   * @param {formData} form - The new form data from the entries.
   * @param {Array<Object>} currentTask - The form data with the original task id number.
   */

  form.addEventListener("submit", (d) => {
    //e.preventDefault();
    if (!isOld) return;
    console.log("Existing div submit button pressed");

    let formData = new FormData(form);
    let currentTask = Object.fromEntries(formData);
    currentTask.id = placeHolder.id;

    console.log("Current Task: ", currentTask);

    console.log("Getting rid of: ", placeHolder);

    let index = initialTasks.findIndex((obj) => obj.id === placeHolder.id);
    initialTasks.splice(index, 1);

    initialTasks.push(currentTask);

    console.log(initialTasks);

    localStorage.setItem("initialTask", JSON.stringify(initialTasks));
    initialHolder = localStorage.getItem("initialTask");
    console.log("saved updated modal info");
    d.stopImmediatePropagation();
    modal.close();
    form.id = "task-form";
    modalSave.type = "button";
    initTaskBoard();

    isOld = false;
  });

  modalDelete.addEventListener("click", (a) => {
    if (!isOld) return;
    let index = initialTasks.findIndex((obj) => obj.id === placeHolder.id);
    initialTasks.splice(index, 1);

    console.log("deleted task", placeHolder);
    localStorage.setItem("initialTask", JSON.stringify(initialTasks));
    initialHolder = localStorage.getItem("initialTask");
    console.log("saved updated array info", initialTasks);
    modal.close();
    initTaskBoard();
    a.stopImmediatePropagation();
    isOld = false;
  });
}

/**
 * Add functionality to large Add Task Buttons
 * @param {button} bigAddTask - Button that only shows on large displays
 */
const bigAddTask = document.getElementById("big-add-task");

bigAddTask.addEventListener("click", () => {
  openBlankModal();
});

/**
 * Add functionality to large Add Task Buttons
 * @param {button} smallAddTask - Button that only shows on small displays
 */
const smallAddTask = document.getElementById("small-add-task");

smallAddTask.addEventListener("click", () => {
  openBlankModal();
});

/**
 * Displays empty Modal for user to input data and returns the new task.
 * @param {Object} task - Task data object.
 * @param {string} task.title - Title of the task.
 * @param {number} task.id - Unique task ID.
 * @param {string} task.status - Status column: 'todo', 'doing', or 'done'.
 */
function openBlankModal(task) {
  const modal = document.getElementById("task-modal");
  const modalHeader = document.getElementById("header-text");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const modalCreate = document.getElementById("create");
  modalCreate.style.display = "inherit";
  const modalSave = document.getElementById("save");

  const modalDelete = document.getElementById("delete");

  modalHeader.innerText = "Create New Task";
  titleInput.value = "";
  descInput.value = "";
  statusSelect.value = "";
  modalCreate.innerText = "Create Task";
  modalSave.style.display = "none";
  modalDelete.style.display = "none";

  console.log("opened blank modal");

  modal.showModal();

  task = "";

  let newForm = document.querySelector("form");
  newForm.id = "new-form";

  modalCreate.type = "submit";

  isNew = true;
  newForm.addEventListener("submit", (e) => {
    console.log("New div submit button pressed");
    if (!isNew) return;
    //e.preventDefault();
    const formData = new FormData(newForm);
    const task = Object.fromEntries(formData);
    task.id = 1;

    while (initialTasks.some((initialTasks) => initialTasks.id === task.id)) {
      if (initialTasks.some((initialTasks) => initialTasks.id === task.id)) {
        task.id = task.id + 1;
      }
    }

    initialTasks.push(task);
    localStorage.setItem("initialTask", JSON.stringify(initialTasks));
    initialHolder = localStorage.getItem("initialTask");
    console.log("saved blank modal info");
    e.stopImmediatePropagation();
    modal.close();
    newForm.id = "task-form";
    modalSave.type = "button";
    //console.log(modalSave.type);
    initTaskBoard();
    modalDelete.style.display = "initial";
    modalDelete.innerHTML = "Delete Task";
    isNew = false;
  });
}
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
