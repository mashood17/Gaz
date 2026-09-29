import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown, Check, Clock, Sparkles } from 'lucide-react';
import type { MenuItem } from '../data/menuData';

interface MenuItemRowProps {
  item: MenuItem;
  quantity: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
}

export const MenuItemRow: React.FC<MenuItemRowProps> = ({
  item,
  quantity,
  isExpanded,
  onToggleExpand,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <article
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? 'bg-[#24150A] border-[#F4B24D]/45 shadow-gold-sm'
          : 'bg-[#1A0E06]/80 border-[#F4B24D]/15 hover:border-[#F4B24D]/40 hover:bg-[#24150A]/70'
      }`}
    >
      {/* Main Collapsed Row */}
      <div
        onClick={onToggleExpand}
        className="px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
      >
        {/* Left: Indicator, Title, Badge, Chevron */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Veg / Non-Veg Indicator */}
          <span
            title={item.isVeg ? 'Vegetarian Dish' : 'Non-Vegetarian Dish'}
            className={`flex-shrink-0 w-3.5 h-3.5 rounded-sm border ${
              item.isVeg ? 'border-emerald-500' : 'border-red-500'
            } flex items-center justify-center p-0.5`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          </span>

          {/* Dish Name */}
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-[#F6E6C9] leading-snug group-hover:text-[#F4B24D] transition-colors truncate">
              {item.name}
            </h3>

            {item.badge && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-[#0B0704] text-[#F4B24D] border border-[#F4B24D]/25">
                {item.badge}
              </span>
            )}
          </div>

          {/* Subtle Indicator for Details Expand */}
          <button
            type="button"
            aria-label={isExpanded ? 'Collapse details' : 'Expand dish details'}
            className="text-[#D9C4A1]/40 hover:text-[#F4B24D] p-0.5 transition-transform"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isExpanded ? 'rotate-180 text-[#F4B24D]' : ''
              }`}
            />
          </button>
        </div>

        {/* Right: Price & Compact Action */}
        <div
          className="flex items-center gap-3 sm:gap-4 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Price */}
          <div className="text-right">
            <span className="font-mono text-sm sm:text-base font-bold text-[#F4B24D] whitespace-nowrap">
              {item.price}
            </span>
          </div>

          {/* Compact Add or Stepper */}
          {quantity === 0 ? (
            <button
              onClick={onAddToCart}
              aria-label={`Add ${item.name} to cart`}
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#24150A] hover:bg-[#F4B24D] text-[#F4B24D] hover:text-[#0B0704] border border-[#F4B24D]/40 text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-[#0B0704] border border-[#F4B24D]/60 rounded-full px-1.5 py-0.5 shadow-sm">
              <button
                onClick={() => onUpdateQuantity(-1)}
                aria-label={`Decrease ${item.name} quantity`}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono text-xs font-bold text-[#F6E6C9] min-w-[18px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(1)}
                aria-label={`Increase ${item.name} quantity`}
                className="w-5 h-5 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Accordion Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-[#F4B24D]/15 bg-[#1A0E06]/90 text-left space-y-3">
              {/* Description (if available) */}
              {item.description ? (
                <p className="text-xs sm:text-sm text-[#D9C4A1] leading-relaxed">
                  {item.description}
                </p>
              ) : null}

              {/* Verified Badges & Dietary Meta */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {/* Veg / Non-Veg badge */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border ${
                    item.isVeg
                      ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300'
                      : 'border-red-500/40 bg-red-950/40 text-red-300'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.isVeg ? 'bg-emerald-400' : 'bg-red-400'
                    }`}
                  />
                  {item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                </span>

                {item.timing && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#0B0704] text-[#F4B24D] border border-[#F4B24D]/25">
                    <Clock className="w-3 h-3" />
                    {item.timing}
                  </span>
                )}

                {item.badge && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#24150A] text-[#F7C875] border border-[#F7C875]/30">
                    <Sparkles className="w-3 h-3" />
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Action row inside expanded view */}
              <div className="pt-2 flex items-center justify-between border-t border-[#F4B24D]/10">
                <span className="text-[11px] text-[#D9C4A1]/70">
                  {quantity > 0 ? (
                    <span className="text-[#F4B24D] font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      In cart: {quantity} {quantity === 1 ? 'portion' : 'portions'}
                    </span>
                  ) : (
                    'Tap to add to WhatsApp order'
                  )}
                </span>

                {quantity === 0 ? (
                  <button
                    onClick={onAddToCart}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] text-xs font-bold uppercase tracking-wider shadow-gold-sm hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#F4B24D]">
                      {item.numericPrice ? `₹${item.numericPrice * quantity}` : ''}
                    </span>
                    <div className="flex items-center bg-[#0B0704] border border-[#F4B24D]/60 rounded-full px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(-1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-[#F6E6C9] min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
