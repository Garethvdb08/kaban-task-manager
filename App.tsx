import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import AddTaskModal from './components/AddTaskModal';
import EditTaskModal from './components/EditTaskModal';
import TaskDetailModal from './components/TaskDetailModal';
import { Task, TaskStatus } from './types';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToView, setTaskToView] = useState<Task | null>(null);
  const [visibleStatuses, setVisibleStatuses] = useState<TaskStatus[]>([
    TaskStatus.ToDo,
    TaskStatus.InProgress,
    TaskStatus.Done,
  ]);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleOpenEditModal = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleCloseEditModal = () => {
    setTaskToEdit(null);
  };

  const handleOpenDetailModal = (task: Task) => {
    setTaskToView(task);
  };

  const handleCloseDetailModal = () => {
    setTaskToView(null);
  };
  
  const handleToggleStatusVisibility = (status: TaskStatus) => {
    setVisibleStatuses(prev => {
        const newStatuses = prev.includes(status) 
            ? prev.filter(s => s !== status) 
            : [...prev, status];
        // Ensure at least one status is always visible to avoid a blank screen
        return newStatuses.length > 0 ? newStatuses : prev;
    });
  };

  return (
    <div className="min-h-screen text-text-primary font-sans selection:bg-indigo-500/30">
      <div className="aurora-background"></div>
      <Header
        onAddTask={() => setIsAddModalOpen(true)}
        visibleStatuses={visibleStatuses}
        onToggleStatus={handleToggleStatusVisibility}
        theme={theme}
        onToggleTheme={handleThemeToggle}
      />
      <main>
        <TaskBoard
          onEditTask={handleOpenEditModal}
          onViewTask={handleOpenDetailModal}
          visibleStatuses={visibleStatuses}
        />
      </main>
      <AddTaskModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {taskToEdit && (
        <EditTaskModal
          isOpen={!!taskToEdit}
          onClose={handleCloseEditModal}
          task={taskToEdit}
        />
      )}
      <TaskDetailModal
        isOpen={!!taskToView}
        onClose={handleCloseDetailModal}
        task={taskToView}
      />
    </div>
  );
};

export default App;