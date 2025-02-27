
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '../types/Task';
import TaskCard from '../components/TaskCard';
import { PlusCircle, Calendar, BarChart2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { toast } from "sonner";

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
      priority: 'high',
      tags: ['Math', 'Homework'],
    },
    {
      id: '2',
      title: 'Read Physics Notes',
      description: 'Quantum Mechanics',
      date: new Date(),
      completed: false,
      category: 'study',
      duration: 45,
      priority: 'medium',
      tags: ['Physics', 'Reading'],
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

  const addNewTask = () => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: 'New Task',
      description: 'Click to edit',
      date: new Date(),
      completed: false,
      category: 'study',
      duration: 30,
      priority: 'medium',
      tags: ['New'],
    };
    setTasks([...tasks, newTask]);
    toast.success("New task added!");
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
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-background/95 perspective-container">
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

      <main className="max-w-3xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Link to="/monthly-view">
            <motion.div 
              variants={item}
              whileHover={{ scale: 1.02, translateZ: 20 }}
              className="glass-card p-4 text-center cursor-pointer"
            >
              <Calendar className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-medium">Monthly View</h3>
            </motion.div>
          </Link>
          
          <Link to="/study-analytics">
            <motion.div 
              variants={item}
              whileHover={{ scale: 1.02, translateZ: 20 }}
              className="glass-card p-4 text-center cursor-pointer"
            >
              <BarChart2 className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-medium">Study Analytics</h3>
            </motion.div>
          </Link>
          
          <Link to="/time-tracking">
            <motion.div 
              variants={item}
              whileHover={{ scale: 1.02, translateZ: 20 }}
              className="glass-card p-4 text-center cursor-pointer"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
              <h3 className="font-medium">Time Tracking</h3>
            </motion.div>
          </Link>
        </motion.div>

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
              onClick={addNewTask}
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
