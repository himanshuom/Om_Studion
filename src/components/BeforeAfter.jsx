import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPosition(parseFloat(e.target.value));
  };

  return (
    <section id="before-after" className="py-24 bg-secondary-bg overflow-hidden border-t border-border-color/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Retouching Showcase
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            The Magic of Post-Processing
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
          <p className="text-sm text-secondary-text max-w-lg mx-auto mt-6 leading-relaxed">
            Every photo we capture goes through meticulous hand-retouching. Drag the slider to compare the flat camera RAW format against our finished high-end color grading.
          </p>
        </div>

        {/* Interactive Slider Box */}
        <div className="max-w-3xl mx-auto relative select-none">
          <div
            ref={containerRef}
            className="relative h-[480px] w-full rounded-sm overflow-hidden border border-border-color shadow-luxury bg-neutral-900"
          >
            {/* After (Full Bottom Image) */}
            <img
              src="/images/after.png"
              alt="Retouched Bride Portrait"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute right-4 bottom-4 z-10 bg-gold-accent text-primary-bg px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest shadow-md">
              Fine-Art Edit
            </div>

            {/* Before (Clipped Top Image) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden z-10"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src="/images/before.png"
                alt="Raw Bride Portrait"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
                loading="lazy"
              />
              <div className="absolute left-4 bottom-4 z-10 bg-neutral-900 text-white border border-neutral-800 px-3.5 py-1 text-[10px] uppercase font-bold tracking-widest shadow-md">
                Original RAW
              </div>
            </div>

            {/* Drag Handle Divider */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gold-accent z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-bg border-2 border-gold-accent flex items-center justify-center text-gold-accent shadow-luxury cursor-ew-resize">
                <MoveHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Range Input Overlay */}
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Before and After Image Slider"
            />
          </div>
          
          {/* Quick tips */}
          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-tertiary-text">
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <span>Slide left or right to inspect skin textures, dynamic ranges, and color details.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
