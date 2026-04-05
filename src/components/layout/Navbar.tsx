import { LayoutDashboard, LogOut, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Navbar() {
  const { role, setRole, setCommandOpen } = useStore();

  return (
    <nav className="w-full h-20 border-b border-elevated/50 bg-surface/70 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary/80 flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] border border-white/40">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide text-text-main hidden sm:block">
            Aura<span className="text-primary">Finance</span>
          </span>
        </div>

        {/* Global Search / Command Bar Trigger */}
        <button 
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-3 bg-white hover:bg-elevated/30 transition-colors border border-elevated rounded-full px-4 py-2 w-64 shadow-sm cursor-pointer group"
        >
          <Search className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
          <span className="text-sm font-medium text-text-muted flex-1 text-left">Quick Actions...</span>
          <div className="flex items-center gap-1">
            <kbd className="bg-elevated px-1.5 py-0.5 rounded text-[10px] font-bold text-text-muted border border-white shadow-sm">CTRL</kbd>
            <kbd className="bg-elevated px-1.5 py-0.5 rounded text-[10px] font-bold text-text-muted border border-white shadow-sm">K</kbd>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center gap-1 bg-elevated/50 p-1.5 rounded-xl border border-white/50 shadow-inner">
          <button
            onClick={() => setRole('viewer')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              role === 'viewer' ? 'bg-white text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              role === 'admin' ? 'bg-primary text-white shadow-[0_5px_15px_-3px_rgba(59,130,246,0.4)]' : 'text-text-muted hover:text-text-main'
            }`}
          >
            Admin
          </button>
        </div>
        
        <div className="w-px h-8 bg-elevated hidden sm:block"></div>

        <button className="hidden sm:flex items-center gap-2 text-text-muted hover:text-danger transition-colors text-sm font-semibold cursor-pointer">
          <LogOut className="w-4 h-4" />
          <span>Exit</span>
        </button>
      </div>
    </nav>
  );
}
