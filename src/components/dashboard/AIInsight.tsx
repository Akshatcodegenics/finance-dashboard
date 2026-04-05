import { motion } from 'framer-motion';
import { Sparkles, Bot, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Props {
  onOpenChat: () => void;
}

export function AIInsight({ onOpenChat }: Props) {
  const transactions = useStore((state) => state.transactions);
  
  const expenses = transactions.filter(t => t.type === 'expense');
  const highestExpense = expenses.reduce((prev, current) => (prev.amount > current.amount) ? prev : current, expenses[0]);
  
  const text = highestExpense 
    ? `I noticed your highest recent expense was ₹${highestExpense.amount} on ${highestExpense.category}. You might want to review your budget there.`
    : "Your spending seems well balanced recently. Keep it up!";

  return (
    <div 
      onClick={onOpenChat}
      className="w-full relative overflow-hidden rounded-[2rem] bg-surface backdrop-blur-xl border border-white p-6 flex items-center gap-5 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] cursor-pointer group hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.15)] transition-all duration-300"
    >
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full transform -translate-y-1/2 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-400/20 transition-colors duration-700" />
      
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] flex items-center justify-center border border-white/40"
      >
        <Bot className="w-7 h-7 text-white" />
      </motion.div>

      <div className="z-10 relative flex-1">
        <h3 className="text-sm font-bold tracking-wider text-primary mb-1 flex items-center gap-2">
          AURA AI INSIGHT <Sparkles className="w-3 h-3" />
        </h3>
        <p className="text-text-main text-base leading-relaxed tracking-wide font-medium">
          {text}
        </p>
      </div>

      <div className="relative z-10 w-10 h-10 rounded-full bg-elevated/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
}
