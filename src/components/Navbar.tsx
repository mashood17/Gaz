import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageSquare, UtensilsCrossed, Phone, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../config/restaurant';

interface NavbarProps {
  onOpenMenu: () => void;
  splashStage: 'intro' | 'travel' | 'done';
  logoAnchorRef: React.RefObject<HTMLDivElement | null>;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMenu, splashStage, logoAnchorRef }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for navbar background blur & gold border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'HIGHLIGHTS', href: '#experience' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0704]/92 backdrop-blur-md border-b border-[#F4B24D]/20 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0B0704]/80 via-[#0B0704]/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Title Anchor */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4B24D] rounded-lg"
            >
              {/* Logo Anchor Container: Measures exact dimensions for splash transition */}
              <div
                ref={logoAnchorRef}
                className="relative w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0"
              >
                {/* Logo is shown here once splashStage === 'done' */}
                {splashStage === 'done' && (
                  <img
                    src="/images/royal_gazebo_logo.png"
                    alt="Royal Gazebo Logo"
                    className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(244,178,77,0.25)] transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              {/* Text Brand Title */}
              <div className="flex flex-col">
                <span className="font-serif text-sm sm:text-xl font-bold tracking-wider text-[#F6E6C9] group-hover:text-[#F4B24D] transition-colors leading-tight">
                  ROYAL GAZEBO
                </span>
                <span className="text-[8px] sm:text-[10px] tracking-[0.25em] text-[#F4B24D] font-medium uppercase">
                  RESTAURANT
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-xs font-medium tracking-[0.15em] text-[#D9C4A1] hover:text-[#F4B24D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#F4B24D] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons: Explore Menu & WhatsApp Delivery */}
            <div className="hidden sm:flex items-center gap-3">
              {/* WhatsApp Delivery CTA */}
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#F4B24D]/35 bg-[#24150A]/70 text-[#F6E6C9] hover:border-[#F4B24D] hover:bg-[#24150A] transition text-xs font-semibold tracking-wide shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#F4B24D]" />
                <span>Delivery</span>
              </a>

              {/* Distinct External Menu Button */}
              <button
                onClick={onOpenMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-semibold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition shadow-gold-sm"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#0B0704]" />
                <span>Explore Menu</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex sm:hidden items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="flex items-center gap-1.5 px-3 py-2 text-[#F6E6C9] hover:text-[#F4B24D] rounded-xl bg-[#24150A] border border-[#F4B24D]/40 hover:border-[#F4B24D] transition shadow-gold-sm active:scale-95"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#F4B24D]" />
                ) : (
                  <>
                    <Menu className="w-5 h-5 text-[#F4B24D]" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4B24D]">
                      Menu
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-[#0B0704]/90 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#1A0E06] border-l border-[#F4B24D]/25 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-[#F4B24D]/20">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/royal_gazebo_logo.png"
                      alt="Royal Gazebo Logo"
                      className="w-10 h-10 object-contain"
                    />
                    <div>
                      <div className="font-serif font-bold text-base text-[#F6E6C9]">ROYAL GAZEBO</div>
                      <div className="text-[9px] tracking-widest text-[#F4B24D] uppercase">Restaurant</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                    className="p-2 text-[#D9C4A1] hover:text-[#F4B24D] rounded-full hover:bg-[#24150A]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2 mt-6">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wider text-[#F6E6C9] hover:bg-[#24150A] hover:text-[#F4B24D] transition border border-transparent hover:border-[#F4B24D]/20"
                    >
                      <span>{item.name}</span>
                      <Sparkles className="w-3.5 h-3.5 text-[#F4B24D]/50" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-[#F4B24D]/20 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenMenu();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F7C875] via-[#F4B24D] to-[#D18B2C] text-[#0B0704] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-sm hover:brightness-110 active:scale-98 transition"
                >
                  <UtensilsCrossed className="w-4 h-4 text-[#0B0704]" />
                  <span>EXPLORE OUR MENU</span>
                </button>

                <a
                  href={RESTAURANT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#24150A] border border-[#F4B24D]/40 text-[#F6E6C9] font-medium text-sm flex items-center justify-center gap-2 hover:border-[#F4B24D] transition"
                >
                  <MessageSquare className="w-4 h-4 text-[#F4B24D]" />
                  <span>ORDER ON WHATSAPP</span>
                </a>

                <a
                  href={RESTAURANT_INFO.phoneTel}
                  className="w-full py-2.5 text-center text-xs text-[#D9C4A1] flex items-center justify-center gap-1.5 hover:text-[#F4B24D] transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F4B24D]" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
