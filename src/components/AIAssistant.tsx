import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X, Bot, Sparkles, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FilterParams {
  type?: string;
  maxPrice?: number;
}

interface BookingParams {
  city?: string;
  date?: string;
  model?: string;
}

interface CurrencyParams {
  currency?: 'INR' | 'USD';
}

interface AIAssistantProps {
  onNavigate: (section: string) => void;
  onFilterCars: (filter: FilterParams) => void;
  onCompareCars: (carIds: string[]) => void;
  onPrefillForm: (data: BookingParams) => void;
  onChangeCurrency: (currency: 'INR' | 'USD') => void;
  onHighlightCar: (carId: string | null) => void;
  onRecommendCar: (carId: string | null) => void;
}

interface QueryHandler {
  patterns: RegExp[];
  action: 'filter' | 'price' | 'compare' | 'booking' | 'recommend' | 'currency';
  getParams?: (query: string) => FilterParams | BookingParams | CurrencyParams | { carId?: string };
}

const QUICK_ACTIONS = [
  { label: 'Show SUVs', query: 'Show me SUVs' },
  { label: 'Under 20L', query: 'Cars under 20 lakhs' },
  { label: 'Compare', query: 'Compare Velox GT and Aurora S' },
  { label: 'Family Car', query: 'Best car for a family' },
];

const QUERY_HANDLERS: QueryHandler[] = [
  {
    patterns: [/suv/i, /sedan/i, /sports car/i, /sports/i, /electric car/i, /electric/i],
    action: 'filter',
    getParams: (query: string): FilterParams => {
      if (/suv/i.test(query)) return { type: 'suv' };
      if (/sedan/i.test(query)) return { type: 'sedan' };
      if (/sports/i.test(query)) return { type: 'sports' };
      if (/electric/i.test(query)) return { type: 'electric' };
      return {};
    }
  },
  {
    patterns: [/under (\d+)/i, /below (\d+)/i, /less than (\d+)/i, /(\d+) lakh/i],
    action: 'price',
    getParams: (query: string): FilterParams => {
      const match = query.match(/(\d+)/);
      if (match) {
        const value = parseInt(match[1]);
        return { maxPrice: value < 10 ? value * 1000000 : value * 100000 };
      }
      return {};
    }
  },
  {
    patterns: [/compare/i, /vs/i, /versus/i],
    action: 'compare'
  },
  {
    patterns: [/book/i, /test drive/i, /saturday/i, /kochi/i, /bangalore/i, /mumbai/i, /delhi/i],
    action: 'booking',
    getParams: (query: string): BookingParams => {
      const params: BookingParams = {};
      if (/kochi/i.test(query)) params.city = 'Kochi';
      if (/bangalore/i.test(query)) params.city = 'Bangalore';
      if (/mumbai/i.test(query)) params.city = 'Mumbai';
      if (/delhi/i.test(query)) params.city = 'Delhi';
      if (/saturday/i.test(query)) {
        const today = new Date();
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7 || 7);
        params.date = saturday.toISOString().split('T')[0];
      }
      if (/flagship/i.test(query) || /velox/i.test(query)) params.model = 'Velox GT';
      return params;
    }
  },
  {
    patterns: [/family/i, /five/i, /kids/i, /children/i, /parents/i],
    action: 'recommend'
  },
  {
    patterns: [/dollar/i, /usd/i, /rupee/i, /inr/i, /price in/i],
    action: 'currency',
    getParams: (query: string): CurrencyParams => ({
      currency: query.includes('dollar') || query.includes('usd') ? 'USD' : 'INR'
    })
  }
];

