import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar } from 'lucide-react';

const pricingTiers = [
  {
    title: 'Studio Essentials',
    price: '₹100',
    suffix: 'starting rate',
    desc: 'Instant, compliant biometric passport prints and custom tabletop picture frame layouts.',
    features: [
      'Passport & Visa photos (12 copies for ₹100)',
      'Custom Wooden Frames (from ₹300)',
      'Premium Acrylic Mounts (from ₹900)',
      'Instant color-calibrated printing',
      'Archival matte/gloss papers',
      'Compliant digital soft copies'
    ],
    ctaText: 'Visit Studio',
    highlight: false
  },
  {
    title: 'Celebration Coverage',
    price: '₹3,000',
    suffix: 'starting rate',
    desc: 'Professional photography coverage for birthdays, private dinners, conferences and corporate galas.',
    features: [
      'Birthday Photography (from ₹3,000)',
      'Corporate Event Shoots (from ₹5,000)',
      'High-contrast digital files delivered',
      'Advanced color corrections included',
      'Online proofing gallery access',
      'Quick 48-hour digital delivery'
    ],
    ctaText: 'Inquire Availability',
    highlight: true
  },
  {
    title: 'Signature Weddings',
    price: '₹10,000',
    suffix: 'starting rate',
    desc: 'Bespoke pre-wedding couple stories and grand wedding photojournalism albums.',
    features: [
      'Pre-Wedding Outdoor Shoot (from ₹10,000)',
      'Wedding Day Coverage (from ₹15,000)',
      'Cinematic high-end wedding films',
      'Museum-grade leather photobooks',
      'Multi-day custom package rates',
      'Complimentary framed wall print'
    ],
    ctaText: 'Plan Your Day',
    highlight: false
  }
];

export default function Pricing() {
  const handleScrollToBooking = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
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
    <section id="pricing" className="py-24 bg-secondary-bg border-t border-border-color/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Pricing
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Transparent Rates, Luxury Quality
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col justify-between p-8 rounded-sm border transition-all duration-500 text-left relative ${
                tier.highlight
                  ? 'bg-primary-bg border-gold-accent shadow-luxury'
                  : 'bg-primary-bg/75 border-border-color hover:border-gold-accent/40 shadow-sm'
              }`}
            >
              {/* Highlight ribbon */}
              {tier.highlight && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-gold-accent text-primary-bg text-[9px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Header */}
                <h3 className="font-serif text-xl font-bold text-primary-text mb-2">
                  {tier.title}
                </h3>
                <p className="text-xs text-secondary-text mb-6 min-h-[36px]">
                  {tier.desc}
                </p>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 border-b border-border-color/30 pb-6">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-gold-accent">
                    {tier.price}
                  </span>
                  <span className="text-xs text-tertiary-text font-medium uppercase tracking-wider">
                    {tier.suffix}
                  </span>
                </div>

                {/* Features List */}
                <ul className="flex flex-col gap-4 mb-8">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-secondary-text">
                      <div className="w-4.5 h-4.5 rounded-full bg-gold-accent/15 flex items-center justify-center text-gold-accent flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action button */}
              <a
                href="#contact"
                onClick={handleScrollToBooking}
                className={`w-full py-4 text-center text-xs font-bold uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  tier.highlight
                    ? 'bg-gold-accent hover:bg-gold-hover text-primary-bg hover:shadow-luxury'
                    : 'bg-secondary-bg hover:bg-gold-accent hover:text-primary-bg text-primary-text'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{tier.ctaText}</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
