import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  X,
  ShoppingCart,
  Sparkles,
  MapPin,
  Clock,
  Car,
  MessageSquare,
  Phone,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { RESTAURANT_INFO } from '../config/restaurant';
import { MENU_CATEGORIES } from '../data/menuData';
import type { MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { MenuItemRow } from './MenuItemRow';
import { CartDrawer } from './CartDrawer';

interface DigitalMenuPageProps {
  onBackToHome: () => void;
}

type DietaryFilter = 'ALL' | 'VEG' | 'NON-VEG';

export const DigitalMenuPage: React.FC<DigitalMenuPageProps> = ({ onBackToHome }) => {
  const {
    getItemQuantity,
    addToCart,
    updateQuantity,
    totalItemsCount,
    subtotal,
    setIsCartOpen,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Category navigation tabs including 'ALL'
  const categoryTabs = useMemo(() => {
    return [
      { id: 'all', shortName: 'All', name: 'All Categories' },
      ...MENU_CATEGORIES.map((c) => ({
        id: c.id,
        shortName: c.shortName,
        name: c.name,
      })),
    ];
  }, []);

  // Filtered menu categories based on search, dietary filter, and selected category
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return MENU_CATEGORIES.map((cat) => {
      // If a specific category is chosen and it does not match, return empty
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return { ...cat, items: [] };
      }

      const matchingItems = cat.items.filter((item) => {
        // Dietary filter
        if (dietaryFilter === 'VEG' && !item.isVeg) return false;
        if (dietaryFilter === 'NON-VEG' && item.isVeg) return false;

        // Search query
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          cat.name.toLowerCase().includes(q) ||
          cat.shortName.toLowerCase().includes(q)
        );
      });

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter((cat) => cat.items.length > 0);
  }, [searchQuery, dietaryFilter, selectedCategory]);

  const totalMatchingDishes = useMemo(() => {
    return filteredCategories.reduce((sum, c) => sum + c.items.length, 0);
  }, [filteredCategories]);

  // Toggle accordion expand (keeps only 1 dish expanded at a time)
  const handleToggleExpand = (itemId: string) => {
    setExpandedItemId((prev) => (prev === itemId ? null : itemId));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setDietaryFilter('ALL');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-[#0B0704] text-[#F6E6C9] font-sans antialiased overflow-x-hidden selection:bg-[#F4B24D]/30 selection:text-[#F4B24D]">
      {/* Background Ambient Lighting */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(244,178,77,0.08),transparent_70%)] pointer-events-none" />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* 1. COMPACT BRAND HEADER WITH TOP-RIGHT CART BUTTON */}
      <header className="sticky top-0 z-40 bg-[#0B0704]/95 backdrop-blur-md border-b border-[#F4B24D]/20 shadow-xl transition-all">
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left: Back to Home + Circular Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={onBackToHome}
                aria-label="Back to Homepage"
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#1A0E06] border border-[#F4B24D]/30 hover:border-[#F4B24D] text-[#D9C4A1] hover:text-[#F4B24D] transition text-xs font-semibold tracking-wider uppercase active:scale-95 shadow-sm flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 text-[#F4B24D]" />
                <span className="hidden sm:inline">Home</span>
              </button>

              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/images/royal_gazebo_logo.png"
                    alt="Royal Gazebo Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(244,178,77,0.3)]"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-serif text-xs sm:text-base font-bold text-[#F6E6C9] leading-tight truncate">
                    ROYAL GAZEBO
                  </span>
                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em] text-[#F4B24D] uppercase font-medium">
                    Digital Menu
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cart Button in Top-Right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open Cart with ${totalItemsCount} items`}
                className="relative flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#1A0E06] border border-[#F4B24D]/40 hover:border-[#F4B24D] text-[#F6E6C9] hover:text-[#F4B24D] transition shadow-gold-sm active:scale-95 group"
              >
                <ShoppingCart className="w-4 h-4 text-[#F4B24D] transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold font-mono text-[#F4B24D]">
                  {totalItemsCount}
                </span>
                {totalItemsCount > 0 && (
                  <span className="hidden sm:inline text-xs font-semibold text-[#D9C4A1]">
                    · ₹{subtotal.toFixed(0)}
                  </span>
                )}
                {/* Active Indicator Pulse */}
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F4B24D] animate-ping" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. COMPACT EDITORIAL HEADER */}
      <section className="relative pt-4 pb-4 sm:pt-7 sm:pb-6 bg-gradient-to-b from-[#1A0E06] to-[#0B0704] border-b border-[#F4B24D]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#24150A] border border-[#F4B24D]/25 text-[#F4B24D] text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
            <Sparkles className="w-3 h-3 text-[#F4B24D]" />
            <span>A ROYAL TASTE IN EVERY BITE</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#F6E6C9] tracking-tight mb-1">
            Our Menu
          </h1>

          <p className="text-xs text-[#D9C4A1]/80 max-w-md mx-auto leading-relaxed">
            Freshly prepared tiffins, street-style evening chats, and authentic culinary specialties.
          </p>
        </div>
      </section>

      {/* 3. STICKY FILTERS CONTROL PANEL: SEARCH + DIETARY + CATEGORIES */}
      <section className="sticky top-[49px] sm:top-[57px] z-30 bg-[#0B0704]/96 backdrop-blur-md border-b border-[#F4B24D]/20 shadow-lg py-2.5 space-y-2.5">
        <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-2.5">
          {/* A. Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F4B24D]/60 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              aria-label="Search dishes"
              className="w-full pl-10 pr-9 py-2 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30 focus:border-[#F4B24D] focus:ring-1 focus:ring-[#F4B24D] text-[#F6E6C9] placeholder-[#D9C4A1]/50 text-xs sm:text-sm transition shadow-inner focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#D9C4A1] hover:text-[#F4B24D] transition"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* B. Dietary Filters (ALL | VEG | NON-VEG) */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {/* ALL */}
            <button
              onClick={() => setDietaryFilter('ALL')}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                dietaryFilter === 'ALL'
                  ? 'bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold shadow-gold-sm'
                  : 'bg-[#1A0E06] text-[#D9C4A1] border border-[#F4B24D]/25 hover:border-[#F4B24D]/50 hover:text-[#F6E6C9]'
              }`}
            >
              ALL
            </button>

            {/* VEG */}
            <button
              onClick={() => setDietaryFilter('VEG')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                dietaryFilter === 'VEG'
                  ? 'bg-emerald-900/60 border border-emerald-400 text-emerald-200 shadow-sm'
                  : 'bg-[#1A0E06] text-[#D9C4A1] border border-[#F4B24D]/25 hover:border-emerald-500/50 hover:text-emerald-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span>VEG</span>
            </button>

            {/* NON-VEG */}
            <button
              onClick={() => setDietaryFilter('NON-VEG')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all ${
                dietaryFilter === 'NON-VEG'
                  ? 'bg-red-950/60 border border-red-400 text-red-200 shadow-sm'
                  : 'bg-[#1A0E06] text-[#D9C4A1] border border-[#F4B24D]/25 hover:border-red-500/50 hover:text-red-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
              <span>NON-VEG</span>
            </button>
          </div>

          {/* C. Horizontally Scrollable Category Filters (with ALL as first option) */}
          <div
            ref={categoryScrollRef}
            className="w-full overflow-x-auto no-scrollbar py-0.5"
          >
            <div className="flex items-center gap-1.5 w-max sm:mx-auto px-1">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedCategory(tab.id);
                    }}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#F4B24D] text-[#0B0704] font-bold shadow-gold-sm scale-102'
                        : 'bg-[#1A0E06] text-[#D9C4A1] border border-[#F4B24D]/20 hover:border-[#F4B24D]/50 hover:text-[#F6E6C9]'
                    }`}
                  >
                    {tab.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN MENU ITEMS CONTAINER */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {filteredCategories.length === 0 ? (
          /* Empty Search & Filter State */
          <div className="text-center py-16 px-6 bg-[#1A0E06] rounded-2xl border border-[#F4B24D]/20 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-[#24150A] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] mx-auto mb-3">
              <Filter className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F6E6C9] mb-1">
              No dishes found
            </h3>
            <p className="text-xs text-[#D9C4A1] mb-5 leading-relaxed">
              Try a different search term or change your dietary/category filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2 rounded-full bg-[#F4B24D] text-[#0B0704] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="space-y-3"
            >
              {/* Category Header */}
              <div className="pb-2.5 border-b border-[#F4B24D]/25 flex items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#F6E6C9] tracking-wide flex items-center gap-2">
                    <span>{category.name}</span>
                    <span className="text-[11px] font-mono font-normal text-[#F4B24D] px-2 py-0.5 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30">
                      {category.items.length}
                    </span>
                  </h2>
                  {category.subtitle && (
                    <p className="text-[11px] sm:text-xs text-[#D9C4A1]/80 mt-0.5">
                      {category.subtitle}
                    </p>
                  )}
                </div>

                {category.timing && (
                  <span className="text-[10px] sm:text-[11px] font-medium text-[#F4B24D] flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="hidden sm:inline">{category.timing}</span>
                  </span>
                )}
              </div>

              {/* Items List (Two-column grid on desktop, single-column on mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {category.items.map((item: MenuItem) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    quantity={getItemQuantity(item.id)}
                    isExpanded={expandedItemId === item.id}
                    onToggleExpand={() => handleToggleExpand(item.id)}
                    onAddToCart={() => addToCart(item)}
                    onUpdateQuantity={(delta) => updateQuantity(item.id, delta)}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        {/* 5. WHATSAPP DELIVERY ACTION BANNER */}
        <section className="relative rounded-2xl p-5 sm:p-8 bg-gradient-to-br from-[#24150A] via-[#1A0E06] to-[#0B0704] border border-[#F4B24D]/35 shadow-card-glow text-center sm:text-left overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0B0704] border border-[#F4B24D]/30 text-[#F4B24D] text-[10px] font-bold tracking-widest uppercase mb-2">
                <span>Fast Home Delivery & Takeaway</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F6E6C9] mb-1">
                Order via WhatsApp
              </h3>
              <p className="text-xs text-[#D9C4A1] leading-relaxed">
                Add your dishes above or send a direct order to Royal Gazebo at Mischief Mall, Mangaluru.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto flex-shrink-0">
              {totalItemsCount > 0 ? (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-xs tracking-wider uppercase shadow-gold-sm hover:brightness-110 active:scale-95 transition"
                >
                  <ShoppingCart className="w-4 h-4 text-[#0B0704]" />
                  <span>View Cart ({totalItemsCount} items)</span>
                </button>
              ) : (
                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-xs tracking-wider uppercase shadow-gold-sm hover:brightness-110 active:scale-95 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              <a
                href={RESTAURANT_INFO.phoneTel}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#F4B24D]/40 bg-[#1A0E06] text-[#F6E6C9] font-semibold text-xs tracking-wider uppercase hover:border-[#F4B24D] hover:bg-[#24150A] transition"
              >
                <Phone className="w-4 h-4 text-[#F4B24D]" />
                <span>Call Restaurant</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 6. MOBILE FLOATING CART BAR (WHEN CART HAS ITEMS) */}
      <AnimatePresence>
        {totalItemsCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-4 inset-x-4 z-40 sm:hidden"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-xs tracking-wider uppercase flex items-center justify-between shadow-2xl active:scale-[0.98] transition"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0B0704] text-[#F4B24D] flex items-center justify-center font-mono text-xs font-bold">
                  {totalItemsCount}
                </div>
                <span>View Cart</span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-mono text-sm font-extrabold">₹{subtotal.toFixed(0)}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. COMPACT MENU FOOTER */}
      <footer className="relative bg-[#0B0704] border-t border-[#F4B24D]/20 pt-8 pb-16 sm:pb-8 text-[#D9C4A1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#F4B24D]/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="/images/royal_gazebo_logo.png"
                  alt="Royal Gazebo Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(244,178,77,0.3)]"
                />
              </div>
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#F6E6C9]">
                  ROYAL GAZEBO RESTAURANT
                </h3>
                <p className="text-[10px] italic text-[#F4B24D]">
                  "{RESTAURANT_INFO.tagline}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <button
                onClick={onBackToHome}
                className="text-[#F4B24D] font-bold hover:underline uppercase tracking-wider"
              >
                Back to Home
              </button>
              <span className="text-[#4B2A12]">·</span>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B24D] transition"
              >
                Google Maps
              </a>
              <span className="text-[#4B2A12]">·</span>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B24D] transition inline-flex items-center gap-1"
              >
                <InstagramIcon className="w-3 h-3 text-[#F4B24D]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-[#D9C4A1]/60 gap-2">
            <p>
              Mischief Mall, Ground Floor, K S Rao Road, Mangaluru, Karnataka
            </p>
            <p>
              © {new Date().getFullYear()} Royal Gazebo Restaurant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
