import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { TransactionType } from '../../store/useStore';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: ModalProps) {
  const addTransaction = useStore(state => state.addTransaction);

  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !amount || !category) return;

    addTransaction({
      id: Date.now().toString(),
      date,
      amount: parseFloat(amount),
      category,
      type
    });

    // Reset & Close
    setDate('');
    setAmount('');
    setCategory('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-text-main/20 backdrop-blur-sm z-50 pointer-events-none"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-base/90 backdrop-blur-2xl rounded-[2rem] border border-white p-8 shadow-[0_30px_100px_-15px_rgba(59,130,246,0.3)] relative overflow-hidden"
            >
              {/* Graphic background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-text-muted hover:text-text-main transition-colors bg-elevated/50 p-2 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-display font-bold text-text-main mb-6">Add Transaction</h2>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="flex gap-4 p-1 bg-elevated rounded-xl">
                  <button
                    type="button"
                    onClick={() => setType('expense')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${type === 'expense' ? 'bg-white shadow-sm text-danger' : 'text-text-muted'}`}
                  >Expense</button>
                  <button
                    type="button"
                    onClick={() => setType('income')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${type === 'income' ? 'bg-white shadow-sm text-success' : 'text-text-muted'}`}
                  >Income</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Date</label>
                  <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white border border-elevated rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 ring-primary/20" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Amount (₹)</label>
                  <input required type="number" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-white border border-elevated rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 ring-primary/20" placeholder="e.g. 500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Category</label>
                  <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-white border border-elevated rounded-lg px-4 py-2.5 text-text-main focus:outline-none focus:ring-2 ring-primary/20">
                    <option value="" disabled>Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Rent">Rent</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_25px_-5px_rgba(59,130,246,0.3)]">
                  <Plus className="w-5 h-5" />
                  Add Transaction
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
