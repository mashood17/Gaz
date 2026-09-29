import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

export const ReviewsSection: React.FC = () => {
  const { reviewsData } = RESTAURANT_INFO;

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-[#0B0704] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F4B24D]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A0E06] border border-[#F4B24D]/35 text-[#F4B24D] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]" />
            <span>COMMUNITY FEEDBACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6E6C9] leading-tight mb-4"
          >
            {reviewsData.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#D9C4A1]"
          >
            {reviewsData.subtitle}
          </motion.p>
        </div>

        {/* Platform Rating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {reviewsData.platforms.map((platform, idx) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative rounded-2xl bg-[#24150A] border border-[#F4B24D]/25 hover:border-[#F4B24D]/60 p-7 transition-all duration-300 shadow-xl hover:shadow-gold-md hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl font-bold text-[#F6E6C9]">
                      {platform.name}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#F4B24D]" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#1A0E06] text-[#F4B24D] border border-[#F4B24D]/30">
                    {platform.badge}
                  </span>
                </div>

                {/* Big Score Display */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-serif text-4xl sm:text-5xl font-extrabold text-gold-gradient">
                    {platform.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-[#D9C4A1]/70 font-mono">
                    / {platform.maxRating.toFixed(1)}
                  </span>
                </div>

                {/* Stars Representation */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.floor(platform.rating)
                          ? 'fill-[#F4B24D] text-[#F4B24D]'
                          : star - 0.5 <= platform.rating
                          ? 'fill-[#F4B24D]/60 text-[#F4B24D]'
                          : 'text-[#4B2A12]'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Count Details */}
                <p className="text-xs text-[#D9C4A1] font-medium">
                  Based on <span className="text-[#F6E6C9] font-bold">{platform.count}</span>
                </p>
              </div>

              {/* Bottom Subtle Note */}
              <div className="pt-4 mt-6 border-t border-[#F4B24D]/15 flex items-center justify-between text-[11px] text-[#D9C4A1]/80">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F4B24D]" />
                  Public diner ratings
                </span>
                <span className="font-medium text-[#F4B24D]">Verified data</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification and External Review Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center p-6 rounded-2xl bg-[#1A0E06] border border-[#F4B24D]/20 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <p className="text-xs text-[#D9C4A1] leading-relaxed">
              Ratings reflect historical public platform records for Royal Gazebo Restaurant, Mangaluru.
            </p>
          </div>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#F4B24D]/40 text-xs font-semibold tracking-wider text-[#F6E6C9] hover:bg-[#24150A] hover:border-[#F4B24D] transition"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#F4B24D]" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
