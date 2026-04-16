import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, Sparkles, Zap, Shield, Gauge } from 'lucide-react';
import { Scene3D } from './Scene3D';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
    >
      <Scene3D />

      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <TooltipProvider>
        <div className="section-container relative z-10 text-center max-w-[980px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-4 py-1.5 text-sm">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Introducing the Future of Driving
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-[96px] font-semibold tracking-tight mb-6"
          >
            <span className="text-gradient">DriveAI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[#86868b] text-xl md:text-3xl font-light leading-relaxed mb-10 max-w-[800px] mx-auto"
          >
            Intelligence that understands you. Performance that inspires.
            <br className="hidden md:block" />
            The electric vehicle reimagined for tomorrow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Tooltip>
              <TooltipTrigger>
                <Button 
                  size="lg" 
                  className="bg-[#0071e3] hover:bg-[#0077ED] text-white rounded-full px-8 h-14 text-lg font-medium group"
                  onClick={onExplore}
                >
                  Explore Models
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 ml-2" />
                  </motion.div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>View our electric fleet</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/5 hover:bg-white/10 border-white/20 text-white rounded-full px-8 h-14 text-lg font-medium backdrop-blur-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Film
                </Button>
              </TooltipTrigger>
              <TooltipContent>See DriveAI in action</TooltipContent>
            </Tooltip>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-3 gap-8 md:gap-20 max-w-[700px] mx-auto"
          >
            {[
              { value: '520', unit: 'km', label: 'Range', icon: Zap, color: 'text-yellow-400' },
              { value: '2.8', unit: 's', label: '0-100 km/h', icon: Gauge, color: 'text-blue-400' },
              { value: '5', unit: '★', label: 'Safety Rating', icon: Shield, color: 'text-green-400' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <div className="text-center">
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`} />
                      <div className="text-4xl md:text-5xl font-semibold text-gradient mb-1 group-hover:scale-105 transition-transform">
                        {stat.value}
                        <span className="text-xl md:text-2xl text-[#86868b] ml-1">{stat.unit}</span>
                      </div>
                      <div className="text-[#86868b] text-sm md:text-base">{stat.label}</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {stat.label}: {stat.value}{stat.unit}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center justify-center gap-6"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0071e3] to-[#5856d6] border-2 border-black flex items-center justify-center text-white text-xs font-medium"
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
            </div>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="text-[#86868b] text-sm"
            >
              <span className="text-white font-medium">2,847+</span> people ordered this week
            </motion.p>
          </motion.div>
        </div>
      </TooltipProvider>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={onExplore}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-2.5 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black via-black/80 to-transparent" />
    </section>
  );
}
