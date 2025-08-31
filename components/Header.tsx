import React from 'react';
import PlusIcon from './icons/PlusIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import { TaskStatus } from '../types';

interface HeaderProps {
  onAddTask: () => void;
  visibleStatuses: TaskStatus[];
  onToggleStatus: (status: TaskStatus) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const statusFilters: TaskStatus[] = [TaskStatus.ToDo, TaskStatus.InProgress, TaskStatus.Done];

const Header: React.FC<HeaderProps> = ({ onAddTask, visibleStatuses, onToggleStatus, theme, onToggleTheme }) => {
  return (
    <header className="p-4 sm:p-6 bg-header backdrop-blur-lg border-b border-border-primary sticky top-0 z-20">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-wider">
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
            style={{ textShadow: '0 0 10px rgba(129, 140, 248, 0.4)' }}
          >
            Kaban
          </span> Task Manager
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 order-3 sm:order-2 w-full sm:w-auto justify-center">
            <span className="text-sm text-text-secondary hidden sm:inline">Show:</span>
            {statusFilters.map(status => (
              <button
                  key={status}
                  onClick={() => onToggleStatus(status)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                      visibleStatuses.includes(status)
                          ? 'bg-accent text-accent-text shadow-button-accent-md'
                          : 'bg-button-secondary text-text-secondary hover:bg-button-secondary-hover'
                  }`}
              >
                  {status}
              </button>
          ))}
        </div>

        <div className="flex items-center gap-2 order-2 sm:order-3">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-button-secondary focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
          </button>
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-text rounded-lg shadow-button-accent-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/50 transform hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;