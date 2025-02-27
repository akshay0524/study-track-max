
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Brain, Clock, Trophy } from 'lucide-react';
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
            <h1 className="text-2xl font-bold">Study Progress</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Study Time</h3>
              </div>
              <p className="text-2xl font-bold">12.5 hrs</p>
              <p className="text-sm text-gray-400">This week</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Topics Covered</h3>
              </div>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-gray-400">This month</p>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-gray-400">Total milestones</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudyAnalytics;
