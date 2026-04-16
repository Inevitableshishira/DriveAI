import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Phone, Mail, Car, Clock } from 'lucide-react';

interface BookingProps {
  prefillData: { model?: string; city?: string; date?: string };
}

const cities = ['Kochi', 'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export function Booking({ prefillData }: BookingProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: prefillData.city || '',
    preferredDate: prefillData.date || '',
    preferredTime: '',
    model: prefillData.model || '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="booking" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 to-dark" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Book Your Test Drive
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experience the future of driving firsthand. Schedule a complimentary test drive at your convenience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  City
                </label>
                <select
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="" className="bg-dark">Select your city</option>
                  {cities.map((city) => (
                    <option key={city} value={city} className="bg-dark">{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <Car className="w-4 h-4" />
                  Model Interest
                </label>
                <select
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="" className="bg-dark">Select a model</option>
                  <option value="Velox GT" className="bg-dark">Velox GT - Sports</option>
                  <option value="Terra X" className="bg-dark">Terra X - SUV</option>
                  <option value="Aurora S" className="bg-dark">Aurora S - Sedan</option>
                  <option value="Ion Pro" className="bg-dark">Ion Pro - Electric</option>
                  <option value="Terra Max" className="bg-dark">Terra Max - SUV</option>
                  <option value="Spark EV" className="bg-dark">Spark EV - Electric</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all cursor-pointer"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  <Clock className="w-4 h-4" />
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {timeSlots.map((slot) => (
                    <motion.button
                      key={slot}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        formData.preferredTime === slot
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-white/70 text-sm mb-2">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  placeholder="Any specific questions or requirements?"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 210, 255, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white text-lg cursor-pointer"
            >
              {isSubmitted ? 'Request Submitted!' : 'Schedule Test Drive'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
