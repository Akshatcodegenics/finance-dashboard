import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { AIInsight } from './components/dashboard/AIInsight';
import { BalanceCards } from './components/dashboard/BalanceCards';
import { TransactionTable } from './components/dashboard/TransactionTable';
import { SpendingChart } from './components/dashboard/Charts';
import { GoalTracker } from './components/dashboard/GoalTracker';
import { SpendingHeatmap } from './components/dashboard/SpendingHeatmap';
import { Subscriptions } from './components/dashboard/Subscriptions';
import { WealthProjection } from './components/dashboard/WealthProjection';
import { AiChatPanel } from './components/dashboard/AiChatPanel';
import { CommandPalette } from './components/ui/CommandPalette';
import { MarketTicker } from './components/dashboard/MarketTicker';
import { QuickTransfer } from './components/dashboard/QuickTransfer';
import { FinancialStory } from './components/dashboard/FinancialStory';
import { useStore } from './store/useStore';

function App() {
  const [isChatOpen, setChatOpen] = useState(false);
  const setAddModalOpen = useStore(state => state.setAddModalOpen);

  return (
    <div className="min-h-screen relative font-sans antialiased text-text-main overflow-x-hidden">
      {/* Global Background Ambient */}
      <div className="fixed inset-0 bg-base -z-20" />

      <Navbar />
      <MarketTicker />
      <AiChatPanel isOpen={isChatOpen} onClose={() => setChatOpen(false)} />
      <CommandPalette onOpenTransaction={() => setAddModalOpen(true)} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        <AIInsight onOpenChat={() => setChatOpen(true)} />
        <BalanceCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <SpendingChart />
            <TransactionTable />
          </div>
          
          <div className="space-y-8">
            <FinancialStory />
            <GoalTracker />
            <QuickTransfer />
            <WealthProjection />
            <Subscriptions />
            <SpendingHeatmap />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
