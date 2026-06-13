import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Work' },
  { id: 'events', name: 'Events' },
  { id: 'portraits', name: 'Portraits' },
  { id: 'passport', name: 'Passport' },
  { id: 'frames', name: 'Frames' },
];

const portfolioItems = [
  {
    id: 17,
    category: 'portraits',
    image: '/images/portrait_pink_kurta.jpg',
    title: 'Blush Elegance',
    subtitle: 'Studio portrait in traditional pastel pink kurta',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 18,
    category: 'portraits',
    image: '/images/portrait_pool_family.jpg',
    title: 'Poolside Joy',
    subtitle: 'Candid lifestyle shot of father & daughter',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 19,
    category: 'portraits',
    image: '/images/portrait_black_kurta.jpg',
    title: 'Monochrome Motif',
    subtitle: 'Traditional black printed kurta portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 20,
    category: 'events',
    image: '/images/event_waterpark.jpg',
    title: 'Water Park Fiesta',
    subtitle: 'Thrills and laughs on the water slides',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 21,
    category: 'events',
    image: '/images/event_anniversary.jpg',
    title: 'Golden Anniversary',
    subtitle: '25th wedding anniversary cake cutting ceremony',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 2,
    category: 'portraits',
    image: '/images/portrait_bw1.jpg',
    title: 'Classic Noir',
    subtitle: 'Monochrome studio portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 3,
    category: 'portraits',
    image: '/images/portrait_full.jpg',
    title: 'Minimalist Silhouette',
    subtitle: 'Outdoor editorial session',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 4,
    category: 'portraits',
    image: '/images/portrait_fashion.jpg',
    title: 'Crimson Elite',
    subtitle: 'Bespoke fashion studio headshot',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 5,
    category: 'frames',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
    title: 'Canvas Block Gallery',
    subtitle: 'Living room interior showcase',
    gridSpan: 'md:col-span-2 h-[240px]',
  },
  {
    id: 8,
    category: 'portraits',
    image: '/images/portrait_bw2.jpg',
    title: 'Bespoke Shadows',
    subtitle: 'Fine art dark close-up portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 9,
    category: 'passport',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    title: 'Biometric Compliant',
    subtitle: 'High-contrast studio ID portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 10,
    category: 'portraits',
    image: '/images/shiva_shoot.jpg',
    title: 'Divine Backdrop',
    subtitle: 'Editorial portrait session, Dumraon',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 11,
    category: 'portraits',
    image: '/images/photographer.jpg',
    title: 'The Master at Work',
    subtitle: 'Dharmendra Kumar behind the lens',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 12,
    category: 'events',
    image: '/images/event_stars.jpg',
    title: 'Starry Night Gala',
    subtitle: 'Candid event portrait at Dumraon',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 13,
    category: 'events',
    image: '/images/event_candid.jpg',
    title: 'Candid Celebrations',
    subtitle: 'Corporate celebration guest portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 14,
    category: 'events',
    image: '/images/event_kurta.jpg',
    title: 'Dandiya Beats',
    subtitle: 'Traditional festival coverage, Buxar',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 15,
    category: 'portraits',
    image: '/images/bike_shoot.jpg',
    title: 'Classic Ride',
    subtitle: 'Outdoor custom rider portrait',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
  {
    id: 16,
    category: 'portraits',
    image: '/images/outdoor_sunset.jpg',
    title: 'Golden Hour Serenade',
    subtitle: 'Candid outdoor portrait at sunset',
    gridSpan: 'md:col-span-1 h-[240px]',
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);

  const filteredItems = filter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === filter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setZoomScale(1);
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  const handleZoom = (e, type) => {
    e.stopPropagation();
    if (type === 'in') {
      setZoomScale(prev => Math.min(prev + 0.25, 2));
    } else {
      setZoomScale(prev => Math.max(prev - 0.25, 1));
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-primary-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Portfolio
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            A Glimpse of Memories Captured
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id);
                setZoomScale(1);
              }}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer ${
                filter === cat.id
                  ? 'bg-gold-accent text-primary-bg shadow-md'
                  : 'bg-secondary-bg hover:bg-gold-accent/10 text-secondary-text hover:text-gold-accent border border-border-color'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Mosaic Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setLightboxIndex(index)}
                className={`relative group rounded-sm overflow-hidden border border-border-color/50 cursor-pointer shadow-sm hover:shadow-luxury ${item.gridSpan}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-gold-accent uppercase mb-1">
                    {item.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            {/* Background click close */}
            <div className="absolute inset-0" onClick={() => setLightboxIndex(null)} />
            
            {/* Control Bar (Top) */}
            <div className="absolute top-4 left-6 right-6 flex items-center justify-between z-10 text-white select-none">
              <div className="flex flex-col text-left">
                <h4 className="font-serif text-lg font-semibold text-white">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-xs text-neutral-400">
                  {filteredItems[lightboxIndex].subtitle}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleZoom(e, 'in')}
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold-accent rounded-sm text-neutral-300 hover:text-gold-accent transition-colors cursor-pointer"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={(e) => handleZoom(e, 'out')}
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-gold-accent rounded-sm text-neutral-300 hover:text-gold-accent transition-colors cursor-pointer"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 bg-neutral-900 hover:bg-gold-accent border border-neutral-800 hover:border-gold-accent rounded-sm text-neutral-300 hover:text-primary-bg transition-colors cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 bg-neutral-900/60 hover:bg-gold-accent border border-neutral-800 hover:border-gold-accent rounded-sm text-white hover:text-primary-bg flex items-center justify-center transition-all duration-300 z-10 cursor-pointer"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image Viewer */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden z-0 select-none"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain transition-transform duration-300 rounded-sm"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 bg-neutral-900/60 hover:bg-gold-accent border border-neutral-800 hover:border-gold-accent rounded-sm text-white hover:text-primary-bg flex items-center justify-center transition-all duration-300 z-10 cursor-pointer"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counters (Bottom) */}
            <div className="absolute bottom-6 text-xs text-neutral-400 font-medium tracking-widest z-10">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
