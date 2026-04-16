import { motion } from 'framer-motion';
import { Cpu, Shield, Wifi, Battery, Car, Sparkles, Brain, Zap } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Assistant',
    description: 'An intelligent co-pilot that learns your preferences and enhances every journey with real-time insights and personalized recommendations.',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Advanced Safety Suite',
    description: '360° awareness with 12 ultrasonic sensors, 8 cameras, and predictive collision avoidance that thinks ahead.',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Wifi,
    title: 'Always Connected',
    description: 'Seamless over-the-air updates, remote climate control, and smart home integration. Your car evolves with you.',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Battery,
    title: 'Ultra-Fast Charging',
    description: '800V architecture delivers 200km of range in just 10 minutes. Spend less time charging, more time driving.',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    icon: Car,
    title: 'Premium Interior',
    description: 'Handcrafted materials, ambient lighting with 64 colors, and a 22-speaker spatial audio system for first-class comfort.',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    icon: Sparkles,
    title: 'Autonomous Ready',
    description: 'Hardware-ready for full self-driving capability. The software evolves continuously through machine learning.',
    gradient: 'from-indigo-500 to-violet-600'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Intelligent by Design</span>
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Every DriveAI is built with cutting-edge technology that makes driving safer, 
            smarter, and more enjoyable than ever before.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover rounded-3xl p-8 group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-[21px] font-semibold text-white mb-3 group-hover:text-[#0071e3] transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-[#86868b] text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card rounded-3xl p-10 md:p-16 text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Zap className="w-8 h-8 text-[#0071e3]" />
            <span className="text-[28px] md:text-[34px] font-semibold text-gradient">
              Over-the-Air Updates
            </span>
          </motion.div>
          
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-[700px] mx-auto mb-8">
            Your DriveAI gets better over time. New features, improved performance, 
            and enhanced security are delivered wirelessly, automatically.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { value: 'Weekly', label: 'Software Updates' },
              { value: '50+', label: 'New Features/Year' },
              { value: '100%', label: 'Free Updates' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[28px] font-semibold text-white">{stat.value}</div>
                <div className="text-[#86868b] text-[14px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
