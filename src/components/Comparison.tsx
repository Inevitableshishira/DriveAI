import { motion } from 'framer-motion';
import { cars, formatPrice } from '../data/cars';
import { Battery, Zap, Gauge, Shield, Star, Check } from 'lucide-react';

interface ComparisonProps {
  compareCars: string[];
  currency: 'INR' | 'USD';
}

export function Comparison({ compareCars, currency }: ComparisonProps) {
  const selectedCars = cars.filter(car => 
    compareCars.includes(car.id) || car.isFlagship
  ).slice(0, 3);

  const features = [
    { name: 'Range', getValue: (car: typeof cars[0]) => car.range },
    { name: 'Power', getValue: (car: typeof cars[0]) => car.power },
    { name: '0-100 km/h', getValue: (car: typeof cars[0]) => car.acceleration },
    { name: 'Top Speed', getValue: (car: typeof cars[0]) => car.topSpeed },
    { name: 'Safety Rating', getValue: (car: typeof cars[0]) => `${car.safetyRating} Stars` },
    { name: 'Starting Price', getValue: (car: typeof cars[0]) => formatPrice(car.priceInr, currency) },
  ];

  return (
    <section id="comparison" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Compare Models</span>
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-2xl mx-auto">
            See how our vehicles stack up against each other to find your perfect match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="min-w-[800px]">
            <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${selectedCars.length}, 1fr)` }}>
              <div />
              {selectedCars.map((car, i) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card rounded-3xl p-6 text-center ${car.isFlagship ? 'ring-2 ring-[#bf5af2]' : ''}`}
                >
                  {car.isFlagship && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#bf5af2] rounded-full text-[11px] font-medium text-white mb-3">
                      <Star className="w-3 h-3" fill="white" />
                      Best Overall
                    </div>
                  )}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-32 object-cover rounded-2xl mb-4"
                  />
                  <h3 className="text-[21px] font-semibold text-white mb-1">{car.name}</h3>
                  <p className="text-[#86868b] text-[14px]">{car.tagline}</p>
                  <div className="mt-4 text-[21px] font-semibold text-gradient">
                    {formatPrice(car.priceInr, currency)}
                  </div>
                </motion.div>
              ))}

              {features.map((feature, featureIndex) => (
                <>
                  <motion.div
                    key={`label-${feature.name}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.05 }}
                    className="flex items-center text-[#86868b] font-medium"
                  >
                    {feature.name}
                  </motion.div>
                  {selectedCars.map((car, carIndex) => (
                    <motion.div
                      key={`${car.id}-${feature.name}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (featureIndex * 0.05) + (carIndex * 0.1) }}
                      className="text-center text-white font-medium py-3 border-t border-[#424245]/30"
                    >
                      {feature.getValue(car)}
                    </motion.div>
                  ))}
                </>
              ))}

              <div className="flex items-center text-[#86868b] font-medium">
                Key Features
              </div>
              {selectedCars.map((car, carIndex) => (
                <motion.div
                  key={`${car.id}-features`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (carIndex * 0.1) }}
                  className="py-3 border-t border-[#424245]/30"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {car.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-[#1d1d1f] rounded text-[12px] text-[#86868b]">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
