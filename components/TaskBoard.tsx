import React from 'react';
import { useAppSelector } from '../store/hooks';
import Column from './Column';
import { TaskStatus, Task } from '../types';

interface TaskBoardProps {
  onEditTask: (task: Task) => void;
  onViewTask: (task: Task) => void;
  visibleStatuses: TaskStatus[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ onEditTask, onViewTask, visibleStatuses }) => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const columns = [TaskStatus.ToDo, TaskStatus.InProgress, TaskStatus.Done]
    .filter(status => visibleStatuses.includes(status));

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            onEditTask={onEditTask}
            onViewTask={onViewTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
