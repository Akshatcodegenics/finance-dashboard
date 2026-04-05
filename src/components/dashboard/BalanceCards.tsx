import { ArrowUpRight, ArrowDownRight, IndianRupee, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Card3D } from '../ui/Card3D';

export function BalanceCards() {
  const transactions = useStore((state) => state.transactions);

  const stats = transactions.reduce(
    (acc, tx) => {
      if (tx.type === 'income') acc.income += tx.amount;
      if (tx.type === 'expense') acc.expense += tx.amount;
      return acc;
    },
    { income: 0, expense: 0 }
  );

  const balance = stats.income - stats.expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
      <Card3D depth={12} className="bg-gradient-to-br from-primary/10 to-surface overflow-hidden group border border-white/60">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 rounded-full blur-[30px] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <div className="absolute right-4 bottom-4 opacity-[0.08] group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <Activity className="w-24 h-24 text-primary" />
        </div>
        
        <div className="flex flex-col h-full justify-between relative z-10">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wide">Total Balance</p>
          <div className="mt-4 flex items-center">
            <IndianRupee className="w-8 h-8 text-primary mr-1" />
            <span className="text-4xl font-display font-bold tracking-tight text-text-main">
              {balance.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-sm font-bold text-success bg-success/10 px-2 py-0.5 rounded-md">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>+14.5% vs last month</span>
            </div>
          </div>
        </div>
      </Card3D>

      <Card3D depth={8} className="overflow-hidden group border border-white/60">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-success/15 rounded-full blur-[20px] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-[0.06] group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
          <TrendingUp className="w-20 h-20 text-success" />
        </div>

        <div className="flex flex-col h-full justify-between relative z-10">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wide">Total Income</p>
          <div className="mt-4 flex items-center">
            <IndianRupee className="w-6 h-6 text-success mr-1" />
            <span className="text-3xl font-display font-bold tracking-tight text-text-main">
              {stats.income.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="mt-4 text-xs font-semibold text-text-muted">From multiple sources</p>
        </div>
      </Card3D>

      <Card3D depth={8} className="overflow-hidden group border border-white/60">
        <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-danger/15 rounded-full blur-[20px] group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
        <div className="absolute right-4 top-4 opacity-[0.06] group-hover:opacity-15 transition-opacity duration-500 pointer-events-none">
          <TrendingDown className="w-20 h-20 text-danger" />
        </div>

        <div className="flex flex-col h-full justify-between relative z-10">
          <p className="text-sm font-bold text-text-muted uppercase tracking-wide">Total Expenses</p>
          <div className="mt-4 flex items-center">
            <IndianRupee className="w-6 h-6 text-danger mr-1" />
            <span className="text-3xl font-display font-bold tracking-tight text-text-main">
              {stats.expense.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-4 flex items-center text-sm font-bold text-warning bg-warning/10 px-2 py-0.5 rounded-md inline-flex w-fit">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>Caution on food spend</span>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
