import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Car, Clock, Check, ArrowRight } from 'lucide-react';
import { cars } from '../data/cars';

interface BookingProps {
  prefillData: { model?: string; city?: string; date?: string };
}

export function Booking({ prefillData }: BookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: '',
    city: '',
    date: '',
    time: '10:00',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefillData.model) setFormData(prev => ({ ...prev, model: prefillData.model || '' }));
    if (prefillData.city) setFormData(prev => ({ ...prev, city: prefillData.city || '' }));
    if (prefillData.date) setFormData(prev => ({ ...prev, date: prefillData.date || '' }));
  }, [prefillData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kochi', 'Hyderabad', 'Pune'];
  const TIMES = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  return (
    <section id="booking" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            <span className="text-gradient">Book a Test Drive</span>
          </h2>
          <p className="text-[#86868b] text-[17px] md:text-[19px] max-w-2xl mx-auto">
            Experience the future of driving firsthand. Schedule your personal demonstration today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-20 h-20 bg-[#30d158] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-[28px] font-semibold text-white mb-3">Booking Confirmed!</h3>
              <p className="text-[#86868b] text-[17px] mb-8">
                We've sent a confirmation to {formData.email}.<br />
                Our team will contact you shortly to confirm the details.
              </p>
              <div className="inline-flex items-center gap-2 text-[#0071e3]">
                <Calendar className="w-5 h-5" />
                <span>{formData.date} at {formData.time}</span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">
                    <Car className="w-4 h-4 inline mr-1" />
                    Preferred Model
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all cursor-pointer"
                  >
                    <option value="">Select a model</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.name}>{car.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    City
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all cursor-pointer"
                  >
                    <option value="">Select city</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#86868b] mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all cursor-pointer"
                  >
                    {TIMES.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="apple-button-primary w-full flex items-center justify-center gap-2"
              >
                Schedule Test Drive
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
