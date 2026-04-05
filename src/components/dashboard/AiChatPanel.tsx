import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Send, Bot, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiChatPanel({ isOpen, onClose }: ChatProps) {
  const transactions = useStore(state => state.transactions);
  
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: 'Hello! I am Aura. I can analyze your transactions and give you financial advice using ChatGPT. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      let aiResponseText = "";

      if (apiKey && apiKey !== "YOUR_API_KEY") {
        // Real ChatGPT API Integration
        const limitedTx = transactions.slice(0, 10).map(t => `${t.date}: ${t.type} ${t.category} ₹${t.amount}`).join('\n');
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: `You are Aura, a friendly financial assistant. Analyze this recent data if requested:\n${limitedTx}` },
              { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 150
          })
        });
        
        const data = await response.json();
        if (data.choices && data.choices[0]) {
          aiResponseText = data.choices[0].message.content;
        } else {
          aiResponseText = "Sorry, I couldn't process that with the API at the moment. Please try again later.";
        }
      } else {
        // Smart Mock Fallback analyzing actual Zustand state
        await new Promise(resolve => setTimeout(resolve, 1500));
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        
        if (userMessage.toLowerCase().includes('spend') || userMessage.toLowerCase().includes('expense')) {
          aiResponseText = `Looking at your data, your total expenses equal ₹${totalExpenses.toLocaleString('en-IN')}. Is there a specific category you want to reduce?`;
        } else if (userMessage.toLowerCase().includes('save') || userMessage.toLowerCase().includes('invest')) {
          aiResponseText = "Based on your current cashflow, investing 20% of your remaining balance into a safe Index Fund could yield an extra ₹15,000 annually due to compound interest.";
        } else {
          aiResponseText = "That's an interesting question! Since my real OpenAI key isn't provided in the .env file, I am currently analyzing your local transactions. Your current total transactions count is " + transactions.length + ".";
        }
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "There was an error connecting to the AI API." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-text-main/10 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-surface/90 backdrop-blur-3xl border-l border-white shadow-[-30px_0_100px_rgba(59,130,246,0.15)] z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-elevated flex items-center justify-between bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(59,130,246,0.4)] border border-white/60">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-text-main flex items-center gap-1.5">Aura AI <Sparkles className="w-4 h-4 text-primary" /></h3>
                  <p className="text-xs text-text-muted font-bold tracking-wide uppercase">Financial Brain</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2.5 bg-elevated/50 border border-white rounded-xl hover:bg-white transition-all shadow-sm">
                <X className="w-5 h-5 text-text-main/70" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-primary/5">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[15px] font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-sm shadow-[0_10px_20px_-5px_rgba(59,130,246,0.3)]' 
                      : 'bg-white text-text-main border border-elevated rounded-tl-sm shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="p-4 bg-white border border-elevated rounded-2xl rounded-tl-sm flex items-center gap-3 w-fit shadow-sm">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-sm font-semibold text-text-muted">Aura is thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-elevated bg-white/50 backdrop-blur-md pb-8">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about your budget..."
                  className="w-full bg-white border border-elevated rounded-2xl pl-5 pr-14 py-4 text-sm font-medium outline-none focus:ring-4 ring-primary/10 shadow-sm text-text-main transition-all"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-[0_5px_15px_-3px_rgba(59,130,246,0.4)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-text-muted mt-3 font-semibold uppercase tracking-wider">Powered by OpenAI API Integration</p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
