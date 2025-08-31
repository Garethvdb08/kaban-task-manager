import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '../types';
import { TaskStatus } from '../types';

interface TasksState {
  tasks: Task[];
}

const loadState = (): TasksState => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return { tasks: [] };
    }
    const parsedState = JSON.parse(serializedState);
    return { tasks: parsedState.tasks || [] };
  } catch (err) {
    console.error("Could not load state from local storage", err);
    return { tasks: [] };
  }
};

const initialState: TasksState = loadState();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTask: Task = {
        id: `task-${new Date().getTime()}-${Math.random()}`,
        title: action.payload.title,
        description: action.payload.description,
        status: TaskStatus.ToDo,
        creationDate: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; newStatus: TaskStatus }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.newStatus;
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
    },
  },
});

export const { addTask, deleteTask, updateTaskStatus, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;