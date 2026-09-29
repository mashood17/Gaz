import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryKey: 'cuisine' | 'ambience' | 'refreshments';
  src: string;
  description: string;
}

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'item-1',
      title: 'Authentic Mandi & Biryani',
      category: 'Signature Cuisine',
      categoryKey: 'cuisine',
      src: '/images/hero_mandi.jpg',
      description: 'Fragrant basmati cooked with tender spiced cuts and aromatic whole spices.',
    },
    {
      id: 'item-2',
      title: 'Royal Dining Ambience',
      category: 'Ambience & Dining',
      categoryKey: 'ambience',
      src: '/images/about_ambience.jpg',
      description: 'Warm golden lighting and elegant seating designed for families and friends.',
    },
    {
      id: 'item-3',
      title: 'Charcoal Tandoori Grill',
      category: 'Signature Cuisine',
      categoryKey: 'cuisine',
      src: '/images/tandoori.jpg',
      description: 'Succulent marinated meats charred over charcoal for distinct smokiness.',
    },
    {
      id: 'item-4',
      title: 'Atmospheric Evening Tables',
      category: 'Ambience & Dining',
      categoryKey: 'ambience',
      src: '/images/gallery_dining.jpg',
      description: 'Lantern-lit tables offering an intimate dining experience in Mischief Mall.',
    },
    {
      id: 'item-5',
      title: 'Rich Simmered Curries',
      category: 'Signature Cuisine',
      categoryKey: 'cuisine',
      src: '/images/gallery_curry.jpg',
      description: 'Slow-simmered rich gravies prepared with authentic house spice blends.',
    },
    {
      id: 'item-6',
      title: 'Artisan Tropical Refreshments',
      category: 'Refreshments & Desserts',
      categoryKey: 'refreshments',
      src: '/images/royal_beverage.jpg',
      description: 'Chilled signature mocktails with tropical fruit garnishes and crushed ice.',
    },
    {
      id: 'item-7',
      title: 'Decadent Desserts',
      category: 'Refreshments & Desserts',
      categoryKey: 'refreshments',
      src: '/images/gallery_dessert.jpg',
      description: 'Indulgent sweet treats to conclude every royal feast.',
    },
    {
      id: 'item-8',
      title: 'Live Tandoor Preparation',
      category: 'Signature Cuisine',
      categoryKey: 'cuisine',
      src: '/images/gallery_tandoor.jpg',
      description: 'Freshly prepared breads and kebabs cooked to perfection in our clay oven.',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.categoryKey === activeCategory);

  const handlePrev = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [activeLightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [activeLightboxIndex, filteredItems.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleNext, handlePrev]);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#1A0E06] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F4B24D]/30 to-transparent" />
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[#F4B24D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24150A] border border-[#F4B24D]/35 text-[#F4B24D] text-xs font-semibold tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]" />
            <span>VISUAL PORTFOLIO</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F6E6C9] leading-tight mb-4"
          >
            Culinary Craft & <span className="text-gold-gradient italic font-normal">Ambience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm sm:text-base text-[#D9C4A1]"
          >
            An intimate glimpse into our restaurant dining space, authentic preparations, and warm Mangaluru hospitality.
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { key: 'all', label: 'All Photos' },
            { key: 'cuisine', label: 'Authentic Dishes' },
            { key: 'ambience', label: 'Dining Ambience' },
            { key: 'refreshments', label: 'Drinks & Desserts' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategory(cat.key);
                setActiveLightboxIndex(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold shadow-gold-sm scale-105'
                  : 'bg-[#24150A] text-[#D9C4A1] border border-[#F4B24D]/20 hover:border-[#F4B24D]/50 hover:text-[#F6E6C9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-[#24150A] border border-[#F4B24D]/25 hover:border-[#F4B24D]/60 transition-all duration-500 shadow-lg cursor-pointer aspect-[4/5]"
              onClick={() => setActiveLightboxIndex(idx)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0704] via-[#0B0704]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#0B0704]/80 backdrop-blur-md text-[#F4B24D] border border-[#F4B24D]/25">
                  {item.category}
                </span>
              </div>

              {/* Zoom Action Icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0B0704]/70 border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <h3 className="font-serif text-lg font-bold text-[#F6E6C9] group-hover:text-[#F4B24D] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D9C4A1]/85 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute inset-0 bg-[#0B0704]/95 backdrop-blur-lg"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center z-10"
            >
              {/* Controls */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close lightbox"
                className="absolute -top-12 right-0 p-2 text-[#D9C4A1] hover:text-[#F4B24D] bg-[#24150A] rounded-full border border-[#F4B24D]/30 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full rounded-2xl overflow-hidden border border-[#F4B24D]/40 bg-[#0B0704] shadow-2xl flex items-center justify-center">
                <img
                  src={filteredItems[activeLightboxIndex].src}
                  alt={filteredItems[activeLightboxIndex].title}
                  className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
                />

                {/* Left / Right Navigation */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0B0704]/80 text-[#F6E6C9] hover:text-[#F4B24D] border border-[#F4B24D]/30 hover:border-[#F4B24D] transition shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0B0704]/80 text-[#F6E6C9] hover:text-[#F4B24D] border border-[#F4B24D]/30 hover:border-[#F4B24D] transition shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer Info */}
              <div className="w-full mt-4 flex items-center justify-between text-[#F6E6C9] px-2">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#F4B24D]">
                    {filteredItems[activeLightboxIndex].title}
                  </h4>
                  <p className="text-xs text-[#D9C4A1]">
                    {filteredItems[activeLightboxIndex].description}
                  </p>
                </div>
                <div className="text-xs font-mono text-[#D9C4A1]/70 px-3 py-1 rounded-full bg-[#24150A] border border-[#F4B24D]/20">
                  {activeLightboxIndex + 1} / {filteredItems.length}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
