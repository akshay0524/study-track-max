
import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import { Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <motion.div 
      className="task-item transform-3d"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className="flex items-center justify-between">
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
            <h3 className={`font-semibold transition-all duration-300 ${
              task.completed ? 'line-through text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-400">{task.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {task.duration && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {task.duration}m
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;
