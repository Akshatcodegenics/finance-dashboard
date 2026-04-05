import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function SpendingHeatmap() {
  const heatmapData = useMemo(() => {
    return Array.from({ length: 28 }).map(() => {
      const val = Math.random();
      let intensity = 0;
      if (val > 0.8) intensity = 3;
      else if (val > 0.5) intensity = 2;
      else if (val > 0.2) intensity = 1;
      return intensity;
    });
  }, []);

  const getColor = (intensity: number) => {
    switch (intensity) {
      case 3: return 'bg-primary border-primary shadow-[0_0_10px_rgba(59,130,246,0.3)] z-10';
      case 2: return 'bg-primary/60 border-primary/40';
      case 1: return 'bg-primary/30 border-primary/20';
      default: return 'bg-elevated/50 border-elevated shadow-inner';
    }
  };

  return (
    <div className="w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] relative overflow-hidden group">
      <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-primary/5 rounded-full blur-[30px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      
      <h3 className="text-sm font-bold tracking-wider text-text-muted mb-6 uppercase relative z-10">
        Activity Matrix
      </h3>
      <div className="grid grid-cols-7 gap-2 relative z-10">
        {heatmapData.map((intensity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            className={`w-full aspect-square rounded-md cursor-pointer border hover:border-black/20 hover:scale-110 transition-all duration-200 relative ${getColor(intensity)}`}
            title={`Intensity: ${intensity}`}
          />
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-2 text-xs font-medium text-text-muted relative z-10">
        <span>Idle</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-elevated/50 border border-elevated"></div>
          <div className="w-3 h-3 rounded bg-primary/30 border border-primary/20"></div>
          <div className="w-3 h-3 rounded bg-primary/60 border border-primary/40"></div>
          <div className="w-3 h-3 rounded bg-primary border-primary"></div>
        </div>
        <span>Active</span>
      </div>
    </div>
  );
}
