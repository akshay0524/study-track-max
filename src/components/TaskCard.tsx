
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import { Check, Clock, AlertTriangle, Edit2, Trash2, X, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, updatedTask: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedDueTime, setEditedDueTime] = useState(task.dueTime || '');

  useEffect(() => {
    if (task.dueTime && !task.completed) {
      const now = new Date();
      const [hours, minutes] = task.dueTime.split(':');
      const dueDate = new Date();
      dueDate.setHours(parseInt(hours), parseInt(minutes));

      if (now < dueDate) {
        const timeoutId = setTimeout(() => {
          if (!task.completed) {
            toast.error(`Task "${task.title}" is due now!`, {
              duration: 5000,
            });
            // Request notification permission and show notification
            if (Notification.permission === "granted") {
              new Notification(`Task Due: ${task.title}`, {
                body: "This task is due now!",
                icon: "/favicon.ico"
              });
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                  new Notification(`Task Due: ${task.title}`, {
                    body: "This task is due now!",
                    icon: "/favicon.ico"
                  });
                }
              });
            }
          }
        }, dueDate.getTime() - now.getTime());

        return () => clearTimeout(timeoutId);
      }
    }
  }, [task.dueTime, task.completed, task.title]);

  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  const handleSave = () => {
    onEdit(task.id, {
      title: editedTitle,
      description: editedDescription,
      dueTime: editedDueTime,
    });
    setIsEditing(false);
    toast.success('Task updated successfully!');
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast.success('Task deleted successfully!');
  };

  const handleDownload = () => {
    const taskData = {
      title: task.title,
      description: task.description,
      dueTime: task.dueTime,
      priority: task.priority,
      tags: task.tags,
      completed: task.completed,
    };

    const blob = new Blob([JSON.stringify(taskData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `task-${task.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Task downloaded successfully!');
  };

  return (
    <motion.div 
      className="task-item transform-3d perspective-card"
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        translateZ: 20
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(task.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-success border-success'
                : 'border-accent hover:border-accent-light'
            }`}
          >
            {task.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Check size={16} className="text-white" />
              </motion.div>
            )}
          </motion.button>
          
          {isEditing ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full bg-background/50 rounded px-2 py-1"
                placeholder="Task title"
              />
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full bg-background/50 rounded px-2 py-1"
                placeholder="Task description"
              />
              <input
                type="time"
                value={editedDueTime}
                onChange={(e) => setEditedDueTime(e.target.value)}
                className="w-full bg-background/50 rounded px-2 py-1"
              />
            </div>
          ) : (
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold transition-all duration-300 ${
                  task.completed ? 'line-through text-gray-400' : ''
                }`}>
                  {task.title}
                </h3>
                {task.priority && (
                  <span className={`text-xs ${priorityColors[task.priority]}`}>
                    {task.priority.toUpperCase()}
                  </span>
                )}
              </div>
              {task.description && (
                <p className="text-sm text-gray-400">{task.description}</p>
              )}
              {task.dueTime && (
                <p className="text-sm text-accent mt-1">
                  Due at: {task.dueTime}
                </p>
              )}
              {task.tags && (
                <div className="flex gap-2 mt-2">
                  {task.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 hover:bg-accent/20 rounded"
              >
                <Check size={16} className="text-green-400" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 hover:bg-accent/20 rounded"
              >
                <X size={16} className="text-red-400" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-accent/20 rounded"
                title="Edit task"
              >
                <Edit2 size={16} className="text-accent" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1 hover:bg-accent/20 rounded"
                title="Download task"
              >
                <Download size={16} className="text-accent" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-accent/20 rounded"
                title="Delete task"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 ml-4">
          {task.duration && (
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Clock size={14} />
              {task.duration}m
            </span>
          )}
          {task.priority === 'high' && !task.completed && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertTriangle size={16} className="text-red-400" />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
