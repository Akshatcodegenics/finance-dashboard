import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, PieChart, Wallet } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function CommandPalette({ onOpenTransaction }: { onOpenTransaction: () => void }) {
  const { isCommandOpen, setCommandOpen } = useStore();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen(!isCommandOpen);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, setCommandOpen]);

  const commands = [
    { id: 1, title: 'Add New Transaction', icon: Plus, action: () => { setCommandOpen(false); onOpenTransaction(); } },
    { id: 2, title: 'View Financial Analytics', icon: PieChart, action: () => { setCommandOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}); } },
    { id: 3, title: 'Check Savings Goals', icon: Wallet, action: () => { setCommandOpen(false); window.scrollTo({top: 500, behavior: 'smooth'}); } },
  ];

  const filtered = commands.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandOpen(false)}
            className="fixed inset-0 bg-text-main/10 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 transform -translate-x-1/2 w-full max-w-xl bg-surface/90 backdrop-blur-3xl border border-white rounded-[2rem] shadow-[0_30px_100px_-15px_rgba(59,130,246,0.3)] z-[90] overflow-hidden flex flex-col"
          >
            <div className="p-4 flex items-center border-b border-elevated">
              <Search className="w-5 h-5 text-text-muted mr-3" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What do you need to do? (e.g. 'Add Transaction')"
                className="flex-1 bg-transparent border-none outline-none text-text-main text-lg placeholder-text-muted/50 font-medium"
              />
              <span className="text-xs font-bold text-text-muted bg-elevated px-2 py-1 rounded-md border border-white">ESC</span>
            </div>
            
            <div className="p-2 max-h-[300px] overflow-y-auto scrollbar-hide">
              {filtered.length > 0 ? (
                filtered.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-4 p-3 hover:bg-primary/5 rounded-xl transition-colors text-left group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-elevated/50 flex items-center justify-center border border-white group-hover:bg-white group-hover:border-primary/20 transition-all">
                        <Icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                      </div>
                      <span className="font-semibold text-text-main group-hover:text-primary transition-colors">{cmd.title}</span>
                    </button>
                  );
                })
              ) : (
                <div className="p-8 text-center text-text-muted text-sm font-medium">
                  No commands found.
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
