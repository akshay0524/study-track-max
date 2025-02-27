
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const MonthlyView = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-background to-background/95">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Link to="/" className="text-accent hover:text-accent-light mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Monthly Overview</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Task Statistics</h3>
              <p>Total Tasks: 15</p>
              <p>Completed: 8</p>
              <p>Pending: 7</p>
            </div>
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-2">Most Productive Days</h3>
              <p>1. Monday (5 tasks)</p>
              <p>2. Wednesday (4 tasks)</p>
              <p>3. Friday (3 tasks)</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MonthlyView;
