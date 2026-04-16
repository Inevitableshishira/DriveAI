import { motion } from 'framer-motion';
import { Brain, Shield, Wifi, Battery, Map, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Co-Pilot',
    description: 'Our proprietary AI learns your driving style and preferences, adapting to make every journey smoother and more enjoyable.',
    stats: '99.7% Accuracy'
  },
  {
    icon: Shield,
    title: 'Advanced Safety',
    description: '360° sensor fusion with predictive collision avoidance. The car sees threats before you do.',
    stats: '5-Star Rated'
  },
  {
    icon: Wifi,
    title: 'Always Connected',
    description: '5G connectivity with OTA updates. Your car gets smarter every month, automatically.',
    stats: '100ms Latency'
  },
  {
    icon: Battery,
    title: 'Hyper Charging',
    description: '10-80% in just 18 minutes. Our charging network spans 2,000+ stations across India.',
    stats: '18min Fast Charge'
  },
  {
    icon: Map,
    title: 'Smart Navigation',
    description: 'AI-powered route planning that considers traffic, weather, and your calendar to get you there optimally.',
    stats: 'Real-time AI'
  },
  {
    icon: Smartphone,
    title: 'Digital Key',
    description: 'Your phone is your key. Share access with family, track your car, and control features remotely.',
    stats: 'NFC + UWB'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-surface to-dark" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Built for Tomorrow
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Every DriveAI vehicle is engineered with cutting-edge technology to deliver 
            an unmatched driving experience that evolves with you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group glass rounded-2xl p-6 hover:bg-white/[0.08] transition-colors"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors"
              >
                <feature.icon className="w-7 h-7 text-cyan-400" />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm mb-4">{feature.description}</p>
              
              <div className="flex items-center gap-2">
                <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                <span className="text-xs text-cyan-400 font-medium">{feature.stats}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
          >
            2,000+
          </motion.div>
          <p className="text-white/60 text-lg">Charging Stations Nationwide</p>
          <p className="text-white/40 text-sm mt-2">From Kashmir to Kanyakumari, we've got you covered</p>
        </motion.div>
      </div>
    </section>
  );
}
