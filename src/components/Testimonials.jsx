import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya & Rohan Sharma',
    role: 'Bride & Groom',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'Studio LensCraft made our wedding photos look like a high-end Vogue editorial. The team was incredibly professional, capturing every candid tear and laugh without being intrusive. The custom wood frame we ordered is already hanging in our foyer!'
  },
  {
    id: 2,
    name: 'Aarav Mehta',
    role: 'Corporate Client',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'I ordered three large custom acrylic frames for our new office lobby and got our headshots printed. The diamond-polished finish looks stunning and adds an immediate high-end feel. The service was fast, friendly, and compliant.'
  },
  {
    id: 3,
    name: 'Meera Sen',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    rating: 5,
    text: 'The baby photoshoot session was exceptionally comfortable. The studio was warm, sanitised, and filled with beautiful wooden toys and props. The photographs turned out incredibly sweet. Highly recommend their printing quality!'
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [current]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section id="testimonials" className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Reviews
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Loved by Our Clients
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative px-4 md:px-12 flex flex-col items-center">
          
          {/* Quote Mark background */}
          <div className="absolute -top-10 left-10 md:left-20 text-gold-accent/5 pointer-events-none">
            <Quote className="w-32 h-32 stroke-[1]" />
          </div>

          <div className="w-full min-h-[280px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full text-center flex flex-col items-center gap-6"
              >
                {/* Reviewer Avatar */}
                <div className="relative">
                  <img
                    src={reviews[current].image}
                    alt={reviews[current].name}
                    className="w-20 h-20 rounded-full object-cover border border-gold-accent p-1 bg-primary-bg shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold-accent flex items-center justify-center text-primary-bg">
                    <Quote className="w-3 h-3 fill-current stroke-[3]" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 justify-center">
                  {[...Array(reviews[current].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-gold-accent fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="font-serif text-base md:text-lg lg:text-xl text-primary-text leading-relaxed max-w-2xl font-light italic">
                  "{reviews[current].text}"
                </blockquote>

                {/* Reviewer Bio */}
                <div>
                  <cite className="not-italic text-sm font-bold text-primary-text tracking-wide block">
                    {reviews[current].name}
                  </cite>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-accent mt-0.5 block">
                    {reviews[current].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-10 z-10">
            <button
              onClick={handlePrev}
              className="p-3 bg-secondary-bg hover:bg-gold-accent border border-border-color hover:border-gold-accent rounded-sm text-secondary-text hover:text-primary-bg transition-all duration-300 cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === current ? 'w-6 bg-gold-accent' : 'w-1.5 bg-border-color hover:bg-gold-accent/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 bg-secondary-bg hover:bg-gold-accent border border-border-color hover:border-gold-accent rounded-sm text-secondary-text hover:text-primary-bg transition-all duration-300 cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
