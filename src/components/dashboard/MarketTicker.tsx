import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const indices = [
  { symbol: 'NIFTY 50', value: '22,453.30', change: '+1.2%', up: true },
  { symbol: 'SENSEX', value: '73,903.91', change: '+1.1%', up: true },
  { symbol: 'BANKNIFTY', value: '47,940.45', change: '-0.3%', up: false },
  { symbol: 'RELIANCE', value: '2,934.10', change: '+2.4%', up: true },
  { symbol: 'HDFCBANK', value: '1,532.70', change: '-1.2%', up: false },
  { symbol: 'TCS', value: '4,015.50', change: '+0.5%', up: true },
];

export function MarketTicker() {
  return (
    <div className="w-full h-10 bg-surface/50 backdrop-blur-md border-b border-white overflow-hidden flex items-center relative z-40">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-base to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-base to-transparent z-10 pointer-events-none" />
      
      <div className="flex items-center gap-2 px-4 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)] z-20 bg-surface/80">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest whitespace-nowrap">Live Markets</span>
      </div>

      {/* Infinite Scroll Container */}
      <div className="flex-1 overflow-hidden flex items-center">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
          className="flex items-center gap-10 whitespace-nowrap pr-10 hover:[animation-play-state:paused]"
        >
          {/* Double array to create seamless loop */}
          {[...indices, ...indices, ...indices].map((idx, i) => (
            <div key={i} className="flex items-center gap-2 font-medium">
              <span className="text-xs text-text-main font-bold">{idx.symbol}</span>
              <span className="text-xs text-text-main">{idx.value}</span>
              <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${idx.up ? 'text-success bg-success/10' : 'text-danger bg-danger/10'}`}>
                {idx.up ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {idx.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
