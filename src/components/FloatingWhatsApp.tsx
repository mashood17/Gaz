import React from 'react';
import { MessageSquare } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Order and Delivery Assistance" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30">
      <a
        href={RESTAURANT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp - Royal Gazebo Delivery"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1A0E06] border border-[#F4B24D]/50 text-[#F6E6C9] shadow-gold-md hover:shadow-gold-lg hover:border-[#F4B24D] hover:bg-[#24150A] transition-all duration-300 hover:scale-105"
      >
        {/* Pulsing Aura */}
        <span className="absolute inset-0 rounded-full bg-[#F4B24D]/20 animate-ping pointer-events-none" />

        <div className="relative w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-sm flex-shrink-0">
          <MessageSquare className="w-4 h-4 fill-white" />
        </div>

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#F4B24D] leading-tight">
            Home Delivery
          </span>
          <span className="text-xs font-semibold text-[#F6E6C9] leading-tight">
            Order on WhatsApp
          </span>
        </div>
      </a>
    </aside>
  );
};
