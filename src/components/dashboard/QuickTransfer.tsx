import { useState, useMemo } from 'react';
import { ArrowLeftRight, CheckCircle2, Wallet, PiggyBank } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';

export function QuickTransfer() {
  const { transactions, addTransaction } = useStore();
  const [amount, setAmount] = useState('');
  const [sent, setSent] = useState(false);
  const [direction, setDirection] = useState<'to_savings' | 'to_checking'>('to_savings');

  // Calculate generic balances
  const checkingBalance = useMemo(() => {
    return transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0) + 150000; 
  }, [transactions]);
  
  // Mock savings that grows when you transfer
  const savingsBalance = useMemo(() => {
    return transactions.filter(t => t.category === 'Transfer to Savings').reduce((acc, t) => acc + t.amount, 50000) - 
           transactions.filter(t => t.category === 'Transfer to Checking').reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  const handleTransfer = () => {
    const val = Number(amount);
    if (!amount || isNaN(val) || val <= 0) return;

    // Ensure they have enough
    if (direction === 'to_savings' && checkingBalance < val) return alert("Insufficient Checking Balance");
    if (direction === 'to_checking' && savingsBalance < val) return alert("Insufficient Savings Balance");

    setSent(true);
    
    // Add real transaction to the unified ledger so charts react
    addTransaction({
      id: Math.random().toString(),
      date: new Date().toISOString().split('T')[0],
      amount: val,
      category: direction === 'to_savings' ? 'Transfer to Savings' : 'Transfer to Checking',
      type: direction === 'to_savings' ? 'expense' : 'income'
    });

    setTimeout(() => {
      setSent(false);
      setAmount('');
    }, 2500);
  };

  return (
    <div className="w-full bg-surface backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.05)] relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-[30px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
      
      <h3 className="text-sm font-bold tracking-wider text-text-muted mb-6 uppercase flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-primary" />
          Quick Move
        </div>
      </h3>

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4 relative z-10"
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm font-bold p-3 bg-white border border-elevated rounded-xl shadow-sm cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => setDirection(prev => prev === 'to_savings' ? 'to_checking' : 'to_savings')}>
                <div className="flex items-center gap-2 text-text-main">
                  {direction === 'to_savings' ? <Wallet className="w-4 h-4 text-primary" /> : <PiggyBank className="w-4 h-4 text-success" />}
                  <span>{direction === 'to_savings' ? 'Checking' : 'Savings'}</span>
                </div>
                <ArrowLeftRight className="w-4 h-4 text-text-muted" />
                <div className="flex items-center gap-2 text-text-main">
                  {direction === 'to_savings' ? <PiggyBank className="w-4 h-4 text-success" /> : <Wallet className="w-4 h-4 text-primary" />}
                  <span>{direction === 'to_savings' ? 'Savings' : 'Checking'}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs font-semibold text-text-muted px-1">
                <span>Avail: ₹{(direction === 'to_savings' ? checkingBalance : savingsBalance).toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="relative group/input">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-lg">₹</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white border border-elevated rounded-xl pl-8 pr-16 py-3 text-lg font-bold text-text-main outline-none focus:ring-2 ring-primary/20 shadow-sm transition-all"
              />
              <button 
                onClick={() => setAmount((direction === 'to_savings' ? checkingBalance : savingsBalance).toString())}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-elevated text-text-muted px-2 py-1 rounded-md hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                MAX
              </button>
            </div>

            <button 
              onClick={handleTransfer}
              disabled={!amount || Number(amount) <= 0}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-[0_5px_15px_-3px_rgba(59,130,246,0.4)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
            >
              Transfer Now
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="flex flex-col items-center justify-center py-6 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4 border border-success/20 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
            >
              <CheckCircle2 className="w-8 h-8 text-success" />
            </motion.div>
            <span className="text-base font-bold text-text-main">Transfer Successful!</span>
            <span className="text-sm font-medium text-text-muted mt-1">Your balances have been updated.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
