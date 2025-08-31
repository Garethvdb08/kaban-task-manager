import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addTask } from '../store/tasksSlice';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addTask({ title, description }));
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-modal backdrop-blur-xl rounded-xl p-8 shadow-2xl w-full max-w-md m-4 border border-border-primary animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">Create a New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-text-secondary text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-input text-text-primary border-2 border-border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-text-secondary text-sm font-bold mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-input text-text-primary border-2 border-border-secondary rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-text-secondary rounded-lg hover:bg-button-secondary-hover focus:outline-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-accent text-accent-text font-bold rounded-lg shadow-button-accent-lg hover:bg-accent-hover focus:outline-none focus:ring-4 focus:ring-accent/50 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;