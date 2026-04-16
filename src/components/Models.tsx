import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, cars, formatPrice } from '../data/cars';
import { X, Battery, Gauge, Zap, Shield, Star, Car as CarIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredCars = cars.filter((car) => {
    if (filter.type && car.type !== filter.type) return false;
    if (filter.maxPrice && car.priceInr > filter.maxPrice) return false;
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
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
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
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Our Fleet</span>
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Every DriveAI vehicle comes with an AI assistant that learns your preferences 
            and enhances your driving experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                data-car-id={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: car.id === recommendedCar ? 1.03 : 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                onClick={() => setSelectedCar(car)}
                onMouseEnter={() => setHoveredCard(car.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`car-card group ${car.id === highlightedCar || car.id === recommendedCar ? 'ring-2 ring-[#0071e3]' : ''}`}
              >
                {car.isFlagship && (
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-[#bf5af2] rounded-full">
                    <Star className="w-3.5 h-3.5 text-white" fill="white" />
                    <span className="text-[12px] font-medium text-white">Flagship</span>
                  </div>
                )}

                {car.id === recommendedCar && (
                  <div className="absolute top-5 right-5 z-20 px-3 py-1.5 bg-[#30d158] rounded-full">
                    <span className="text-[12px] font-medium text-white">Perfect for You</span>
                  </div>
                )}

                <div className="car-card-image aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#1d1d1f] rounded-full text-[12px] font-medium text-[#86868b] flex items-center gap-1.5">
                      {car.type === 'electric' && <Battery className="w-3.5 h-3.5" />}
                      {car.type === 'sports' && <Zap className="w-3.5 h-3.5" />}
                      {car.type === 'suv' && <CarIcon className="w-3.5 h-3.5" />}
                      {car.type === 'sedan' && <CarIcon className="w-3.5 h-3.5" />}
                      {car.type}
                    </span>
                    <span className="px-3 py-1 bg-[#1d1d1f] rounded-full text-[12px] font-medium text-[#86868b] flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      {car.safetyRating} Star
                    </span>
                  </div>

                  <h3 className="text-[21px] font-semibold text-white mb-1 group-hover:text-[#0071e3] transition-colors">
                    {car.name}
                  </h3>
                  <p className="text-[#86868b] text-[14px] mb-5">{car.tagline}</p>

                  <div className="grid grid-cols-3 gap-4 mb-5 py-4 border-t border-b border-[#424245]/50">
                    <div className="text-center">
                      <div className="text-[#0071e3] font-semibold text-[17px]">{car.range}</div>
                      <div className="text-[#86868b] text-[12px]">Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#0071e3] font-semibold text-[17px]">{car.power}</div>
                      <div className="text-[#86868b] text-[12px]">Power</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[#0071e3] font-semibold text-[17px]">{car.acceleration}</div>
                      <div className="text-[#86868b] text-[12px]">0-100</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[21px] font-semibold text-gradient">
                      {formatPrice(car.priceInr, currency)}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-[#0071e3] rounded-full text-[14px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Details
                    </motion.button>
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
            <p className="text-[#86868b] text-[19px]">No cars match your current filters.</p>
            <p className="text-[#6e6e73] text-[14px] mt-2">Try adjusting your search criteria.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl max-w-[900px] w-full max-h-[90vh] overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-[34px] font-semibold text-white tracking-tight">{selectedCar.name}</h3>
                    <p className="text-[#86868b] text-[17px]">{selectedCar.tagline}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Range', value: selectedCar.range, icon: Battery },
                    { label: 'Power', value: selectedCar.power, icon: Zap },
                    { label: '0-100', value: selectedCar.acceleration, icon: Gauge },
                    { label: 'Top Speed', value: selectedCar.topSpeed, icon: Shield }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-4 bg-[#1d1d1f] rounded-2xl">
                      <stat.icon className="w-5 h-5 text-[#0071e3] mx-auto mb-2" />
                      <div className="text-[21px] font-semibold text-white">{stat.value}</div>
                      <div className="text-[12px] text-[#86868b]">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h4 className="text-[17px] font-semibold text-white mb-4">Key Features</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedCar.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-4 py-2 bg-[#1d1d1f] rounded-full text-[14px] text-[#f5f5f7]"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#424245]/50">
                  <div>
                    <div className="text-[14px] text-[#86868b]">Starting from</div>
                    <div className="text-[28px] font-semibold text-gradient">
                      {formatPrice(selectedCar.priceInr, currency)}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="apple-button-primary"
                  >
                    Book Test Drive
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
