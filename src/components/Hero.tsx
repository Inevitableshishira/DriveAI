import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />
      
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-full h-full rounded-full bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-[120px]"
          />
        </div>
      </motion.div>

      <div className="section-container relative z-10 text-center max-w-[980px]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[#86868b] text-[17px] md:text-[19px] tracking-wide mb-6"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-[84px] font-semibold tracking-tight mb-6"
        >
          <span className="text-gradient">DriveAI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-[#86868b] text-[19px] md:text-[28px] font-normal leading-tight mb-8 max-w-[750px] mx-auto"
        >
          The future of electric mobility, powered by intelligence that understands you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            onClick={onExplore}
            className="apple-button-primary"
          >
            Explore Models
          </button>
          <button className="apple-button-secondary">
            Watch the Film
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-3 gap-12 md:gap-20 max-w-[600px] mx-auto"
        >
          {[
            { value: '520', unit: 'km', label: 'Range' },
            { value: '2.8', unit: 'sec', label: '0-100 km/h' },
            { value: '5', unit: '★', label: 'Safety Rating' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-semibold text-gradient mb-1">
                {stat.value}
                <span className="text-2xl md:text-3xl text-[#86868b] ml-1">{stat.unit}</span>
              </div>
              <div className="text-[#86868b] text-[14px] md:text-[17px]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={onExplore}
      >
        <ChevronDown className="w-8 h-8 text-[#86868b]" />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