export function AIAssistant({ 
  onNavigate, 
  onFilterCars, 
  onCompareCars, 
  onPrefillForm,
  onChangeCurrency,
  onHighlightCar,
  onRecommendCar
}: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm DriveAI Assistant. I can help you find the perfect car, compare models, or book a test drive. Try saying something like 'Show me SUVs under 20 lakhs' or 'Which car is best for a family?'",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string) => {
    let response = "Let me help you with that...";
    let actionTaken = false;

    for (const handler of QUERY_HANDLERS) {
      const matches = handler.patterns.some(p => p.test(query));
      if (matches) {
        const params = handler.getParams ? handler.getParams(query) : {};
        
        switch (handler.action) {
          case 'filter':
            onFilterCars(params as FilterParams);
            onNavigate('models');
            response = `Showing you all ${(params as FilterParams).type || 'available'} cars. Take a look!`;
            actionTaken = true;
            break;
          case 'price':
            onFilterCars(params as FilterParams);
            onNavigate('models');
            const priceVal = (params as FilterParams).maxPrice;
            response = `Found cars within your budget! Showing options under ${priceVal ? `₹${((priceVal) / 100000).toFixed(0)} Lakhs` : 'your budget'}.`;
            actionTaken = true;
            break;
          case 'compare':
            onCompareCars(['velox-gt', 'aurora-s']);
            onNavigate('comparison');
            response = "Here's a comparison between the Velox GT and Aurora S. What do you think?";
            actionTaken = true;
            break;
          case 'booking':
            onPrefillForm(params as BookingParams);
            onNavigate('booking');
            const bookingParams = params as BookingParams;
            response = `Your test drive form is ready for ${bookingParams.city || 'your city'}! Just review and submit.`;
            actionTaken = true;
            break;
          case 'recommend':
            onRecommendCar('terra-max');
            onNavigate('models');
            response = "The Terra Max is perfect for families! It's spacious, safe, and has entertainment for everyone. I've highlighted it for you.";
            actionTaken = true;
            break;
          case 'currency':
            const currParams = params as CurrencyParams;
            onChangeCurrency(currParams.currency || 'USD');
            onNavigate('pricing');
            response = `Prices are now shown in ${currParams.currency === 'USD' ? 'US Dollars' : 'Indian Rupees'}.`;
            actionTaken = true;
            break;
        }
        break;
      }
    }

    if (!actionTaken) {
      response = "I'm not sure I understood that. Here are some things I can help with:\n\n• 'Show me SUVs under 20 lakhs'\n• 'Compare your top two models'\n• 'Book a test drive for Saturday in Kochi'\n• 'Which car is best for a family?'\n• 'Show prices in dollars'";
    }

    return response;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = processQuery(currentInput);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    }, 800);
  };

  const handleQuickAction = (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = processQuery(query);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    }, 800);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      
      recognition.start();
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 w-[380px] max-h-[560px] glass-panel rounded-3xl overflow-hidden z-50 ai-glow"
          >
            <div className="bg-[#1d1d1f] px-5 py-4 flex items-center justify-between border-b border-[#424245]/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#0071e3] to-[#5856d6] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white text-[15px]">DriveAI Assistant</span>
                  <p className="text-[#30d158] text-[12px] flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#30d158] rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2d2d2f] text-[#86868b] hover:text-white hover:bg-[#3d3d3f] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-[340px] overflow-y-auto p-5 space-y-4 scrollbar-thin">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-[#0071e3] text-white rounded-br-md'
                        : 'bg-[#2d2d2f] text-[#f5f5f7] rounded-bl-md'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#2d2d2f] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-[#86868b] rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.15 }}
                        className="w-2 h-2 bg-[#86868b] rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                        className="w-2 h-2 bg-[#86868b] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-[#424245]/50 bg-[#1d1d1f]">
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
                {QUICK_ACTIONS.map((action, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuickAction(action.query)}
                    className="whitespace-nowrap px-3 py-1.5 bg-[#2d2d2f] hover:bg-[#3d3d3f] rounded-full text-[12px] font-medium text-[#f5f5f7] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {action.label}
                    <ChevronRight className="w-3 h-3" />
                  </motion.button>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full bg-[#2d2d2f] rounded-full px-4 py-2.5 pr-10 text-[14px] text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={toggleListening}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                    isListening 
                      ? 'bg-[#ff375f] animate-pulse' 
                      : 'bg-[#2d2d2f] hover:bg-[#3d3d3f]'
                  }`}
                >
                  <Mic className={`w-4 h-4 ${isListening ? 'text-white' : 'text-[#86868b]'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-10 h-10 bg-[#0071e3] hover:bg-[#0077ED] rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-[#0071e3] to-[#5856d6] rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-[#30d158] rounded-full border-2 border-black"
          />
        )}
      </motion.button>
    </>
  );
}
