import React, { useState } from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import { useAppDispatch } from '../store/hooks';
import { deleteTask } from '../store/tasksSlice';
import TrashIcon from './icons/TrashIcon';
import PencilIcon from './icons/PencilIcon';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onView: (task: Task) => void;
}

const getStatusGradientClasses = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.ToDo:
      return 'bg-gradient-to-br from-card-todo-from to-card-todo-to';
    case TaskStatus.InProgress:
      return 'bg-gradient-to-br from-card-inprogress-from to-card-inprogress-to';
    case TaskStatus.Done:
      return 'bg-gradient-to-br from-card-done-from to-card-done-to';
    default:
      return 'bg-card';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onView }) => {
  const dispatch = useAppDispatch();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isConfirmingDelete) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('taskId', task.id);
    setIsDragging(true);
  };
  
  const handleDragEnd = () => {
    setIsDragging(false);
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(true);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsConfirmingDelete(false);
  };

  if (isConfirmingDelete) {
    return (
      <div
        className="bg-red-900/50 p-4 rounded-xl shadow-lg mb-4 border-2 border-red-500 ring-4 ring-red-500/20"
        aria-live="polite"
      >
        <p className="text-gray-100 text-sm mb-3 font-medium">Permanently delete this task?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancelDelete}
            className="px-3 py-1 text-xs text-gray-200 rounded-md hover:bg-gray-700/50 focus:outline-none transition-colors"
            aria-label="Cancel task deletion"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-md shadow-button-regular-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900 focus:ring-red-500 transition-colors"
            aria-label={`Confirm deleting task "${task.title}"`}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  const draggingStyles = isDragging ? 'opacity-60 rotate-3 scale-105 shadow-2xl shadow-accent' : '';
  const gradientClasses = getStatusGradientClasses(task.status);

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onView(task)}
      className={`group relative p-4 rounded-xl shadow-lg cursor-pointer active:cursor-grabbing mb-4 border border-border-secondary hover:border-accent/80 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-in-out ${gradientClasses} ${draggingStyles}`}
      role="button"
      tabIndex={0}
      aria-label={`View details for task: ${task.title}`}
    >
      <h4 className="font-bold text-text-primary mb-1 pr-12">{task.title}</h4>
      <p className="text-sm text-text-secondary break-words truncate">{task.description}</p>
      
      <div 
        className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleEditClick}
          className="p-1.5 text-text-secondary hover:text-accent bg-background-primary/50 rounded-md hover:bg-button-secondary transition-all"
          aria-label={`Edit task "${task.title}"`}
        >
          <PencilIcon className="w-4 h-4"/>
        </button>
        <button 
          onClick={handleDeleteClick}
          className="p-1.5 text-text-secondary hover:text-red-500 bg-background-primary/50 rounded-md hover:bg-button-secondary transition-all"
          aria-label={`Delete task "${task.title}"`}
        >
          <TrashIcon className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;