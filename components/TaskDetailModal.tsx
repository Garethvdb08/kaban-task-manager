import React from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import CalendarIcon from './icons/CalendarIcon';
import StatusIcon from './icons/StatusIcon';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const getStatusStyles = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ToDo:
      return { text: 'text-status-todo', bg: 'bg-status-todo-bg', border: 'border-status-todo/50' };
    case TaskStatus.InProgress:
      return { text: 'text-status-inprogress', bg: 'bg-status-inprogress-bg', border: 'border-status-inprogress/50' };
    case TaskStatus.Done:
      return { text: 'text-status-done', bg: 'bg-status-done-bg', border: 'border-status-done/50' };
    default:
      return { text: 'text-text-secondary', bg: 'bg-button-secondary', border: 'border-border-secondary' };
  }
};

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task }) => {
  if (!isOpen || !task) return null;

  const statusStyles = getStatusStyles(task.status);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-modal backdrop-blur-xl rounded-xl p-8 shadow-2xl w-full max-w-lg m-4 border border-border-primary animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold text-text-primary mb-4 break-words">{task.title}</h2>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-text-secondary">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${statusStyles.border} ${statusStyles.bg}`}>
            <StatusIcon className={`w-4 h-4 ${statusStyles.text}`} />
            <span className={`font-medium ${statusStyles.text}`}>{task.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Created on {new Date(task.creationDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-text-primary mb-2">Description</h3>
          <p className="text-text-secondary whitespace-pre-wrap break-words bg-input p-4 rounded-lg border border-border-secondary">
            {task.description || 'No description provided.'}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-accent text-accent-text font-bold rounded-lg shadow-button-accent-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/50 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;