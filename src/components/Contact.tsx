import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ArrowRight, X, Globe } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-black" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              <span className="text-gradient">Get in Touch</span>
            </h2>
            <p className="text-[#86868b] text-[17px] mb-10 max-w-[400px]">
              Have questions? Our team is here to help you find the perfect DriveAI for your lifestyle.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'hello@driveai.in' },
                { icon: Phone, label: 'Phone', value: '+91 1800 123 4567' },
                { icon: MapPin, label: 'Headquarters', value: 'Mumbai, Maharashtra, India' },
                { icon: Clock, label: 'Support Hours', value: '24/7 AI Assistant, 9am-9pm Human' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-[#1d1d1f] rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#0071e3]" />
                  </div>
                  <div>
                    <div className="text-[14px] text-[#86868b]">{item.label}</div>
                    <div className="text-[17px] font-medium text-white">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              {[
                { icon: X, href: '#' },
                { icon: Globe, href: '#' },
                { icon: Globe, href: '#' },
                { icon: Globe, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-[#1d1d1f] hover:bg-[#2d2d2f] rounded-full flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-[#86868b]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-10"
          >
            <h3 className="text-[21px] font-semibold text-white mb-6">Subscribe to Updates</h3>
            <p className="text-[#86868b] text-[15px] mb-6">
              Get the latest on new models, features, and exclusive offers delivered to your inbox.
            </p>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-[#1d1d1f] rounded-xl px-4 py-3.5 text-white placeholder-[#6e6e73] focus:outline-none focus:ring-2 focus:ring-[#0071e3] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="apple-button-primary w-full flex items-center justify-center gap-2"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>

            <p className="text-[#6e6e73] text-[12px] mt-4">
              By subscribing, you agree to receive marketing communications. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-[#424245]/30">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[21px] font-semibold">
            <span className="text-gradient">DriveAI</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[14px] text-[#86868b]">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility'].map((link) => (
              <a key={link} href="#" className="hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </div>
          
          <div className="text-[14px] text-[#6e6e73]">
            © 2024 DriveAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
