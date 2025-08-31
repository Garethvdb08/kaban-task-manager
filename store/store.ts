import { configureStore, Middleware } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  // FIX: Safely access action.type to prevent error when action is of type 'unknown'.
  if (typeof (action as any)?.type === 'string' && (action as any).type.startsWith('tasks/')) {
    const tasksState = store.getState().tasks;
    try {
      const serializedState = JSON.stringify(tasksState);
      localStorage.setItem('tasks', serializedState);
    } catch (err) {
      console.error("Could not save state to local storage", err);
    }
  }
  return result;
};


export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;