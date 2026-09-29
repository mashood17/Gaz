import { useState, useRef, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DigitalMenuPage } from './components/DigitalMenuPage';
import { CartProvider } from './context/CartContext';

export function App() {
  // Page routing state driven by URL query parameter ?menu
  const [currentPage, setCurrentPage] = useState<'home' | 'menu'>(() => {
    if (typeof window === 'undefined') return 'home';
    const params = new URLSearchParams(window.location.search);
    return params.has('menu') ? 'menu' : 'home';
  });

  // Splash screen state: if on menu page or previously shown, immediately 'done'
  const [splashStage, setSplashStage] = useState<'intro' | 'travel' | 'done'>(() => {
    if (typeof window === 'undefined') return 'done';
    const params = new URLSearchParams(window.location.search);
    const isMenuPage = params.has('menu');
    const hasSeen = sessionStorage.getItem('rg_splash_shown') === 'true';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isNoSplash = window.location.search.includes('nosplash');
    return isMenuPage || hasSeen || prefersReduced || isNoSplash ? 'done' : 'intro';
  });

  const logoAnchorRef = useRef<HTMLDivElement | null>(null);

  // Synchronize browser history and back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.has('menu')) {
        setCurrentPage('menu');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleStageChange = useCallback((stage: 'intro' | 'travel' | 'done') => {
    setSplashStage(stage);
  }, []);

  // Navigate to dedicated digital menu page (?menu) without page reload
  const navigateToMenu = useCallback(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('menu', '');
      // Clean query string to '?menu' without '='
      const cleanSearch = url.search.replace(/=(?=&|$)/g, '');
      const newUrl = `${window.location.pathname}${cleanSearch}`;
      window.history.pushState({ page: 'menu' }, '', newUrl);
    }
    // Prevent splash replay on menu and set session flag
    sessionStorage.setItem('rg_splash_shown', 'true');
    setSplashStage('done');
    setCurrentPage('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navigate back to homepage
  const navigateToHome = useCallback(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('menu');
      const newUrl = url.search ? `${window.location.pathname}${url.search}` : window.location.pathname;
      window.history.pushState({ page: 'home' }, '', newUrl);
    }
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <CartProvider>
      {currentPage === 'menu' ? (
        <DigitalMenuPage onBackToHome={navigateToHome} />
      ) : (
        <div className="relative min-h-screen bg-[#0B0704] text-[#F6E6C9] font-sans antialiased overflow-x-hidden selection:bg-[#F4B24D]/30 selection:text-[#F4B24D]">
          {/* Signature Cinematic Splash Screen */}
          <SplashScreen
            splashStage={splashStage}
            onStageChange={handleStageChange}
            logoAnchorRef={logoAnchorRef}
          />

          {/* Premium Responsive Navbar */}
          <Navbar
            onOpenMenu={navigateToMenu}
            splashStage={splashStage}
            logoAnchorRef={logoAnchorRef}
          />

          {/* Main Page Content */}
          <main>
            {/* Editorial Hero Section */}
            <HeroSection
              onOpenMenu={navigateToMenu}
              isSplashDone={splashStage === 'done'}
            />

            {/* Narrative About Section */}
            <AboutSection />

            {/* Distinctive Signature Highlights */}
            <ExperienceSection onOpenMenu={navigateToMenu} />

            {/* Visual Food & Ambience Portfolio */}
            <GallerySection />

            {/* Community Feedback & Trust Ratings */}
            <ReviewsSection />

            {/* Location, Hours Notice & Contact Section */}
            <ContactSection onOpenMenu={navigateToMenu} />
          </main>

          {/* Elegant Brand Finish Footer */}
          <Footer onOpenMenu={navigateToMenu} />

          {/* Floating Home Delivery WhatsApp Action */}
          <FloatingWhatsApp />
        </div>
      )}
    </CartProvider>
  );
}

export default App;
