

#[JSL05] Task Board with Local Storage Persistence and Task Creation 

#Overview

This project implements a task management system that enables users to add, categorize, and manage tasks with persistent storage using local storage. The task data persists across page refreshes or reopening the application. Tasks are organized into three categories: To Do, Doing, and Done. Users can add new tasks through a modal interface, and tasks will automatically display in the appropriate columns based on their status.

##Key Features:

Tasks are saved and retrieved from local storage, ensuring persistence even after page refreshes.

Tasks can be created via an Add Task modal with fields for title, description, and status.

Tasks are categorized correctly into To Do, Doing, and Done columns.

The application is mobile-responsive and functions properly on both desktop and mobile devices.

The design of the modal and task board follows a clean, user-friendly layout, as specified in the Figma design.

##Technologies Used

Frontend: HTML5, CSS3, JavaScript

Local Storage: To persist tasks across sessions.

Responsive Design: Flexbox and media queries to ensure the app works on both desktop and mobile devices.

Modular JavaScript: Separated functionality into distinct modules (e.g., local storage handling, task rendering, modal management).

##Features Created

Persistent Task Storage: Tasks are saved in local storage, ensuring data is retained even after page reloads.

Task Categories: Tasks are categorized under "To Do", "Doing", and "Done" based on their status.

Add Task Modal: A modal dialog is provided to add tasks, with fields for title, description, and status. Tasks are immediately added to the task board without a refresh.

Mobile-Responsive Design: The app and modal design adapt well to mobile screens.

##Updated

Refined Code Structure: The JavaScript code is modularized for easier maintenance. Functions for task creation, storage handling, and task rendering are separated into distinct modules.

Improved User Experience: The Add Task button transforms responsively on mobile devices to fit the design specs.

##Setup Instructions

###Prerequisites

Make sure you have the following tools installed on your local machine:

A modern browser (Chrome, Firefox, Edge, etc.)

###Installation Steps

Clone the repository:

git clone https://github.com/yourusername/task-management-system.git


###Navigate to the project directory:

cd task-management-system


###Open the project in your browser:
Simply open the index.html file in your preferred browser. The application does not require any back-end setup as it runs entirely in the browser using local storage for persistence.

###Start using the application:

Open the page in your browser. The task board will load, and any existing tasks from local storage will be displayed in their respective columns ("To Do", "Doing", "Done").

Click the Add Task button to open the modal, where you can create a new task.

##Usage Examples

###Creating a New Task:

Click the Add Task button on the task board.

In the modal, enter a task title and description, and select a status (To Do, Doing, or Done).

Press Submit to add the task to the task board. The task will appear in the appropriate column and will be saved in local storage.

###Viewing Tasks:

All tasks are organized into three columns: To Do, Doing, and Done.

Tasks will automatically load from local storage when the page is refreshed or reopened.

###Responsive Interaction:

On mobile devices, the Add Task button transforms into a more accessible format, and the task board adjusts to fit smaller screens.

##Interaction Instructions

###Add Task:

Click the Add Task button to open the modal.

Fill in the task title, description, and choose the task's status (To Do, Doing, or Done).

Press Create Task to add the task to the board and save it in local storage.

Task Management:

Tasks will automatically be categorized under the correct columns based on their status.

On a page refresh, tasks will be reloaded from local storage, ensuring the board remains consistent.

Code Structure & Maintainability

