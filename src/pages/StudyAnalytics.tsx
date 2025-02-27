
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudyAnalytics = () => {
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
            <BarChart2 className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Study Analytics</h1>
          </div>
          <div className="text-center text-gray-400 p-8">
            Study analytics dashboard coming soon...
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyAnalytics;
