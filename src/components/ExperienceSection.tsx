import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Home, Car, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

interface ExperienceSectionProps {
  onOpenMenu: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenMenu }) => {
  const cards = [
    {
      id: 'flavours',
      title: 'AUTHENTIC FLAVOURS',
      copy: 'Discover a variety of satisfying dishes and authentic flavours.',
      image: '/images/mandi_speciality.jpg',
      icon: <Utensils className="w-5 h-5" />,
      badge: 'Signature Craft',
      actionLabel: 'Explore Menu',
      onClick: onOpenMenu,
    },
    {
      id: 'ambience',
      title: 'A WARM AMBIENCE',
      copy: 'Enjoy a welcoming atmosphere for everyday meals and special moments.',
      image: '/images/gallery_dining.jpg',
      icon: <Home className="w-5 h-5" />,
      badge: 'Royal Comfort',
      actionLabel: 'View Gallery',
      href: '#gallery',
    },
    {
      id: 'convenience',
      title: 'CONVENIENT DINING',
      copy: 'Visit us at Mischief Mall or explore our home delivery options.',
      image: '/images/tandoori.jpg',
      icon: <Car className="w-5 h-5" />,
      badge: 'Parking & Delivery',
      actionLabel: 'Order Delivery',
      href: RESTAURANT_INFO.whatsappUrl,
      isExternal: true,
    },
  ];

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[#0B0704] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F4B24D]/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>DISTINCTIVE HIGHLIGHTS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6E6C9] leading-tight"
          >
            The Royal Gazebo <span className="text-gold-gradient italic font-normal">Difference</span>
          </motion.h2>
        </div>

        {/* 3 Distinct Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden bg-[#24150A] border border-[#F4B24D]/25 hover:border-[#F4B24D]/60 transition-all duration-500 shadow-xl hover:shadow-gold-md hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#1A0E06]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24150A] via-[#24150A]/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#0B0704]/80 backdrop-blur-md text-[#F4B24D] border border-[#F4B24D]/30 shadow-sm">
                    {card.badge}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="absolute bottom-3 right-4 w-10 h-10 rounded-full bg-[#1A0E06]/90 border border-[#F4B24D]/40 flex items-center justify-center text-[#F4B24D] shadow-md group-hover:bg-[#F4B24D] group-hover:text-[#0B0704] transition-colors duration-300">
                  {card.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F6E6C9] group-hover:text-[#F4B24D] transition-colors mb-3">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#D9C4A1] leading-relaxed mb-6">
                    {card.copy}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-[#F4B24D]/15">
                  {card.onClick ? (
                    <button
                      onClick={card.onClick}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#F4B24D] group-hover:text-[#F7C875] transition"
                    >
                      <span>{card.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : card.isExternal ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#F4B24D] group-hover:text-[#F7C875] transition"
                    >
                      <span>{card.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#F4B24D] group-hover:text-[#F7C875] transition"
                    >
                      <span>{card.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
