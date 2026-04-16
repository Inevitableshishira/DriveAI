import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, formatPrice } from '../data/cars';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  currency: 'INR' | 'USD';
  onCurrencyChange: (currency: 'INR' | 'USD') => void;
}

export function Pricing({ currency, onCurrencyChange }: PricingProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-surface/30 to-dark" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            No hidden fees, no surprises. Every DriveAI comes with our comprehensive warranty and support package.
          </p>

          <div className="inline-flex items-center gap-2 p-1 glass rounded-xl">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onCurrencyChange('INR')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currency === 'INR'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              INR (₹)
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onCurrencyChange('USD')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              USD ($)
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedModel(selectedModel === car.id ? null : car.id)}
              className={`glass rounded-2xl p-6 cursor-pointer transition-all ${
                selectedModel === car.id ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              <div className="flex gap-6">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-32 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{car.name}</h3>
                      <p className="text-sm text-white/50">{car.tagline}</p>
                    </div>
                    {car.isFlagship && (
                      <span className="px-2 py-1 bg-amber-500/20 rounded text-xs text-amber-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Flagship
                      </span>
                    )}
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: selectedModel === car.id ? 'auto' : 0, opacity: selectedModel === car.id ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Range', value: car.range },
                          { label: 'Power', value: car.power },
                          { label: '0-100', value: car.acceleration },
                          { label: 'Top Speed', value: car.topSpeed }
                        ].map((spec) => (
                          <div key={spec.label} className="bg-white/5 rounded-lg p-3">
                            <div className="text-cyan-400 font-bold">{spec.value}</div>
                            <div className="text-xs text-white/40">{spec.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 bg-white/10 rounded text-xs text-white/70 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-green-400" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <div className="text-sm text-white/40">Starting from</div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {formatPrice(car.priceInr, currency)}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-white text-sm cursor-pointer"
                    >
                      Configure
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">What's Included with Every DriveAI</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: '8 Year Warranty', desc: 'Comprehensive coverage on battery and motor' },
              { title: 'Free Charging', desc: '2 years of complimentary fast charging' },
              { title: 'Roadside Assist', desc: '24/7 pan-India support included' },
              { title: 'Home Installation', desc: 'Free home charger setup' }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
