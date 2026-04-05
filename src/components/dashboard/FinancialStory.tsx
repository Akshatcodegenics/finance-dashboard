import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target } from 'lucide-react';
import { useStore } from '../../store/useStore';

// Animated Story Characters created via Composited Framer Elements
function StoryCharacter({ type }: { type: number }) {
  if (type === 0) {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="text-7xl relative z-10"
        >
          🤖
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, 20, -10, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-5xl absolute -right-4 top-2 z-20 origin-bottom-left"
        >
          👋
        </motion.div>
      </div>
    );
  } else if (type === 1) {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl relative z-10"
        >
          🤑
        </motion.div>
        <motion.div animate={{ y: [10, -30, 10], x: [-20, -30, -20], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute text-3xl z-0">💰</motion.div>
        <motion.div animate={{ y: [10, -40, 10], x: [20, 30, 20], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute text-3xl z-0">💸</motion.div>
      </div>
    );
  } else if (type === 2) {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div 
          animate={{ x: [-2, 2, -2] }} 
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="text-7xl relative z-10"
        >
          😰
        </motion.div>
        <motion.div animate={{ y: [-10, 0, -10] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute -right-6 top-8 text-5xl z-20">
          🧾
        </motion.div>
        <motion.div animate={{ opacity: [0, 1, 0], y: [-20, 10] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute -left-4 top-0 text-3xl z-20">
          💧
        </motion.div>
      </div>
    );
  } else {
    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-7xl relative z-10"
        >
          😎
        </motion.div>
        <motion.div 
          animate={{ rotate: [0, 360] }} 
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute text-8xl z-0 opacity-50 blur-sm"
        >
          ✨
        </motion.div>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute -right-6 bottom-0 text-6xl z-20 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
          🏆
        </motion.div>
      </div>
    );
  }
}

export function FinancialStory() {
  const { transactions } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Compute story data
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const highestExpense = transactions.filter(t => t.type === 'expense').sort((a,b) => b.amount - a.amount)[0];

  const slides = [
    {
      id: 0,
      title: "This Month's Journey",
      subtitle: "Let's review your health.",
      color: "from-blue-600 via-blue-500 to-indigo-600",
      content: "You've been making moves. Let's see where your money went and how much closer you are to financial freedom."
    },
    {
      id: 1,
      title: "Cashflow Power",
      subtitle: "Income vs Expense.",
      color: "from-emerald-500 via-green-500 to-teal-600",
      content: `You brought in ₹${income.toLocaleString()} and burned ₹${expenses.toLocaleString()}. That leaves you with a net positive of ₹${(income - expenses).toLocaleString()}!`
    },
    {
      id: 2,
      title: "The Big Spender",
      subtitle: "Where did it all go?",
      color: "from-rose-500 via-red-500 to-orange-600",
      content: highestExpense 
        ? `Your absolute biggest spend was ₹${highestExpense.amount.toLocaleString()} on ${highestExpense.category}. Was it worth it?`
        : "You haven't spent anything yet!"
    },
    {
      id: 3,
      title: "Looking Forward",
      subtitle: "Keep the momentum.",
      color: "from-purple-600 via-fuchsia-500 to-pink-600",
      content: "Based on your current trajectory, you are well on your way to hitting your savings goals. Keep tracking and keep growing!"
    }
  ];

  // Auto advance slides
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => {
        if (prev === slides.length - 1) {
          setIsOpen(false);
          return 0;
        }
        return prev + 1;
      });
    }, 6000); // 6s per slide to allow reading and animation viewing
    return () => clearInterval(timer);
  }, [isOpen, slides.length]);

  return (
    <>
      <div 
        onClick={() => { setIsOpen(true); setCurrentSlide(0); }}
        className="w-full bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-[2rem] p-6 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.3)] relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/20 rounded-full blur-[30px] group-hover:scale-150 transition-transform duration-700" />
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/20 uppercase tracking-widest shadow-sm">
              Watch Story
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-display font-bold text-white mb-1 drop-shadow-md">Your Financial Story</h3>
            <p className="text-sm font-medium text-white/90 line-clamp-2">Tap to view your animated, character-driven journey.</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-base/90 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center p-4 sm:p-8"
            >
              <div className="absolute top-6 right-6 z-50">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bars */}
              <div className="w-full max-w-sm absolute top-8 flex gap-2 px-6 z-50">
                {slides.map((_, i) => (
                  <div key={i} className="h-1.5 flex-1 bg-black/20 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: i < currentSlide ? '100%' : '0%' }}
                      animate={{ width: i === currentSlide ? '100%' : (i < currentSlide ? '100%' : '0%') }}
                      transition={{ duration: i === currentSlide ? 6.0 : 0, ease: 'linear' }}
                      className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                  </div>
                ))}
              </div>

              {/* Main Story Container */}
              <div className="w-full max-w-sm aspect-[9/16] bg-black rounded-[2.5rem] overflow-hidden relative shadow-[0_30px_100px_-15px_rgba(0,0,0,0.5)] flex items-center border-4 border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].color} p-8 flex flex-col justify-center text-center`}
                  >
                    
                    {/* Animated Character Visualization */}
                    <div className="mx-auto mb-10 w-48 h-48 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border-2 border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                      <StoryCharacter type={currentSlide} />
                    </div>

                    {/* Improved Text Visibility Block */}
                    <div className="bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                      <h2 className="text-3xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-lg tracking-tight">
                        {slides[currentSlide].title}
                      </h2>
                      <p className="text-sm font-bold text-white/80 uppercase tracking-widest mb-6">
                        {slides[currentSlide].subtitle}
                      </p>
                      
                      <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                        <p className="text-[15px] font-semibold text-white leading-relaxed tracking-wide drop-shadow-md">
                          {slides[currentSlide].content}
                        </p>
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>

                {/* Invisible Click areas to navigate */}
                <div 
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  className="absolute left-0 top-0 bottom-0 w-1/3 z-40 cursor-pointer"
                />
                <div 
                  onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                  className="absolute right-0 top-0 bottom-0 w-2/3 z-40 cursor-pointer"
                />
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
