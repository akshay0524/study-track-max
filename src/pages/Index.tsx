
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import TaskCard from '../components/TaskCard';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Math Assignment',
      description: 'Chapter 5 - Calculus',
      date: new Date(),
      completed: false,
      category: 'study',
      duration: 60,
    },
    {
      id: '2',
      title: 'Read Physics Notes',
      description: 'Quantum Mechanics',
      date: new Date(),
      completed: false,
      category: 'study',
      duration: 45,
    },
  ]);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-background/95">
      <motion.header 
        ref={headerRef}
        initial={{ opacity: 0, y: -20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <span className="text-sm text-accent mb-2 block font-medium">
          Task Manager
        </span>
        <h1 className="text-4xl font-bold mb-1 bg-gradient-to-r from-white to-accent/80 bg-clip-text text-transparent">
          Your Daily Progress
        </h1>
        <p className="text-gray-400">{format(new Date(), 'EEEE, MMMM d')}</p>
      </motion.header>

      <main className="max-w-md mx-auto">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="glass-card p-6 backdrop-blur-xl"
        >
          <motion.div 
            className="flex justify-between items-center mb-6"
            variants={item}
          >
            <h2 className="text-xl font-semibold">Today's Tasks</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="nav-item flex items-center gap-2 bg-accent/10 hover:bg-accent/20"
            >
              <PlusCircle size={20} />
              <span>Add Task</span>
            </motion.button>
          </motion.div>

          <motion.div className="space-y-4" variants={container}>
            {tasks.map(task => (
              <motion.div key={task.id} variants={item}>
                <TaskCard task={task} onToggle={toggleTask} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-gray-400"
        >
          Developed by Akshay
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
