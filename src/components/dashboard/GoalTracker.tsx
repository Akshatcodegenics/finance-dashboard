import { motion } from 'framer-motion';
import { Target, IndianRupee } from 'lucide-react';

export function GoalTracker() {
  const goal = 50000;
  const current = 32000;
  const progress = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-[20px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" /> 
          Savings Goal
        </h3>
        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-md">{progress.toFixed(1)}%</span>
      </div>

      <div className="flex items-end justify-between mb-4 relative z-10">
        <span className="text-2xl font-display font-bold text-text-main flex items-center">
          <IndianRupee className="w-5 h-5 mr-0.5 mt-1" />
          {current.toLocaleString('en-IN')}
        </span>
        <span className="text-sm font-medium text-text-muted flex items-center">
          Goal: <IndianRupee className="w-3 h-3 ml-1" /> {goal.toLocaleString('en-IN')}
        </span>
      </div>

      <div className="relative h-4 w-full bg-elevated rounded-full overflow-hidden shadow-inner relative z-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
        />
        <motion.div 
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: `${progress}%`, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2 -ml-2 w-4 h-4 bg-white/40 blur-sm rounded-full"
        />
      </div>
    </div>
  );
}
