import { useState } from 'react';

import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BrainCircuit, IndianRupee } from 'lucide-react';

export function WealthProjection() {
  const [extraSave, setExtraSave] = useState(5000);
  const baseWealth = 50000;
  
  // Calculate projected growth for 6 months
  const data = Array.from({ length: 6 }).map((_, i) => ({
    month: `M${i+1}`,
    base: baseWealth + (5000 * i), // Assuming current savings rate is 5k
    projected: baseWealth + ((5000 + extraSave) * i)
  }));

  const finalAmount = data[5].projected;

  return (
    <div className="w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] relative overflow-hidden group">
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-primary/5 rounded-full blur-[40px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <h3 className="text-sm font-bold tracking-wider text-text-muted uppercase flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" />
          Smart Projection
        </h3>
        <div className="text-right">
          <p className="text-xs text-text-muted font-bold tracking-wide uppercase">In 6 Months</p>
          <span className="text-xl font-display font-bold text-success flex items-center justify-end">
            <IndianRupee className="w-4 h-4 mr-0.5" />
            {finalAmount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="h-[120px] w-full relative z-10 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" hide />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            />
            <Line type="monotone" dataKey="base" stroke="#94A3B8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
            <Line type="monotone" dataKey="projected" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 relative z-10">
        <div className="flex justify-between text-sm font-bold text-text-main mb-2">
          <span>If I invest an extra:</span>
          <span className="text-primary flex items-center">
            <IndianRupee className="w-3 h-3" />{extraSave.toLocaleString()} / mo
          </span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="20000" 
          step="1000"
          value={extraSave} 
          onChange={(e) => setExtraSave(Number(e.target.value))}
          className="w-full h-2 bg-elevated rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-xs text-text-muted font-medium mt-1">
          <span>₹0</span>
          <span>₹20k</span>
        </div>
      </div>
    </div>
  );
}
