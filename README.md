<h1 align="center">Kanban Task Manager</h1>

<p align="center">
  A modern and responsive Kanban-style task management application built with React, Redux, and Tailwind CSS.
</p>

## Overview

This project is a feature-rich Kanban board designed for efficient task management. It allows users to organize their workflow by creating, viewing, editing, and deleting tasks. Tasks can be seamlessly moved between "To Do", "In Progress", and "Done" columns using a drag-and-drop interface.

The application boasts a sleek, themeable UI with both light and dark modes, and it persists all task data directly in the browser's local storage for a seamless user experience.

## Live Demo

[View the live application here!](https://kaban-task-manager-two.vercel.app/)

## Screenshots

|                       Dark Mode                       |                       Light Mode                        |
| :---------------------------------------------------: | :-----------------------------------------------------: |
| ![Dark Mode Screenshot](./assets/kaban-dark-mode.png) | ![Light Mode Screenshot](./assets/kaban-light-mode.png) |

## Features

- **CRUD Operations:** Create, Read, Update, and Delete tasks.
- **Drag & Drop:** Intuitively move tasks between status columns.
- **Column Filtering:** Dynamically show or hide columns to focus on specific stages.
- **Task Sorting:** Sort tasks within columns by creation date or title (A-Z, Z-A).
- **Responsive Design:** A clean user experience on both desktop and mobile devices.
- **Light & Dark Modes:** Switch between themes based on system preference or manual toggle.
- **Local Storage Persistence:** Your tasks are saved in your browser, so you won't lose them on refresh.
- **Detailed Task View:** Click on any task to view its full details in a modal.
- **Confirmation Modals:** Safe delete confirmation to prevent accidental data loss.

## Tech Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Persistence:** Browser Local Storage

## Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or higher recommended)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Garethvdb08/kaban-task-manager.git
    cd kaban-task-manager
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).
