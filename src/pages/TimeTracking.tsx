
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const TimeTracking = () => {
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
            <Clock className="w-6 h-6 text-accent" />
            <h1 className="text-2xl font-bold">Time Management</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Daily Goals</h3>
              </div>
              <div className="space-y-2">
                <p>✓ Complete 3 tasks</p>
                <p>✓ Study for 2 hours</p>
                <p>□ Review notes</p>
              </div>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Focus Sessions</h3>
              </div>
              <div className="space-y-2">
                <p>Morning: 1.5 hrs</p>
                <p>Afternoon: 2 hrs</p>
                <p>Evening: 1 hr</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimeTracking;
