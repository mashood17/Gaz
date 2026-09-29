import React from 'react';
import { MessageSquare, MapPin, Phone, ArrowUp, UtensilsCrossed } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { RESTAURANT_INFO } from '../config/restaurant';

interface FooterProps {
  onOpenMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenMenu }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Highlights', href: '#experience' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#0B0704] border-t border-[#F4B24D]/25 pt-16 pb-12 overflow-hidden text-[#D9C4A1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#F4B24D]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/images/royal_gazebo_logo.png"
                alt="Royal Gazebo Logo"
                className="w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(244,178,77,0.3)]"
              />
              <div>
                <h3 className="font-serif text-xl font-bold tracking-wider text-[#F6E6C9]">
                  ROYAL GAZEBO
                </h3>
                <p className="text-[10px] tracking-[0.25em] text-[#F4B24D] uppercase font-semibold">
                  RESTAURANT
                </p>
              </div>
            </div>

            <p className="text-sm italic text-[#F4B24D]/90 mb-4 font-serif">
              "{RESTAURANT_INFO.tagline}"
            </p>

            <p className="text-xs text-[#D9C4A1]/80 leading-relaxed max-w-sm mb-6">
              Authentic cuisine, restaurant dining, and a warm, inviting atmosphere at Mischief Mall, Ground Floor, Mangaluru.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Delivery"
                className="w-9 h-9 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#0B0704] transition"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#0B0704] transition"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps Location"
                className="w-9 h-9 rounded-full bg-[#1A0E06] border border-[#F4B24D]/30 flex items-center justify-center text-[#F4B24D] hover:bg-[#F4B24D] hover:text-[#0B0704] transition"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-[#F6E6C9] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#F4B24D] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onOpenMenu}
                  className="flex items-center gap-1.5 text-[#F4B24D] font-semibold hover:text-[#F7C875] transition-colors"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>External Menu</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Details */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-sm font-bold tracking-widest uppercase text-[#F6E6C9] mb-4">
                Location & Enquiries
              </h4>
              <p className="text-xs text-[#D9C4A1] leading-relaxed mb-3">
                {RESTAURANT_INFO.fullAddress}
              </p>
              <p className="text-xs font-semibold text-[#F6E6C9] mb-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F4B24D]" />
                <a href={RESTAURANT_INFO.phoneTel} className="hover:text-[#F4B24D] transition">
                  {RESTAURANT_INFO.phoneDisplay}
                </a>
              </p>
              <p className="text-[11px] text-[#D9C4A1]/70">
                {RESTAURANT_INFO.timingsNotice} · Parking Available
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F4B24D] hover:text-[#F7C875] transition"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D9C4A1]/60 gap-4">
          <p>
            © 2026 {RESTAURANT_INFO.name}. All rights reserved.
          </p>
          <p className="tracking-wide">
            Designed for Royal Gazebo Restaurant · Mangaluru, Karnataka
          </p>
        </div>
      </div>
    </footer>
  );
};
