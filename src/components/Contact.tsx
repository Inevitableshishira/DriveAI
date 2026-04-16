import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-surface/50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Have questions about DriveAI? Our team is here to help you make the switch to electric.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-2xl p-8"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white cursor-pointer"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: 'Headquarters',
                details: ['DriveAI India Pvt. Ltd.', 'Tower A, Tech Park', 'Kochi, Kerala 682036']
              },
              {
                icon: Phone,
                title: 'Phone',
                details: ['+91 484 123 4567', 'Mon-Sat: 9AM-8PM']
              },
              {
                icon: Mail,
                title: 'Email',
                details: ['hello@driveai.in', 'support@driveai.in']
              },
              {
                icon: Clock,
                title: 'Business Hours',
                details: ['Monday - Saturday', '9:00 AM - 8:00 PM IST']
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-sm text-white/60">{detail}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold text-white">Live Chat</span>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Get instant answers from our AI assistant or connect with a human advisor.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 bg-white/10 rounded-lg text-sm font-medium text-cyan-400 cursor-pointer"
              >
                Start Chat
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              DriveAI
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Careers</a>
          </div>

          <div className="text-sm text-white/40">
            © {currentYear} DriveAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
