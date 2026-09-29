import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../config/restaurant';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemsCount,
    subtotal,
    hasItemsWithPriceOnRequest,
    generateWhatsAppUrl,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleProceedToWhatsApp = useCallback(() => {
    const url = generateWhatsAppUrl();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [generateWhatsAppUrl]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Cart"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-[#0B0704]/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Container (right-aligned on desktop, full-width/bottom on mobile) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#1A0E06] border-l border-[#F4B24D]/25 shadow-2xl flex flex-col z-10"
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F4B24D]/20 bg-[#24150A]/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#F6E6C9] leading-tight">
                    YOUR CART
                  </h2>
                  <p className="text-[10px] text-[#D9C4A1]/80 font-mono">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-[#D9C4A1]/60 hover:text-red-400 transition uppercase tracking-wider px-2 py-1 rounded hover:bg-[#1A0E06]"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close cart"
                  className="p-1.5 rounded-full text-[#D9C4A1] hover:text-[#F4B24D] hover:bg-[#1A0E06] transition border border-transparent hover:border-[#F4B24D]/30"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Content: Empty State or Items List */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#24150A] border border-[#F4B24D]/25 flex items-center justify-center text-[#F4B24D]/50 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#F6E6C9] mb-1">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#D9C4A1] max-w-xs mb-6 leading-relaxed">
                  Explore our authentic menu and add your favourite dishes to create your order.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] text-xs font-bold uppercase tracking-wider shadow-gold-sm hover:brightness-110 active:scale-95 transition"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#0B0704]" />
                  <span>Explore Menu</span>
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Items List */}
                <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#F4B24D]/10">
                  {items.map(({ item, quantity }) => {
                    const lineTotal = item.numericPrice
                      ? item.numericPrice * quantity
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3 group"
                      >
                        {/* Item Details */}
                        <div className="flex-1 min-w-0 pr-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            {/* Veg / Non-Veg Indicator */}
                            <span
                              title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                              className={`flex-shrink-0 w-3 h-3 rounded-sm border ${
                                item.isVeg ? 'border-emerald-500' : 'border-red-500'
                              } flex items-center justify-center p-0.5`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                              />
                            </span>

                            <h4 className="font-serif text-sm font-semibold text-[#F6E6C9] truncate">
                              {item.name}
                            </h4>
                          </div>

                          {/* Unit price & total */}
                          <div className="text-xs text-[#D9C4A1]/80 font-mono pl-4.5">
                            {item.numericPrice ? (
                              <span>
                                ₹{item.numericPrice} × {quantity} ={' '}
                                <strong className="text-[#F4B24D] font-bold">
                                  ₹{lineTotal}
                                </strong>
                              </span>
                            ) : (
                              <span className="text-[#F4B24D] italic">
                                Price on request
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Stepper */}
                          <div className="flex items-center bg-[#0B0704] border border-[#F4B24D]/35 rounded-full px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs font-bold text-[#F6E6C9] min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-[#F4B24D] hover:bg-[#24150A] active:scale-90 transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="p-1.5 text-[#D9C4A1]/40 hover:text-red-400 hover:bg-[#24150A] rounded-full transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cart Footer: Subtotal and WhatsApp CTA */}
                <div className="border-t border-[#F4B24D]/25 bg-[#24150A] p-5 space-y-4">
                  {/* Subtotal calculation */}
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#D9C4A1] font-medium">
                        Subtotal
                      </span>
                      <div className="text-right">
                        <span className="font-mono text-xl sm:text-2xl font-bold text-gold-gradient">
                          ₹{subtotal.toFixed(2)}
                        </span>
                        {hasItemsWithPriceOnRequest && (
                          <div className="text-[10px] text-[#F4B24D] italic">
                            + items with price on request
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#D9C4A1]/70 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F4B24D]" />
                      <span>
                        Verified menu prices. Final availability and delivery charges confirmed on WhatsApp.
                      </span>
                    </div>
                  </div>

                  {/* Proceed to WhatsApp Button */}
                  <button
                    onClick={handleProceedToWhatsApp}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-gold-md hover:brightness-110 active:scale-[0.98] transition"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0B0704] fill-[#0B0704]" />
                    <span>PROCEED TO WHATSAPP</span>
                    <ArrowRight className="w-4 h-4 text-[#0B0704]" />
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] text-[#D9C4A1]/60">
                      Sending directly to Royal Gazebo: {RESTAURANT_INFO.phoneDisplay}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
