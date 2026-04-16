import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import { cars, formatPrice } from '../data/cars';

interface PricingProps {
  currency: 'INR' | 'USD';
  onCurrencyChange: (currency: 'INR' | 'USD') => void;
}

const PLANS = [
  { id: 'base', name: 'Standard', badge: null },
  { id: 'plus', name: 'Plus', badge: 'Popular', badgeColor: 'bg-[#0071e3]' },
  { id: 'pro', name: 'Pro', badge: 'Best Value', badgeColor: 'bg-[#bf5af2]' },
];

export function Pricing({ currency, onCurrencyChange }: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState('plus');

  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Choose Your Plan</span>
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Select the ownership experience that matches your lifestyle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-[#1d1d1f] p-1 rounded-full">
            <button
              onClick={() => onCurrencyChange('INR')}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                currency === 'INR' 
                  ? 'bg-white text-black' 
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              INR
            </button>
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-5 py-2 rounded-full text-[14px] font-medium transition-all ${
                currency === 'USD' 
                  ? 'bg-white text-black' 
                  : 'text-[#86868b] hover:text-white'
              }`}
            >
              USD
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`glass-card rounded-3xl p-8 cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-[#0071e3]' 
                  : ''
              }`}
            >
              {plan.badge && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 ${plan.badgeColor} rounded-full text-[11px] font-medium text-white mb-4`}>
                  <Sparkles className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}

              <h3 className="text-[21px] font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-[#86868b] text-[14px] mb-6">
                {plan.id === 'base' && 'Essential ownership experience'}
                {plan.id === 'plus' && 'Most popular choice'}
                {plan.id === 'pro' && 'Ultimate luxury package'}
              </p>

              <div className="mb-6">
                <span className="text-[48px] font-semibold text-gradient">
                  {currency === 'INR' ? '₹' : '$'}
                  {plan.id === 'base' ? '45' : plan.id === 'plus' ? '65' : '85'}
                  <span className="text-[21px] text-[#86868b] font-normal">L</span>
                </span>
                <span className="text-[#86868b] text-[14px] block mt-1">Starting price{currency === 'USD' ? '/year' : ''}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  'AI Assistant included',
                  'Over-the-air updates',
                  '24/7 Roadside assistance',
                  plan.id !== 'base' && 'Premium connectivity',
                  plan.id === 'pro' && 'Concierge service',
                  plan.id === 'pro' && 'Annual detailing',
                ].filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[14px] text-[#f5f5f7]">
                    <Check className="w-4 h-4 text-[#30d158]" />
                    {item}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-full text-[15px] font-medium transition-all ${
                  selectedPlan === plan.id
                    ? 'bg-[#0071e3] text-white'
                    : 'bg-[#1d1d1f] text-[#f5f5f7] hover:bg-[#2d2d2f]'
                }`}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#86868b] text-[14px]">
            All prices are ex-showroom. On-road costs vary by location. 
            <a href="#contact" className="text-[#0071e3] hover:underline ml-1">Contact us</a> for personalized quotes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
