import { initialTask } from "../initialData.js";

var initialHolder = localStorage.getItem("initialTask");

if (initialHolder !== null) {
  var initialTasks = JSON.parse(initialHolder);
} else {
  var initialTasks = initialTask;
}
let isNew = false;
let isOld = false;
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
