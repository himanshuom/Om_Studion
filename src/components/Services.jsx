import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Gift, CreditCard, Printer, Frame, Sparkles, Users, Briefcase, Eye, X } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Collage Frames',
    icon: Frame,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Bespoke multi-photo layouts framed together to tell a beautiful story.',
    longDesc: 'Design a story wall with our bespoke collage frames. We help you arrange, print, and matte multiple family, wedding, or travel memories into a single, hand-crafted designer layout.',
    deliverables: ['Custom configurations (3 to 15 photos in one layout)', 'Premium wood matting and separator borders', 'Museum-grade non-glare glass coating', 'Free layout design consultation with our experts'],
    startingPrice: '₹800'
  },
  {
    id: 2,
    title: 'Pre-Wedding Shoot',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Cinematic couples outdoor shoots in bespoke dream destinations.',
    longDesc: 'Celebrate your courtship with a beautiful visual story. We plan concept shoots at picturesque architectural ruins, beaches, or private studio locations, focusing on your unique couple chemistry.',
    deliverables: ['4-hour shoot at up to 2 locations', '3 custom dress changes', '35 fully retouched high-res portraits', 'Music-backed pre-wedding video slide'],
    startingPrice: '₹10,000'
  },
  {
    id: 3,
    title: 'Event Photography',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Professional visual coverage for gala shows, conferences, and exhibitions.',
    longDesc: 'High-quality photography for seminars, panel discussions, and stage events. We capture high-contrast closeups, panel sessions, crowd engagement, and key branding deliverables.',
    deliverables: ['Hourly or full-day coverage packages', 'Quick 24-hour digital delivery for PR/press', 'Raw files (upon request) and edited highlights', 'Branding logo watermark integration'],
    startingPrice: '₹5,000'
  },
  {
    id: 4,
    title: 'Birthday Photography',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Vibrant and joyful captures of birthday celebrations, cakes, and games.',
    longDesc: 'From first-birthday milestones to theme parties, we ensure the laughs and decorations are beautifully documented. Includes customized kids portraits and candid event coverage.',
    deliverables: ['3-hour candid and formal coverage', 'Decor and table details focus', '60 edited high-resolution pictures', 'Online sharable digital album'],
    startingPrice: '₹3,000'
  },
  {
    id: 5,
    title: 'Passport & Visa Photos',
    icon: CreditCard,
    image: '/images/portrait_fashion.jpg',
    shortDesc: 'Biometric compliant photos with instant printing and soft copies.',
    longDesc: 'Get professional passport, visa, and corporate identification photos. Guaranteed compliance with international passport standards (US, UK, Schengen, etc.) using professional lighting.',
    deliverables: ['12 high-grade premium prints (copies)', 'Compliant digital soft-copy sent to email', 'Slight retouching to fix stray hairs or blemishes', 'Instant 10-minute turnaround'],
    startingPrice: '₹100'
  },
  {
    id: 6,
    title: 'Instant Photo Printing',
    icon: Printer,
    image: 'https://images.unsplash.com/photo-1488330890490-c291ecf62571?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'High-speed printing on gloss, matte, or luxury satin papers.',
    longDesc: 'We use professional dye-sublimation and fine art inkjet printers to bring your digital snaps to life. Enjoy premium paper weights and smudge-free archival prints.',
    deliverables: ['Available in 4x6, 5x7, A4, and A3 formats', 'Dye-sublimation fade-resistant inks', 'Instant printing at the counter', 'Custom border configurations'],
    startingPrice: '₹150'
  },
  {
    id: 7,
    title: 'Custom Photo Frames',
    icon: Frame,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Handcrafted custom wood, canvas, and acrylic framings.',
    longDesc: 'Protect your memories with museum-grade frames. We build customized structures in Teak wood, premium sleek Acrylic borders, canvas block wraps, and traditional gold-filigree borders.',
    deliverables: ['Bespoke sizes (4x6 inches up to 4x6 feet)', 'Anti-reflective art glass options', 'Acid-free mount boards for protection', 'Heavy-duty hanging fixtures included'],
    startingPrice: '₹300'
  },
  {
    id: 8,
    title: 'Old Photos Restoration',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop',
    shortDesc: 'Repairing vintage family photos, digital colorization, and color restoration.',
    longDesc: 'Bring vintage, faded, or torn family photos back to life. Our restoration wizards reconstruct details, remove scratches, correct faded colors, and perform premium beauty/glamour retouches.',
    deliverables: ['High-res digital file of restored picture', 'Before vs After comparison preview', 'Colorization of black-and-white vintage photos', 'Professional cosmetic skin retouching'],
    startingPrice: '₹500'
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-24 bg-secondary-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            What We Do
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Bespoke Creative Services
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative bg-primary-bg border border-border-color rounded-sm overflow-hidden shadow-sm hover:shadow-luxury hover:border-gold-accent/40 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary-bg/90 flex items-center justify-center text-gold-accent shadow-md backdrop-blur-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary-text mb-3 group-hover:text-gold-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-secondary-text leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border-color/50 pt-4 mt-auto">
                    <span className="text-xs text-tertiary-text">
                      Starts at <strong className="text-gold-accent font-semibold">{service.startingPrice}</strong>
                    </span>
                    
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-bold uppercase tracking-wider text-primary-text group-hover:text-gold-accent flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Learn More</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl glass rounded-sm overflow-hidden shadow-luxury border border-card-border max-h-[90vh] overflow-y-auto z-10 text-left"
            >
              {/* Graphic Banner */}
              <div className="relative h-48 md:h-56">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-black/30 to-black/60" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/45 hover:bg-gold-accent text-white hover:text-primary-bg flex items-center justify-center transition-all duration-300 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center text-primary-bg font-bold">
                    {React.createElement(selectedService.icon, { className: 'w-5 h-5' })}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-gold-accent tracking-widest mb-2">Description</h4>
                  <p className="text-sm md:text-base text-secondary-text leading-relaxed">
                    {selectedService.longDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-gold-accent tracking-widest mb-3">What is Included</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-secondary-text">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-accent mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-color pt-6 mt-2 gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-tertiary-text block">Package Pricing Starts From</span>
                    <strong className="text-2xl font-serif text-gold-accent font-bold">{selectedService.startingPrice}</strong>
                  </div>
                  
                  <a
                    href="#contact"
                    onClick={() => {
                      setSelectedService(null);
                      // Scroll to contact form
                      setTimeout(() => {
                        const contact = document.querySelector('#contact');
                        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-gold-accent hover:bg-gold-hover text-primary-bg font-bold text-xs uppercase tracking-widest rounded-sm text-center transition-colors shadow-md hover:shadow-luxury"
                  >
                    Request Booking
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
