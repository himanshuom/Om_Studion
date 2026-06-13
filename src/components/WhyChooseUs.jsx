import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Award, Zap, Ruler, Sparkles, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Professional Equipment',
    desc: 'We shoot on high-definition medium format Hasselblad and Sony sensors with specialized GM prime lenses for unmatched details.',
  },
  {
    icon: Sparkles,
    title: 'Experienced Artists',
    desc: 'Our photogs have over a decade of visual experience directing high-end editorials, luxury weddings, and commercial portfolios.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    desc: 'Get your digital passport snaps in 10 minutes and full wedding album proofs delivered online within 14 working days.',
  },
  {
    icon: Ruler,
    title: 'Precision Prints & Frames',
    desc: 'Every wooden and acrylic framing is individually measured and cut to precision in our proprietary wood shop.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer Satisfaction',
    desc: 'We support full image proofing and revision cycles on custom album structures until you are completely in love with the layout.',
  },
  {
    icon: ShieldAlert,
    title: 'Archival Guarantee',
    desc: 'We utilize acid-free mounting sheets and UV-cut glass to ensure your frames resist dampness and color fades.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Why Studio LensCraft
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Uncompromising Standards
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative p-8 bg-secondary-bg border border-border-color hover:border-gold-accent/40 rounded-sm shadow-sm hover:shadow-luxury transition-all duration-500 overflow-hidden text-left"
              >
                {/* Shimmer effect background */}
                <div className="shimmer-effect absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Icon Circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent mb-6 group-hover:bg-gold-accent group-hover:text-primary-bg transition-all duration-500">
                  <IconComponent className="w-5.5 h-5.5" />
                </div>

                {/* Narrative */}
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-bold text-primary-text mb-3 group-hover:text-gold-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Gold corner accent border */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-transparent group-hover:w-4 group-hover:h-4 group-hover:border-gold-accent transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
