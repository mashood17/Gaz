import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { MENU_CATEGORIES, MenuItem } from '../data/menuData';
import { RESTAURANT_INFO } from '../config/restaurant';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  getItemQuantity: (itemId: string) => number;
  addToCart: (item: MenuItem) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  hasItemsWithPriceOnRequest: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  generateWhatsAppUrl: () => string;
  generateOrderSummaryText: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'royal_gazebo_cart_v2';

// Flatten all menu items for fast lookup during cart restoration
const allMenuItems: MenuItem[] = MENU_CATEGORIES.flatMap((c) => c.items);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const validItems: CartItem[] = [];
            for (const entry of parsed) {
              if (
                entry &&
                entry.item &&
                entry.item.id &&
                typeof entry.quantity === 'number' &&
                entry.quantity > 0
              ) {
                // Find latest item data from menu data source
                const latestItem = allMenuItems.find((i) => i.id === entry.item.id) || entry.item;
                validItems.push({
                  item: latestItem,
                  quantity: Math.min(entry.quantity, 99),
                });
              }
            }
            setItems(validItems);
          }
        }
      }
    } catch (err) {
      console.warn('Could not restore cart from storage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage on state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      }
    } catch (err) {
      console.warn('Could not save cart to storage:', err);
    }
  }, [items, isLoaded]);

  // Total quantity count (sum of all items)
  const totalItemsCount = useMemo(() => {
    return items.reduce((sum, ci) => sum + ci.quantity, 0);
  }, [items]);

  // Subtotal in Rupees (calculates items with numericPrice)
  const subtotal = useMemo(() => {
    return items.reduce((sum, ci) => {
      const price = ci.item.numericPrice || 0;
      return sum + price * ci.quantity;
    }, 0);
  }, [items]);

  // Check if any cart item has 'Price on request'
  const hasItemsWithPriceOnRequest = useMemo(() => {
    return items.some((ci) => !ci.item.numericPrice);
  }, [items]);

  // Get quantity for a specific item
  const getItemQuantity = useCallback(
    (itemId: string) => {
      const found = items.find((ci) => ci.item.id === itemId);
      return found ? found.quantity : 0;
    },
    [items]
  );

  // Add item to cart
  const addToCart = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: Math.min(ci.quantity + 1, 99) } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  }, []);

  // Update item quantity by delta (+1 or -1)
  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === itemId);
      if (!existing) return prev;

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((ci) => ci.item.id !== itemId);
      }
      return prev.map((ci) =>
        ci.item.id === itemId ? { ...ci, quantity: Math.min(newQty, 99) } : ci
      );
    });
  }, []);

  // Remove item completely
  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  }, []);

  // Clear all cart items
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Generate plain text order message for WhatsApp
  const generateOrderSummaryText = useCallback(() => {
    if (items.length === 0) return '';

    const lines = [
      'Hello Royal Gazebo Restaurant,',
      'I would like to place the following order:',
      '',
    ];

    items.forEach(({ item, quantity }) => {
      const lineCost = item.numericPrice
        ? `₹${item.numericPrice * quantity}`
        : 'Price on request';
      lines.push(`• ${item.name} × ${quantity} — ${lineCost}`);
    });

    lines.push('');
    const subtotalText = `Subtotal: ₹${subtotal}${
      hasItemsWithPriceOnRequest ? ' (+ items on request)' : ''
    }`;
    lines.push(subtotalText);
    lines.push('');
    lines.push('Please confirm availability and delivery details.');
    lines.push('Thank you!');

    return lines.join('\n');
  }, [items, subtotal, hasItemsWithPriceOnRequest]);

  // Generate complete WhatsApp URL
  const generateWhatsAppUrl = useCallback(() => {
    const message = generateOrderSummaryText();
    return `https://wa.me/918792132211?text=${encodeURIComponent(message)}`;
  }, [generateOrderSummaryText]);

  const value = useMemo(
    () => ({
      items,
      getItemQuantity,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      subtotal,
      hasItemsWithPriceOnRequest,
      isCartOpen,
      setIsCartOpen,
      generateWhatsAppUrl,
      generateOrderSummaryText,
    }),
    [
      items,
      getItemQuantity,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalItemsCount,
      subtotal,
      hasItemsWithPriceOnRequest,
      isCartOpen,
      generateWhatsAppUrl,
      generateOrderSummaryText,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
