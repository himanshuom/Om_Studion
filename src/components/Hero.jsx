import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';

const slides = [
  {
    image: '/images/temple.jpg',
    title: 'OM Studio',
    subtitle: 'Crafting Visual Masterpieces Since 1996 • Dumraon, Buxar',
  },
  {
    image: '/images/photographer.jpg',
    title: 'Handcrafted Framing & Prints',
    subtitle: 'Museum-Grade Wooden, Acrylic, and Canvas Custom Frames',
  },
  {
    image: '/images/portrait_full.jpg',
    title: 'Defining Portrait Excellence',
    subtitle: 'Professional Passport, Visa, and Corporate Shoots with Instant Delivery',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </AnimatePresence>
        
        {/* Luxury Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-black/30 to-black/75 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_85%)] z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left mt-16">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Animated Gold Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="w-12 h-[1px] bg-gold-accent" />
            <span className="text-[11px] font-bold tracking-[0.3em] text-gold-accent uppercase">
              OM STUDIO • SINCE 1996
            </span>
          </motion.div>

          {/* Animated Heading */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
              >
                {slides[current].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Animated Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-xl text-neutral-300 tracking-wide font-light leading-relaxed"
            >
              {slides[current].subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <button
              onClick={() => handleScrollTo('#portfolio')}
              className="px-8 py-4 bg-gold-accent hover:bg-gold-hover text-primary-bg font-semibold text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-luxury hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Portfolio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => handleScrollTo('#contact')}
              className="px-8 py-4 bg-transparent border border-white/20 hover:border-gold-accent text-white hover:text-gold-accent font-semibold text-xs uppercase tracking-widest rounded-sm flex items-center gap-2 transition-all duration-300 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Book a Session</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 right-6 md:right-12 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              index === current ? 'w-8 bg-gold-accent' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
