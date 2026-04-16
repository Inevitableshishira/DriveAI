import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, cars, formatPrice } from '../data/cars';
import { X, Battery, Gauge, Zap, Shield, Star, Car as CarIcon, Check, Info, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

gsap.registerPlugin(ScrollTrigger);

interface ModelsProps {
  highlightedCar: string | null;
  recommendedCar: string | null;
  currency: 'INR' | 'USD';
  filter: { type?: string; maxPrice?: number };
}

export function Models({ highlightedCar, recommendedCar, currency, filter }: ModelsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredCars = cars.filter((car) => {
    if (filter.type && car.type !== filter.type) return false;
    if (filter.maxPrice && car.priceInr > filter.maxPrice) return false;
    if (activeTab !== 'all' && car.type !== activeTab) return false;
    return true;
  });

  useEffect(() => {
    if (highlightedCar || recommendedCar) {
      const carId = highlightedCar || recommendedCar;
      const carElement = document.querySelector(`[data-car-id="${carId}"]`);
      if (carElement) {
        carElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedCar, recommendedCar]);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.car-card');
    if (cards) {
      cards.forEach((card, i) => {
        gsap.fromTo(card, 
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  }, [filteredCars.length]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'electric': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'sports': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'suv': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'sedan': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="models"
      className={`py-24 md:py-32 relative transition-all duration-500 ${
        highlightedCar || recommendedCar ? 'ring-2 ring-[#0071e3] ring-offset-4 ring-offset-black' : ''
      }`}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 border-[#0071e3]/50 text-[#0071e3]">
            Our Fleet
          </Badge>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Choose Your Drive</span>
          </h2>
          <p className="text-[#86868b] text-lg md:text-xl max-w-2xl mx-auto">
            Every DriveAI comes with an AI assistant that learns your preferences 
            and enhances your driving experience.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="bg-[#1d1d1f] rounded-full p-1">
            {['all', 'electric', 'suv', 'sedan', 'sports'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-[#0071e3] data-[state=active]:text-white"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                data-car-id={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: car.id === recommendedCar ? 1.02 : 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setSelectedCar(car)}
                className={`car-card group cursor-pointer ${
                  car.id === highlightedCar || car.id === recommendedCar 
                    ? 'ring-2 ring-[#0071e3] shadow-lg shadow-[#0071e3]/20' 
                    : ''
                }`}
              >
                {car.isFlagship && (
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 gap-1.5">
                      <Star className="w-3 h-3" fill="white" />
                      Flagship
                    </Badge>
                  </div>
                )}

                {car.id === recommendedCar && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-green-500 text-white border-0 gap-1.5">
                      <Check className="w-3 h-3" />
                      Perfect for You
                    </Badge>
                  </div>
                )}

                <div className="car-card-image aspect-[4/3] overflow-hidden relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2">
                      <Badge className={`${getTypeColor(car.type)} border`}>
                        {car.type === 'electric' && <Battery className="w-3 h-3 mr-1" />}
                        {car.type === 'sports' && <Zap className="w-3 h-3 mr-1" />}
                        {car.type === 'suv' && <CarIcon className="w-3 h-3 mr-1" />}
                        {car.type === 'sedan' && <CarIcon className="w-3 h-3 mr-1" />}
                        {car.type}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white/80 bg-black/30 backdrop-blur-sm">
                        <Shield className="w-3 h-3 mr-1" />
                        {car.safetyRating} Star
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#0071e3] transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-[#86868b] text-sm mb-5">{car.tagline}</p>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#86868b]">Range</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Battery className="w-4 h-4 text-[#0071e3]" />
                        {car.range}
                      </span>
                    </div>
                    <Progress value={parseInt(car.range) / 6 * 100} className="h-1.5 bg-[#2d2d2f]" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#86868b]">Power</span>
                      <span className="text-white font-medium flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        {car.power}
                      </span>
                    </div>
                    <Progress value={parseInt(car.power) / 8 * 100} className="h-1.5 bg-[#2d2d2f]" />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#424245]/30">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#0071e3] to-[#5856d6] bg-clip-text text-transparent">
                      {formatPrice(car.priceInr, currency)}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-[#0071e3] hover:bg-[#0077ED] rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      View Details
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCars.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <CarIcon className="w-16 h-16 text-[#424245] mx-auto mb-4" />
            <p className="text-[#86868b] text-xl">No cars match your current filters.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1d1d1f] rounded-3xl max-w-[900px] w-full max-h-[90vh] overflow-hidden border border-[#424245]/50"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-transparent to-transparent" />
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70"
                  onClick={() => setSelectedCar(null)}
                >
                  <X className="w-5 h-5 text-white" />
                </Button>
                
                <div className="absolute bottom-4 left-4">
                  <Badge className={`${getTypeColor(selectedCar.type)} border mb-2`}>
                    {selectedCar.type}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white">{selectedCar.name}</h2>
                  <p className="text-[#86868b]">{selectedCar.tagline}</p>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto max-h-[50vh]">
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Range', value: selectedCar.range, icon: Battery, color: 'text-green-400' },
                    { label: 'Power', value: selectedCar.power, icon: Zap, color: 'text-yellow-400' },
                    { label: '0-100', value: selectedCar.acceleration, icon: Gauge, color: 'text-blue-400' },
                    { label: 'Top Speed', value: selectedCar.topSpeed, icon: Shield, color: 'text-purple-400' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-[#2d2d2f] rounded-2xl">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-xl font-semibold text-white">{stat.value}</div>
                      <div className="text-xs text-[#86868b]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedCar.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="border-[#424245] text-[#f5f5f7]">
                      <Check className="w-3 h-3 mr-1 text-green-400" />
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#424245]/50">
                  <div>
                    <div className="text-sm text-[#86868b]">Starting from</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#0071e3] to-[#5856d6] bg-clip-text text-transparent">
                      {formatPrice(selectedCar.priceInr, currency)}
                    </div>
                  </div>
                  <Button size="lg" className="bg-[#0071e3] hover:bg-[#0077ED] rounded-full">
                    Book Test Drive
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
