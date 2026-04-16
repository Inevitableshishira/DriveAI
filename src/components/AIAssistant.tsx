import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, X, Bot, Sparkles, ChevronRight, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

const QUICK_ACTIONS = [
  { label: 'Show SUVs', query: 'Show me SUVs', icon: '🚙' },
  { label: 'Under 20L', query: 'Cars under 20 lakhs', icon: '💰' },
  { label: 'Compare', query: 'Compare Velox GT and Aurora S', icon: '⚖️' },
  { label: 'Family Car', query: 'Best car for a family', icon: '👨‍👩‍👧‍👦' },
  { label: 'Electric', query: 'Show me electric cars', icon: '⚡' },
  { label: 'Test Drive', query: 'Book a test drive', icon: '📅' },
];

const SUGGESTIONS = [
  "Show me the fastest car",
  "What's best for a family of 5?",
  "Compare electric vehicles",
  "Book a test drive in Mumbai",
];

const QUERY_HANDLERS = [
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
    patterns: [/under (\d+)/i, /below (\d+)/i, /less than (\d+)/i, /(\d+) lakh/i, /fastest|quick|rapid/i],
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
    patterns: [/book/i, /test drive/i, /saturday|sunday|monday|tuesday|wednesday|thursday|friday/i, /kochi|bangalore|mumbai|delhi|chennai/i],
    action: 'booking',
    getParams: (query: string): BookingParams => {
      const params: BookingParams = {};
      if (/kochi/i.test(query)) params.city = 'Kochi';
      if (/bangalore/i.test(query)) params.city = 'Bangalore';
      if (/mumbai/i.test(query)) params.city = 'Mumbai';
      if (/delhi/i.test(query)) params.city = 'Delhi';
      if (/chennai/i.test(query)) params.city = 'Chennai';
      if (/saturday/i.test(query)) {
        const today = new Date();
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7 || 7);
        params.date = saturday.toISOString().split('T')[0];
      }
      return params;
    }
  },
  {
    patterns: [/family|families|kids|children|parents|five|5/i],
    action: 'recommend'
  },
  {
    patterns: [/dollar|usd|rupee|inr|price in|show.*dollar|show.*rupee/i],
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
  const [showSuggestions, setShowSuggestions] = useState(true);
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
            response = `Found cars within your budget! Showing options under ${(params as FilterParams).maxPrice ? `₹${(((params as FilterParams).maxPrice || 0) / 100000).toFixed(0)} Lakhs` : 'your budget'}.`;
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
            response = `Your test drive form is ready${(params as BookingParams).city ? ` for ${(params as BookingParams).city}` : ''}! Just review and submit.`;
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
      response = "I'm not sure I understood that. Here are some things I can help with:\n\n• 'Show me SUVs under 20 lakhs'\n• 'Compare your top two models'\n• 'Book a test drive for Saturday in Mumbai'\n• 'Which car is best for a family?'\n• 'Show prices in dollars'";
    }

    return response;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setShowSuggestions(false);

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
    setShowSuggestions(false);
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

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    handleQuickAction(suggestion);
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
            className="fixed bottom-28 right-6 w-[400px] max-h-[600px] bg-[#1d1d1f] rounded-3xl overflow-hidden z-50 shadow-2xl border border-[#424245]/50"
          >
            <div className="bg-gradient-to-r from-[#0071e3] to-[#5856d6] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-white">DriveAI Assistant</span>
                  <p className="text-white/80 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <ScrollArea className="h-[380px] p-5">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-[#0071e3] text-white rounded-br-sm'
                          : 'bg-[#2d2d2f] text-[#f5f5f7] rounded-bl-sm'
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
                    <div className="bg-[#2d2d2f] px-4 py-3 rounded-2xl rounded-bl-sm">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 bg-[#86868b] rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {showSuggestions && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 space-y-2"
                >
                  <p className="text-xs text-[#86868b] mb-2">Try asking:</p>
                  {SUGGESTIONS.map((suggestion, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left text-xs bg-[#2d2d2f] border-[#424245] hover:bg-[#3d3d3f] text-[#86868b]"
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              )}
            </ScrollArea>

            <div className="p-4 border-t border-[#424245]/50 bg-[#1d1d1f]">
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
                {QUICK_ACTIONS.map((action, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap bg-[#2d2d2f] border-[#424245] hover:bg-[#3d3d3f] text-xs"
                    onClick={() => handleQuickAction(action.query)}
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.label}
                  </Button>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#2d2d2f] rounded-full px-4 py-2.5 pr-10 text-sm text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3]"
                />
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className={`rounded-full shrink-0 ${isListening ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-[#2d2d2f] border-[#424245]'}`}
                      onClick={toggleListening}
                    >
                      <Mic className={`w-4 h-4 ${isListening ? 'text-red-400' : 'text-[#86868b]'}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Voice input</TooltipContent>
                </Tooltip>
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full shrink-0 bg-[#0071e3] hover:bg-[#0077ED]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#5856d6] rounded-full flex items-center justify-center shadow-lg z-50 cursor-pointer"
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
                    <X className="w-7 h-7 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bot"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bot className="w-7 h-7 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-black"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-green-400 rounded-full opacity-50"
                  />
                </motion.div>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[#1d1d1f] border-[#424245]">
            {isOpen ? 'Close assistant' : 'Chat with AI Assistant'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
