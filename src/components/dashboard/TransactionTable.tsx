import { useState } from 'react';
import { IndianRupee, Trash2, Edit2, Plus, Search, Utensils, Briefcase, Home, Gamepad2, Zap, Car, Tags } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { AddTransactionModal } from './AddTransactionModal';

const getCategoryIcon = (category: string) => {
  let icon;
  let bgClass;
  switch (category.toLowerCase()) {
    case 'food': 
      icon = <Utensils className="w-4 h-4 text-orange-500" />;
      bgClass = "bg-orange-100 border-orange-200";
      break;
    case 'salary':
    case 'freelance': 
      icon = <Briefcase className="w-4 h-4 text-emerald-600" />;
      bgClass = "bg-emerald-100 border-emerald-200";
      break;
    case 'rent': 
      icon = <Home className="w-4 h-4 text-purple-600" />;
      bgClass = "bg-purple-100 border-purple-200";
      break;
    case 'entertainment': 
      icon = <Gamepad2 className="w-4 h-4 text-pink-600" />;
      bgClass = "bg-pink-100 border-pink-200";
      break;
    case 'utilities': 
      icon = <Zap className="w-4 h-4 text-yellow-600" />;
      bgClass = "bg-yellow-100 border-yellow-200";
      break;
    case 'transport': 
      icon = <Car className="w-4 h-4 text-blue-600" />;
      bgClass = "bg-blue-100 border-blue-200";
      break;
    default: 
      icon = <Tags className="w-4 h-4 text-text-muted" />;
      bgClass = "bg-elevated border-elevated";
  }
  return (
    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bgClass} shadow-sm`}>
      {icon}
    </div>
  );
};

export function TransactionTable() {
  const { transactions, role, deleteTransaction, isAddModalOpen, setAddModalOpen } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.amount.toString().includes(searchTerm)
  );

  return (
    <div className="w-full bg-surface border border-white rounded-[2rem] p-6 overflow-hidden flex flex-col h-auto relative group shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] backdrop-blur-xl">
      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
      
      {/* Visual background embellishment */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <h2 className="text-xl font-display font-bold text-text-main">Recent Transactions</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 border border-elevated rounded-xl bg-white shadow-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm pl-10 pr-4 py-2 outline-none text-text-main placeholder-text-muted"
            />
          </div>
          {role === 'admin' && (
            <button 
              onClick={() => setAddModalOpen(true)}
              className="flex-shrink-0 bg-primary hover:bg-primary/90 text-white p-2 rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-[0_5px_15px_rgba(59,130,246,0.2)]"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto flex-1 scrollbar-hide relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-elevated text-sm text-text-muted font-medium">
              <th className="pb-3 pr-4 font-normal">Date</th>
              <th className="pb-3 pr-4 font-normal">Category</th>
              <th className="pb-3 pr-4 font-normal text-right">Amount</th>
              {role === 'admin' && <th className="pb-3 font-normal text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((tx) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="border-b border-elevated/50 last:border-0 hover:bg-primary/5 transition-colors group/row"
                >
                  <td className="py-4 pr-4 whitespace-nowrap text-sm text-text-muted">{tx.date}</td>
                  <td className="py-4 pr-4 whitespace-nowrap text-sm font-medium text-text-main">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(tx.category)}
                      {tx.category}
                    </div>
                  </td>
                  <td className="py-4 pr-4 whitespace-nowrap text-sm text-right">
                    <span className={`inline-flex font-semibold items-center ${tx.type === 'income' ? 'text-success' : 'text-text-main'}`}>
                      {tx.type === 'income' ? '+' : '-'}
                      <IndianRupee className="w-3 h-3 mx-0.5" />
                      {tx.amount.toLocaleString('en-IN')}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-opacity">
                        <button className="p-1.5 text-text-muted hover:text-primary transition-colors cursor-pointer rounded bg-white shadow-sm border border-elevated">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-1.5 text-text-muted hover:text-danger transition-colors cursor-pointer rounded bg-white shadow-sm border border-elevated"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted text-sm">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
