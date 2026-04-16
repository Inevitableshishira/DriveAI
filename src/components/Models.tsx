import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, cars, formatPrice } from '../data/cars';
import { Fuel, Gauge, Zap, Star } from 'lucide-react';

interface ModelsProps {
  highlightedCar: string | null;
  recommendedCar: string | null;
  currency: 'INR' | 'USD';
  filter: { type?: string; maxPrice?: number };
}

export function Models({ highlightedCar, recommendedCar, currency, filter }: ModelsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'electric':
        return <Zap className="w-4 h-4" />;
      case 'sports':
        return <Gauge className="w-4 h-4" />;
      default:
        return <Fuel className="w-4 h-4" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="models"
      className={`py-24 px-4 relative transition-all duration-500 ${
        highlightedCar || recommendedCar ? 'section-highlight' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Our Electric Fleet
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Each DriveAI vehicle comes with our signature AI assistant, designed to enhance 
            your driving experience from the moment you step inside.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="sync">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                data-car-id={car.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: car.id === recommendedCar ? 1.05 : 1,
                  boxShadow: car.id === highlightedCar || car.id === recommendedCar
                    ? '0 0 40px rgba(0, 210, 255, 0.4)'
                    : 'none'
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 210, 255, 0.2)' }}
                onClick={() => setSelectedCar(car)}
                className={`car-card glass rounded-2xl overflow-hidden cursor-pointer relative ${
                  car.id === highlightedCar || car.id === recommendedCar ? 'ring-2 ring-cyan-400' : ''
                }`}
              >
                {car.isFlagship && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full">
                    <Star className="w-3 h-3 text-white" fill="white" />
                    <span className="text-xs font-medium text-white">Flagship</span>
                  </div>
                )}

                {car.id === recommendedCar && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-green-500/90 rounded-full">
                    <span className="text-xs font-medium text-white">Recommended for You</span>
                  </div>
                )}

                <div className="car-image-container overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-cyan-400 flex items-center gap-1">
                      {getTypeIcon(car.type)}
                      {car.type.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{car.name}</h3>
                  <p className="text-sm text-white/50 mb-4">{car.tagline}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">{car.range}</div>
                      <div className="text-xs text-white/40">Range</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">{car.power}</div>
                      <div className="text-xs text-white/40">Power</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">{car.acceleration}</div>
                      <div className="text-xs text-white/40">0-100</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {formatPrice(car.priceInr, currency)}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg text-sm font-medium text-cyan-400 border border-cyan-500/30 cursor-pointer"
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
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">No cars match your current filters.</p>
            <p className="text-white/40 text-sm mt-2">Try adjusting your search criteria.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCar(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white">{selectedCar.name}</h3>
                    <p className="text-white/60">{selectedCar.tagline}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="text-white/60 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Range', value: selectedCar.range },
                    { label: 'Power', value: selectedCar.power },
                    { label: '0-100', value: selectedCar.acceleration },
                    { label: 'Top Speed', value: selectedCar.topSpeed }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-3 bg-white/5 rounded-xl">
                      <div className="text-cyan-400 font-bold">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCar.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/40">Starting from</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {formatPrice(selectedCar.priceInr, currency)}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white cursor-pointer"
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
