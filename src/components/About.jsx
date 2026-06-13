import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Compass, Camera, Sparkles } from 'lucide-react';

const stats = [
  { target: 30, suffix: '+', label: 'Years of Experience' },
  { target: 2500, suffix: '+', label: 'Photoshoots Completed' },
  { target: 8000, suffix: '+', label: 'Frames Handcrafted' },
  { target: 99, suffix: '%', label: 'Satisfaction Rate' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const end = parseInt(target);
    if (start === end) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const rate = Math.min(progress / duration, 1);
      
      // Ease out quad formula
      const easedRate = rate * (2 - rate);
      
      setCount(Math.floor(easedRate * (end - start) + start));

      if (rate < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gold-accent">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-primary-bg overflow-hidden spotlight-glow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2"
          >
            Our Story
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4"
          >
            Crafting Visual Masterpieces Since 1996
          </motion.h2>
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block w-16 h-[2px] bg-gold-accent"
          />
        </div>

        {/* Narrative & Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden border border-border-color shadow-luxury bg-[#151515]">
              <img
                src="/images/dharmendra.jpg"
                alt="Dharmendra Kumar - Founder & Master Photographer at OM Studio"
                className="w-full h-[450px] object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Absolute offset design card */}
            <div className="absolute -bottom-6 -right-6 -z-10 w-full h-full border-2 border-gold-accent/25 rounded-sm" />
            
            {/* Floating Experience Bubble */}
            <div className="absolute -top-6 -left-6 bg-gold-accent text-primary-bg px-6 py-4 rounded-sm shadow-luxury flex items-center gap-3">
              <Camera className="w-8 h-8" />
              <div>
                <p className="font-serif text-xl font-bold leading-none">Est. 1996</p>
                <p className="text-[10px] tracking-wider uppercase font-semibold opacity-90 mt-1">30 Years of Craft</p>
              </div>
            </div>
          </motion.div>

          {/* Narrative Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h3 className="font-serif text-2xl font-semibold text-primary-text">
              Our Legacy, Your Memories.
            </h3>
            <p className="text-secondary-text text-sm md:text-base leading-relaxed">
              OM Studio was established in 1996 by our founding master photographer, <strong>Dharmendra Kumar</strong>. For three decades, he has worked tirelessly, capturing precious milestones and crafting custom frames for the community of Dumraon, Buxar. What began as a traditional film darkroom—carefully processing rolls from vintage cameras—has evolved into a state-of-the-art digital photography and print customization hub.
            </p>
            <p className="text-secondary-text text-sm md:text-base leading-relaxed">
              To honor this lifelong dedication, his son, Himanshu Kumar, created this online platform to bring Dharmendra's craftsmanship directly to you. We've simplified ordering and custom design options so anyone can easily book photoshoots, order custom mug/t-shirt print designs, or request museum-grade framing.
            </p>

            {/* Core Values Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent flex-shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary-text mb-1">State-of-art Gear</h4>
                  <p className="text-xs text-tertiary-text leading-relaxed">Ultra high-res sensors & premium prime glass.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary-text mb-1">Artistic Vision</h4>
                  <p className="text-xs text-tertiary-text leading-relaxed">Natural lighting and candid storytelling.</p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-primary-text mb-1">Museum Printings</h4>
                  <p className="text-xs text-tertiary-text leading-relaxed">Acid-free papers & gold-leaf wooden frames.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-20 border-t border-b border-border-color py-10 bg-secondary-bg/50 px-6 rounded-sm"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-1.5">
              <Counter target={stat.target} suffix={stat.suffix} />
              <span className="text-xs font-semibold text-secondary-text uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
