import { motion } from 'framer-motion';
import { Calendar, MonitorPlay, Wifi, Home as HomeIcon } from 'lucide-react';

export function Subscriptions() {
  const subs = [
    { name: 'Netflix', price: 649, daysLeft: 3, icon: MonitorPlay, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Internet (Jio Fiber)', price: 999, daysLeft: 7, icon: Wifi, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'House Rent', price: 15000, daysLeft: 12, icon: HomeIcon, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] relative overflow-hidden group">
      <div className="absolute -left-12 -top-12 w-32 h-32 bg-pink-400/10 rounded-full blur-[30px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      
      <h3 className="text-sm font-bold tracking-wider text-text-muted mb-6 uppercase flex items-center gap-2 relative z-10">
        <Calendar className="w-5 h-5 text-primary" />
        Upcoming Bills
      </h3>

      <div className="space-y-4 relative z-10">
        {subs.map((sub, i) => {
          const Icon = sub.icon;
          const progress = ((30 - sub.daysLeft) / 30) * 100;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 group/item hover:bg-white/50 p-2 rounded-xl transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub.bg} border border-white shadow-sm`}>
                <Icon className={`w-5 h-5 ${sub.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-text-main">{sub.name}</span>
                  <span className="text-sm font-bold text-text-main">₹{sub.price}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-elevated rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full ${sub.daysLeft <= 3 ? 'bg-danger' : 'bg-primary'}`}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${sub.daysLeft <= 3 ? 'text-danger' : 'text-text-muted'}`}>
                    {sub.daysLeft}d left
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
