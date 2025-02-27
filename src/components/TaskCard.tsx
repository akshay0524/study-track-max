
import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
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
        <div className="flex items-center gap-3">
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
          <div>
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
        </div>
        <div className="flex flex-col items-end gap-2">
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
