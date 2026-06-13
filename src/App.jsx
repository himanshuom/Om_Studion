import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

// Import Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import FrameShowcase from './components/FrameShowcase';
import BeforeAfter from './components/BeforeAfter';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [darkMode, setDarkMode] = useState(true); // Default to Dark Theme
  const [isLoading, setIsLoading] = useState(true);

  // Sync theme with HTML class list
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle fake luxury preloading transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      {/* Luxury Page Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#070707] flex flex-col items-center justify-center gap-6"
          >
            {/* Spinning Gold Shutter with Logo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
              className="relative w-36 h-36 mb-4 flex items-center justify-center"
            >
              <img
                src="/images/logo.png"
                alt="OM Studio Logo"
                className="w-32 h-32 object-contain brightness-110 drop-shadow-lg"
              />
              <div className="absolute -inset-4 rounded-full border border-t-gold-accent border-r-transparent border-b-transparent border-l-transparent animate-spin duration-1500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen flex flex-col justify-between"
        >
          {/* Header Navigation */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Page Sections */}
          <main className="flex-grow">
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <FrameShowcase />
            <BeforeAfter />
            <Pricing />
            <Testimonials />
            <BookingSection />
          </main>

          {/* Footer Coordinates */}
          <Footer />

          {/* Overlay Floating Helpers */}
          <WhatsAppButton />
          <ScrollToTop />
        </motion.div>
      )}
    </>
  );
}
