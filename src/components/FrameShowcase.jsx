import React from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, Compass, Info } from 'lucide-react';

const framesData = [
  {
    id: 'wooden',
    title: 'Wooden Frames',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop',
    price: '₹300',
    dimensions: 'Sizes: 4x6" up to 24x36"',
    desc: 'Bespoke hand-cut solid pine and teak wood moldings. Comes with optional acid-free mount boards.',
    features: ['Teak & Pine natural colors', 'Acid-free single/double mounts', 'Premium museum-grade glare-free glass'],
    ctaText: 'Order Custom Frame'
  },
  {
    id: 'acrylic',
    title: 'Acrylic Frames',
    image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=600&auto=format&fit=crop',
    price: '₹900',
    dimensions: 'Sizes: 8x12" up to 30x40"',
    desc: 'Modern borderless glass look. Photographic prints face-mounted onto diamond-polished acrylic sheets.',
    features: ['Borderless clean modern aesthetic', 'Scratch-resistant plexiglass', 'Industrial metal standoff mounts'],
    ctaText: 'Order Custom Frame'
  },
  {
    id: 'mug',
    title: 'Custom Mug Printing',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop',
    price: '₹250',
    dimensions: 'Capacity: 325ml / 11oz',
    desc: 'High-quality ceramic mug printing. Wrap-around vibrant dye sublimation print that is microwave & dishwasher safe.',
    features: ['Premium Grade A white ceramic', 'Microwave & Dishwasher safe', 'High definition sublimation print'],
    ctaText: 'Order Custom Mug'
  },
  {
    id: 'tshirt',
    title: 'Custom T-Shirt Printing',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop',
    price: '₹350',
    dimensions: 'Sizes: S, M, L, XL, XXL',
    desc: 'Fully customizable premium cotton t-shirts. Soft-feel heat transfer or screen prints that survive multiple washes.',
    features: ['100% premium combed cotton', 'Vibrant wash-resistant print colors', 'Unisex regular comfortable fit'],
    ctaText: 'Order Custom T-Shirt'
  },
];

export default function FrameShowcase() {
  const handleOrder = (frameTitle) => {
    const whatsappNumber = '917301336655';
    const text = `Hi OM Studio! I am interested in ordering your custom "${frameTitle}". Can you share the pricing catalog for different sizes?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="frames" className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Custom Framing
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Preserve Your Art in Luxury
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Framing Features Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto text-left">
          <div className="flex items-start gap-4 p-5 rounded-sm bg-secondary-bg border border-border-color/50">
            <ShieldCheck className="w-8 h-8 text-gold-accent flex-shrink-0" />
            <div>
              <h4 className="font-serif text-base font-bold text-primary-text mb-1.5">Archival Quality</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                Acid-free backing cards and mount boards prevent print yellowing and keep colors crisp for over 75 years.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-sm bg-secondary-bg border border-border-color/50">
            <Compass className="w-8 h-8 text-gold-accent flex-shrink-0" />
            <div>
              <h4 className="font-serif text-base font-bold text-primary-text mb-1.5">Custom Sizing</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                From tiny desk tabletop stands to massive 5-foot wedding collage gallery wall mounts, we frame it all.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-sm bg-secondary-bg border border-border-color/50">
            <Info className="w-8 h-8 text-gold-accent flex-shrink-0" />
            <div>
              <h4 className="font-serif text-base font-bold text-primary-text mb-1.5">Premium Fine Art Paper</h4>
              <p className="text-xs text-secondary-text leading-relaxed">
                We print on thick, textured 290gsm Hahnemühle papers or luster papers using high-definition Epson inks.
              </p>
            </div>
          </div>
        </div>

        {/* Frames Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {framesData.map((frame, idx) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-secondary-bg border border-border-color hover:border-gold-accent/40 rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-luxury transition-all duration-500 group"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-neutral-900">
                <img
                  src={frame.image}
                  alt={frame.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-primary-bg/95 border border-border-color px-3 py-1 rounded-sm text-[10px] uppercase font-bold tracking-widest text-gold-accent shadow-sm backdrop-blur-sm">
                  {frame.dimensions}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-grow flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-lg font-bold text-primary-text group-hover:text-gold-accent transition-colors duration-300">
                      {frame.title}
                    </h3>
                    <span className="text-sm font-serif font-bold text-gold-accent">
                      from <strong className="text-lg">{frame.price}</strong>
                    </span>
                  </div>
                  <p className="text-xs text-secondary-text leading-relaxed mb-6">
                    {frame.desc}
                  </p>
                  
                  {/* Features Bullet points */}
                  <ul className="flex flex-col gap-2.5 mb-6 text-xs text-secondary-text border-t border-border-color/30 pt-4">
                    {frame.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <button
                  onClick={() => handleOrder(frame.title)}
                  className="w-full py-3 bg-gold-accent hover:bg-gold-hover text-primary-bg font-bold text-[10px] uppercase tracking-widest rounded-sm transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{frame.ctaText}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
