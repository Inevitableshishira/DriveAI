import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cars, formatPrice } from '../data/cars';

interface ComparisonProps {
  compareCars: string[];
  currency: 'INR' | 'USD';
}

export function Comparison({ compareCars, currency }: ComparisonProps) {
  const [selectedCars, setSelectedCars] = useState<string[]>(compareCars.length > 0 ? compareCars : ['velox-gt', 'aurora-s']);
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    if (compareCars.length > 0) {
      setSelectedCars(compareCars);
    }
  }, [compareCars]);

  const getSelectedCars = () => {
    return selectedCars
      .map((id) => cars.find((c) => c.id === id))
      .filter(Boolean);
  };

  const toggleCar = (carId: string) => {
    setSelectedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), carId];
      }
      return [...prev, carId];
    });
  };

  const specs = [
    { key: 'range', label: 'Range', better: 'higher' },
    { key: 'power', label: 'Power', better: 'higher' },
    { key: 'acceleration', label: '0-100 km/h', better: 'lower', suffix: 's' },
    { key: 'topSpeed', label: 'Top Speed', better: 'higher' },
    { key: 'priceInr', label: 'Price', better: 'lower', format: 'currency' }
  ];

  const selectedCarsData = getSelectedCars();

  return (
    <section id="comparison" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-dark" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Compare Models
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Select up to 3 models to compare specifications, features, and pricing side by side.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {cars.map((car) => (
            <motion.button
              key={car.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCar(car.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                selectedCars.includes(car.id)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'glass text-white/70 hover:text-white'
              }`}
            >
              {car.name}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="sync">
          {selectedCarsData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/40 font-medium w-32">Specification</th>
                      {selectedCarsData.map((car) => (
                        <th key={car!.id} className="p-4 text-center min-w-[200px]">
                          <div className="relative">
                            {compareCars.includes(car!.id) && (
                              <motion.div
                                layoutId="compare-highlight"
                                className="absolute -inset-2 bg-cyan-500/20 rounded-xl -z-10"
                              />
                            )}
                            <img
                              src={car!.image}
                              alt={car!.name}
                              className="w-full h-24 object-cover rounded-lg mb-2"
                            />
                            <div className="font-bold text-white">{car!.name}</div>
                            <div className="text-sm text-cyan-400">{car!.tagline}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, index) => (
                      <motion.tr
                        key={spec.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-white/5 ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                      >
                        <td className="p-4 text-white/60 font-medium">{spec.label}</td>
                        {selectedCarsData.map((car) => {
                          const value = car![spec.key as keyof typeof car];
                          let displayValue = String(value);
                          
                          if (spec.format === 'currency') {
                            displayValue = formatPrice(Number(value), currency);
                          }
                          
                          const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, ''));
                          const allValues = selectedCarsData.map((c) => {
                            const v = parseFloat(String(c![spec.key as keyof typeof c]).replace(/[^0-9.]/g, ''));
                            return isNaN(v) ? 0 : v;
                          });
                          const maxVal = Math.max(...allValues);
                          const minVal = Math.min(...allValues);
                          const isBest = spec.better === 'higher' 
                            ? numericValue === maxVal 
                            : numericValue === minVal;

                          return (
                            <td key={car!.id} className="p-4 text-center">
                              <span className={`font-bold ${isBest && showDiff ? 'text-cyan-400' : 'text-white'}`}>
                                {displayValue}
                              </span>
                              {isBest && showDiff && (
                                <span className="ml-2 text-xs text-cyan-400">(Best)</span>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                    <tr>
                      <td className="p-4 text-white/60 font-medium">Features</td>
                      {selectedCarsData.map((car) => (
                        <td key={car!.id} className="p-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {car!.features.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="px-2 py-1 bg-white/10 rounded text-xs text-white/70"
                              >
                                {feature}
                              </span>
                            ))}
                            {car!.features.length > 2 && (
                              <span className="px-2 py-1 text-xs text-cyan-400">
                                +{car!.features.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-t border-white/10">
                      <td className="p-4"></td>
                      {selectedCarsData.map((car) => (
                        <td key={car!.id} className="p-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium text-white cursor-pointer"
                          >
                            Book Now
                          </motion.button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDiff(!showDiff)}
            className="px-6 py-3 glass rounded-xl font-medium text-white cursor-pointer"
          >
            {showDiff ? 'Hide Differences' : 'Show Best Values'}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
