import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Phone, MessageSquare, Car, Clock, Navigation, ExternalLink } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { RESTAURANT_INFO } from '../config/restaurant';

interface ContactSectionProps {
  onOpenMenu: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenMenu }) => {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#1A0E06] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4B24D]/30 to-transparent" />
      <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-[#4B2A12]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150A] border border-[#F4B24D]/35 text-[#F4B24D] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]" />
            <span>VISIT & CONNECT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6E6C9] leading-tight mb-4"
          >
            YOUR TABLE AWAITS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#D9C4A1]"
          >
            Visit Royal Gazebo at Mischief Mall, Mangaluru, or get in touch to explore home delivery options.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Address Card */}
            <div className="rounded-2xl bg-[#24150A] border border-[#F4B24D]/25 p-6 sm:p-7 shadow-lg hover:border-[#F4B24D]/50 transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1A0E06] border border-[#F4B24D]/35 flex items-center justify-center text-[#F4B24D] flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-[#F6E6C9] mb-1">
                    {RESTAURANT_INFO.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#F4B24D] font-medium mb-2">
                    {RESTAURANT_INFO.mall}
                  </p>
                  <p className="text-sm text-[#D9C4A1] leading-relaxed mb-4">
                    {RESTAURANT_INFO.fullAddress}
                  </p>

                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#F4B24D] hover:text-[#F7C875] transition"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact & WhatsApp Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="rounded-2xl bg-[#24150A] border border-[#F4B24D]/25 p-5 shadow-md flex flex-col justify-between hover:border-[#F4B24D]/50 transition">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#1A0E06] border border-[#F4B24D]/35 flex items-center justify-center text-[#F4B24D] mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-semibold mb-1">
                    Direct Phone Line
                  </div>
                  <div className="text-base font-bold text-[#F6E6C9] mb-3">
                    {RESTAURANT_INFO.phoneDisplay}
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.phoneTel}
                  className="w-full py-2.5 rounded-lg border border-[#F4B24D]/30 text-xs font-semibold text-[#F4B24D] text-center hover:bg-[#1A0E06] transition"
                >
                  Call Now
                </a>
              </div>

              {/* WhatsApp Delivery Card */}
              <div className="rounded-2xl bg-[#24150A] border border-[#F4B24D]/25 p-5 shadow-md flex flex-col justify-between hover:border-[#F4B24D]/50 transition">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#1A0E06] border border-[#F4B24D]/35 flex items-center justify-center text-[#F4B24D] mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-semibold mb-1">
                    Home Delivery & Inquiries
                  </div>
                  <div className="text-base font-bold text-[#F6E6C9] mb-3">
                    Instant WhatsApp
                  </div>
                </div>
                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] text-xs font-bold uppercase tracking-wider text-center hover:brightness-110 transition shadow-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Social & Amenities Bar */}
            <div className="rounded-2xl bg-[#24150A] border border-[#F4B24D]/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] group-hover:scale-110 transition-transform">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-medium">Follow on Instagram</div>
                  <div className="text-xs font-bold text-[#F6E6C9] group-hover:text-[#F4B24D] transition-colors">
                    {RESTAURANT_INFO.instagramHandle}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 text-xs text-[#D9C4A1]">
                <div className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#F4B24D]" />
                  <span>Mall Parking</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#F4B24D]" />
                  <span>Current Timings</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Google Maps & Visual Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="rounded-2xl p-2 bg-gradient-to-b from-[#F4B24D]/30 via-[#24150A] to-[#4B2A12]/40 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-[#0B0704]">
                <iframe
                  title="Royal Gazebo Location Map"
                  src={RESTAURANT_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                />

                {/* Map Overlay Badge */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0B0704]/90 backdrop-blur-md border border-[#F4B24D]/30 shadow-lg pointer-events-none">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#F4B24D]">
                    Location Pin
                  </div>
                  <div className="text-xs font-semibold text-[#F6E6C9]">
                    Mischief Mall · Ground Floor
                  </div>
                </div>

                {/* Direct Map Link Overlay */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] text-xs font-bold uppercase tracking-wider shadow-gold-sm hover:brightness-110 transition"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Menu Button Callout */}
            <div className="mt-4 p-4 rounded-xl bg-[#24150A] border border-[#F4B24D]/20 flex items-center justify-between">
              <span className="text-xs text-[#D9C4A1]">
                Looking for our culinary offerings?
              </span>
              <button
                onClick={onOpenMenu}
                className="text-xs font-bold text-[#F4B24D] hover:text-[#F7C875] underline uppercase tracking-wider"
              >
                Explore Digital Menu
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
