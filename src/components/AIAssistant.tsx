import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X, Bot } from 'lucide-react';

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
      content: "Hi! I'm DriveAI Assistant. I can help you navigate our site and find the perfect car. Try saying things like 'Show me SUVs under 20 lakhs' or 'Book a test drive for Saturday in Kochi'.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string) => {
    let response = "I'm processing your request...";
    let actionTaken = false;

    for (const handler of QUERY_HANDLERS) {
      const matches = handler.patterns.some(p => p.test(query));
      if (matches) {
        const params = handler.getParams ? handler.getParams(query) : {};
        
        switch (handler.action) {
          case 'filter':
            onFilterCars(params as FilterParams);
            onNavigate('models');
            response = `I've filtered our ${(params as FilterParams).type || 'available'} cars for you. Scroll down to see the results!`;
            actionTaken = true;
            break;
          case 'price':
            onFilterCars(params as FilterParams);
            onNavigate('models');
            const priceVal = (params as FilterParams).maxPrice;
            response = `Found cars within your budget! I've filtered the models to show options under ${priceVal ? `₹${((priceVal) / 100000).toFixed(0)} Lakhs` : 'your budget'}.`;
            actionTaken = true;
            break;
          case 'compare':
            onCompareCars(['velox-gt', 'aurora-s']);
            onNavigate('comparison');
            response = "I've scrolled to our comparison section with the Velox GT and Aurora S highlighted. You can see how they stack up against each other!";
            actionTaken = true;
            break;
          case 'booking':
            onPrefillForm(params as BookingParams);
            onNavigate('booking');
            const bookingParams = params as BookingParams;
            response = `I've pre-filled the test drive form for ${bookingParams.city || 'your city'} on ${bookingParams.date || 'Saturday'}. Just review and submit!`;
            actionTaken = true;
            break;
          case 'recommend':
            onRecommendCar('terra-max');
            onNavigate('models');
            response = "The Terra Max is perfect for a family of five! It has 8 seats, an entertainment system, and excellent safety features. I've highlighted it for you.";
            actionTaken = true;
            break;
          case 'currency':
            const currParams = params as CurrencyParams;
            onChangeCurrency(currParams.currency || 'USD');
            onNavigate('pricing');
            response = `I've switched the pricing to ${currParams.currency === 'USD' ? 'US Dollars' : 'Indian Rupees'}. You can see all prices in your preferred currency now!`;
            actionTaken = true;
            break;
        }
        break;
      }
    }

    if (!actionTaken) {
      response = "I'm not sure I understood that. Here are some things I can help with:\n• 'Show me SUVs under 20 lakhs'\n• 'Compare your top two models'\n• 'Book a test drive for Saturday in Kochi'\n• 'Which car is best for a family?'\n• 'Show prices in dollars'";
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
    setInput('');

    setTimeout(() => {
      const response = processQuery(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
    }, 500);
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
            className="fixed bottom-24 right-6 w-96 max-h-[500px] glass rounded-2xl overflow-hidden z-50 shadow-2xl"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">DriveAI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-white/10 text-white/90'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/10 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={toggleListening}
                  className={`p-2 rounded-xl ${isListening ? 'bg-red-500' : 'bg-white/10'} cursor-pointer`}
                >
                  <Mic className={`w-5 h-5 ${isListening ? 'text-white animate-pulse' : 'text-white/70'}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl cursor-pointer"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
