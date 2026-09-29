import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, MessageSquare, MapPin, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

interface HeroSectionProps {
  onOpenMenu: () => void;
  isSplashDone: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenMenu, isSplashDone }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 overflow-hidden bg-[#0B0704]"
    >
      {/* Background Ambient Lighting & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(244,178,77,0.14),transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#4B2A12]/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#F4B24D]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Storytelling & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isSplashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E06] border border-[#F4B24D]/35 text-[#F4B24D] text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]" />
              <span>{RESTAURANT_INFO.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-[#F6E6C9] leading-[1.12] tracking-tight mb-6">
              A Royal Taste <br />
              <span className="text-gold-gradient italic font-normal">in Every Bite.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#D9C4A1] font-normal leading-relaxed max-w-xl mb-8">
              {RESTAURANT_INFO.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onOpenMenu}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-sm tracking-wider uppercase shadow-gold-md hover:shadow-gold-lg hover:brightness-110 active:scale-98 transition duration-300"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#0B0704] transition-transform group-hover:rotate-12" />
                <span>EXPLORE OUR MENU</span>
              </button>

              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-[#F4B24D]/40 bg-[#1A0E06]/90 text-[#F6E6C9] font-medium text-sm tracking-wider uppercase hover:border-[#F4B24D] hover:bg-[#24150A] transition duration-300 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#F4B24D]" />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>

            {/* Meta Tags: Location, Price, Parking */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#F4B24D]/20 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#24150A] border border-[#F4B24D]/25 flex items-center justify-center text-[#F4B24D] flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-medium">Location</div>
                  <div className="text-xs font-semibold text-[#F6E6C9]">{RESTAURANT_INFO.shortLocation}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#24150A] border border-[#F4B24D]/25 flex items-center justify-center text-[#F4B24D] flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-medium">Dining Range</div>
                  <div className="text-xs font-semibold text-[#F6E6C9]">{RESTAURANT_INFO.priceRange}</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#24150A] border border-[#F4B24D]/25 flex items-center justify-center text-[#F4B24D] flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#D9C4A1]/70 font-medium">Convenience</div>
                  <div className="text-xs font-semibold text-[#F6E6C9]">Delivery & Parking</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Visual Artwork & Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isSplashDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Decorative Gold Border */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-[#F4B24D]/40 via-[#4B2A12]/30 to-[#F4B24D]/10 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[4/5] bg-[#1A0E06]">
                  <img
                    src="/images/hero_mandi.jpg"
                    alt="Royal Gazebo Authentic Dining"
                    className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0704] via-transparent to-black/20 pointer-events-none" />

                  {/* Corner Accent Ornaments */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#F4B24D] pointer-events-none" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#F4B24D] pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#F4B24D] pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#F4B24D] pointer-events-none" />

                  {/* Floating Badges */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B0704]/90 backdrop-blur-md border border-[#F4B24D]/30 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] tracking-widest text-[#F4B24D] font-bold uppercase">
                          Authentic Flavours
                        </div>
                        <div className="font-serif text-sm font-semibold text-[#F6E6C9]">
                          Royal Flavours & Hospitality
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#24150A] border border-[#F4B24D]/40 flex items-center justify-center text-[#F4B24D]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Background Accent */}
              <div className="absolute -inset-4 rounded-3xl border border-[#F4B24D]/15 -z-10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
