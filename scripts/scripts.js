import { initialTask } from "../initialData.js";

 * Initializes the task board and modal handlers.
 */
export function initTaskBoard() {
  clearExistingTasks();
    renderTasks(initialTasks);
  }
  setupModalCloseHandler();
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);
