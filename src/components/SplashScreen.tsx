import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  splashStage: 'intro' | 'travel' | 'done';
  onStageChange: (stage: 'intro' | 'travel' | 'done') => void;
  logoAnchorRef: React.RefObject<HTMLDivElement | null>;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  splashStage,
  onStageChange,
  logoAnchorRef,
}) => {
  const [targetRect, setTargetRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // Check session storage or reduced motion on mount
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('rg_splash_shown') === 'true';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNoSplash = window.location.search.includes('nosplash');

    if (hasSeenSplash || prefersReducedMotion || isNoSplash || splashStage === 'done') {
      onStageChange('done');
      return;
    }

    // Sequence timings
    // 0 - 2.0s: Intro & brand hold
    const holdTimer = setTimeout(() => {
      // Measure navbar target rect right before travelling
      if (logoAnchorRef.current) {
        const rect = logoAnchorRef.current.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width || 56,
          height: rect.height || 56,
        });
      } else {
        // Fallback dimensions if ref not yet attached
        setTargetRect({
          top: 14,
          left: 24,
          width: 56,
          height: 56,
        });
      }
      onStageChange('travel');
    }, 2000);

    // 2.0s - 3.1s: Travel to navbar
    const doneTimer = setTimeout(() => {
      onStageChange('done');
      sessionStorage.setItem('rg_splash_shown', 'true');
    }, 3100);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [logoAnchorRef, onStageChange]);

  const handleSkip = () => {
    sessionStorage.setItem('rg_splash_shown', 'true');
    onStageChange('done');
  };

  if (splashStage === 'done') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none">
      {/* Background layer */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: splashStage === 'travel' ? 0 : 1,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[#0B0704] pointer-events-auto"
      >
        {/* Soft Gold Ambient Glow centered */}
        <AnimatePresence>
          {splashStage === 'intro' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-[#F4B24D]/30 to-[#D18B2C]/10 blur-[80px]"
            />
          )}
        </AnimatePresence>

        {/* Minimal skip button for fast access */}
        <button
          onClick={handleSkip}
          className="absolute top-5 right-5 text-[11px] font-mono tracking-widest text-[#D9C4A1]/60 hover:text-[#F4B24D] px-3 py-1.5 rounded-full border border-[#F4B24D]/20 hover:border-[#F4B24D]/50 transition-colors uppercase pointer-events-auto"
        >
          Skip Intro
        </button>
      </motion.div>

      {/* The Travelling Logo Element */}
      <motion.div
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: 190,
          height: 190,
          opacity: 0,
          scale: 0.88,
        }}
        animate={
          splashStage === 'intro'
            ? {
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                width: typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 200,
                height: typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 200,
                opacity: 1,
                scale: 1,
              }
            : targetRect
            ? {
                top: targetRect.top,
                left: targetRect.left,
                x: 0,
                y: 0,
                width: targetRect.width,
                height: targetRect.height,
                opacity: 1,
                scale: 1,
              }
            : {
                top: 14,
                left: 24,
                x: 0,
                y: 0,
                width: 56,
                height: 56,
                opacity: 1,
                scale: 1,
              }
        }
        transition={{
          opacity: { duration: 0.8, ease: 'easeOut' },
          scale: { duration: 0.9, ease: 'easeOut' },
          top: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          left: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          width: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          height: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          x: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          position: 'fixed',
          zIndex: 60,
        }}
        className="flex items-center justify-center pointer-events-none"
      >
        <img
          src="/images/royal_gazebo_logo.png"
          alt="Royal Gazebo Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_24px_rgba(244,178,77,0.45)]"
        />
      </motion.div>
    </div>
  );
};
