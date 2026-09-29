import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, Compass, Utensils } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#1A0E06] overflow-hidden">
      {/* Background Subtle Ambient Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4B24D]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4B24D]/30 to-transparent" />
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4B2A12]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative borders */}
              <div className="rounded-2xl p-2 bg-gradient-to-b from-[#F4B24D]/30 via-[#24150A] to-[#4B2A12]/40 shadow-card-glow">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#0B0704]">
                  <img
                    src="/images/about_ambience.jpg"
                    alt="Royal Gazebo Interior Dining Ambience"
                    className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0704]/90 via-transparent to-black/10 pointer-events-none" />

                  {/* Corner Royal Brackets */}
                  <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#F4B24D]" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#F4B24D]" />

                  {/* Floating Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0B0704]/85 backdrop-blur-md border border-[#F4B24D]/25">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#24150A] border border-[#F4B24D]/40 flex items-center justify-center text-[#F4B24D] flex-shrink-0">
                        <HeartHandshake className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-[#F4B24D] font-bold">
                          Warm Hospitality
                        </div>
                        <div className="text-xs text-[#F6E6C9] font-medium">
                          Created for memorable gatherings
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative offset frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-[#F4B24D]/20 -z-10 hidden sm:block" />
            </div>
          </motion.div>

          {/* Right Column: Narrative Storytelling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150A] border border-[#F4B24D]/35 text-[#F4B24D] text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]" />
              <span>THE ROYAL EXPERIENCE</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6E6C9] leading-tight mb-6">
              Where Every Bite <br />
              <span className="text-gold-gradient italic font-normal">Tells a Story.</span>
            </h2>

            {/* Core Narrative Paragraph */}
            <p className="text-base sm:text-lg text-[#D9C4A1] leading-relaxed mb-8">
              At Royal Gazebo, discover authentic flavours in a warm and inviting atmosphere. From satisfying meals to memorable moments with family and friends, every visit is an opportunity to enjoy the pleasure of good food.
            </p>

            {/* Subtle Gold Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#F4B24D]/40 via-[#D18B2C]/20 to-transparent mb-8" />

            {/* Highlights Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              <div className="p-4 rounded-xl bg-[#24150A]/70 border border-[#F4B24D]/20 hover:border-[#F4B24D]/40 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D]">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#F6E6C9]">
                    Authentic Recipes
                  </h3>
                </div>
                <p className="text-xs text-[#D9C4A1] leading-relaxed">
                  Prepared with aromatic spices and authentic ingredients for a truly satisfying culinary journey.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#24150A]/70 border border-[#F4B24D]/20 hover:border-[#F4B24D]/40 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#F6E6C9]">
                    Prime Location
                  </h3>
                </div>
                <p className="text-xs text-[#D9C4A1] leading-relaxed">
                  Located at Mischief Mall, K S Rao Road, with hassle-free parking and rapid doorstep home delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
