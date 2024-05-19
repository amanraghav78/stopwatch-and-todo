# Stopwatch and To-Do List Application

This is a simple React application that combines a stopwatch and a to-do list. The application allows users to track their tasks and keep a history of completed tasks. It includes the following features:

- A stopwatch to keep track of time.
- A to-do list where users can add, complete, and delete tasks.
- The ability to save tasks and stopwatch time across page refreshes.
- Automatic marking of uncompleted tasks as incomplete at the end of the day.
- History tracking of task completion across multiple days.

## Features

- **Stopwatch**: Start, stop, and reset the stopwatch.
- **To-Do List**: Add tasks, mark them as complete/incomplete, and delete them.
- **Persistence**: Keeps time and to-dos even after page refresh.
- **History**: View the history of tasks completed each day.
- **Auto Marking**: Automatically marks uncompleted tasks as incomplete at midnight.

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- npm (version 6 or later)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/stopwatch-todo-app.git
    cd stopwatch-todo-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

- **Start/Stop Stopwatch**: Click the "Start" button to start the stopwatch. Click the "Stop" button to stop it.
- **Reset Stopwatch**: Click the "Reset" button to reset the stopwatch to 0.
- **Add To-Do**: Type a new task into the input field and press the Enter key or click the "Add" button to add it to the list.
- **Complete/Undo To-Do**: Click the "Complete" button next to a task to mark it as complete. Click the "Undo" button to mark it as incomplete.
- **Delete To-Do**: Click the "Delete" button next to a task to remove it from the list.
- **Clear All To-Dos**: Click the "Clear All" button to remove all tasks from the list.
- **View History**: Scroll down to the "History" section to see the number of tasks completed each day.

## Code Structure

- `src/App.jsx`: The main component file that contains the logic and UI for the stopwatch, to-do list, and history.

### Key Functions

- `handleStartStop`: Toggles the stopwatch between running and stopped states.
- `handleReset`: Resets the stopwatch to 0.
- `handleAddTodo`: Adds a new to-do item to the list.
- `handleKeyPress`: Handles the Enter key press event to add a new to-do item.
- `toggleTodoCompletion`: Toggles the completion status of a to-do item.
- `handleDeleteTodo`: Deletes a to-do item from the list.
- `handleClearTodos`: Clears all to-do items from the list.
- `handleNewDay`: Updates the date, marks uncompleted tasks as incomplete, and saves the day's completion data to history.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

