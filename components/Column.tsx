import React, { useState, useMemo } from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import TaskCard from './TaskCard';
import { useAppDispatch } from '../store/hooks';
import { updateTaskStatus } from '../store/tasksSlice';
import ChevronDownIcon from './icons/ChevronDownIcon';

type SortKey = 'creationDate' | 'title';
type SortOrder = 'asc' | 'desc';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onViewTask: (task: Task) => void;
}

const getStatusStyles = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.ToDo:
            return { color: 'bg-status-todo', shadow: 'shadow-status-todo/50' };
        case TaskStatus.InProgress:
            return { color: 'bg-status-inprogress', shadow: 'shadow-status-inprogress/50' };
        case TaskStatus.Done:
            return { color: 'bg-status-done', shadow: 'shadow-status-done/50' };
        default:
            return { color: 'bg-gray-500', shadow: 'shadow-gray-500/50' };
    }
}

const Column: React.FC<ColumnProps> = ({ status, tasks, onEditTask, onViewTask }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('creationDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
        dispatch(updateTaskStatus({ id: taskId, newStatus: status }));
    }
    setIsDraggingOver(false);
  };

  const sortedTasks = useMemo(() => {
    const tasksCopy = [...tasks];
    tasksCopy.sort((a, b) => {
      if (sortKey === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
    });
    if (sortOrder === 'desc') {
      tasksCopy.reverse();
    }
    return tasksCopy;
  }, [tasks, sortKey, sortOrder]);

  const handleSortChange = (key: SortKey, order: SortOrder) => {
    setSortKey(key);
    setSortOrder(order);
    setIsSortMenuOpen(false);
  };

  const { color, shadow } = getStatusStyles(status);
  // FIX: Explicitly type the sortOptions array to ensure key and order properties match SortKey and SortOrder types.
  const sortOptions: { key: SortKey; order: SortOrder; label: string }[] = [
    { key: 'creationDate', order: 'desc', label: 'Newest First' },
    { key: 'creationDate', order: 'asc', label: 'Oldest First' },
    { key: 'title', order: 'asc', label: 'Title (A-Z)' },
    { key: 'title', order: 'desc', label: 'Title (Z-A)' },
  ];

  return (
    <div className="w-full sm:w-1/3 flex-shrink-0">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`bg-background-secondary backdrop-blur-xl rounded-xl p-4 h-full transition-all duration-300 border border-border-primary
            ${isDraggingOver ? 'bg-accent/10 border-accent ring-4 ring-accent/30' : ''}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-3 ${color} shadow-lg ${shadow}`}></span>
            <h3 className="font-bold text-lg text-text-primary tracking-wide">{status}</h3>
            <span className="ml-3 text-sm font-medium text-text-secondary bg-button-secondary rounded-full px-2.5 py-1">{tasks.length}</span>
          </div>
          <div className="relative">
            <button onClick={() => setIsSortMenuOpen(!isSortMenuOpen)} className="p-1.5 text-text-secondary hover:text-text-primary bg-button-secondary rounded-md transition-colors">
                <ChevronDownIcon className="w-4 h-4" />
            </button>
            {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-modal backdrop-blur-lg border border-border-secondary rounded-md shadow-2xl z-10 animate-fade-in-scale origin-top-right">
                    {sortOptions.map(opt => (
                        <button key={`${opt.key}-${opt.order}`} onClick={() => handleSortChange(opt.key, opt.order)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${sortKey === opt.key && sortOrder === opt.order ? 'text-accent font-semibold' : 'text-text-secondary'} hover:bg-button-secondary-hover`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
          </div>
        </div>
        <div className="space-y-1 h-[calc(100vh-17rem)] overflow-y-auto pr-2 -mr-2">
            {sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEditTask} onView={onViewTask} />
            ))}
            {tasks.length === 0 && !isDraggingOver && (
                <div className="flex justify-center items-center h-48 border-2 border-dashed border-border-secondary rounded-xl">
                    <p className="text-text-tertiary">Drop tasks here</p>
                </div>
            )}
            {isDraggingOver && (
                <div className="flex justify-center items-center h-48 bg-accent/10 border-2 border-dashed border-accent/80 rounded-xl">
                    <p className="font-semibold text-accent">Release to add</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Column;