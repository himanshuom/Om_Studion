import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const feedData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    likes: '412',
    comments: '24'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop',
    likes: '503',
    comments: '42'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
    likes: '621',
    comments: '18'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=400&auto=format&fit=crop',
    likes: '344',
    comments: '15'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop',
    likes: '289',
    comments: '9'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop',
    likes: '519',
    comments: '37'
  }
];

export default function InstagramFeed() {
  return (
    <section className="py-24 bg-secondary-bg overflow-hidden border-t border-border-color/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Social Feed
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Follow Our Lens
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 mt-4 text-xs font-semibold text-secondary-text hover:text-gold-accent transition-colors duration-300 w-fit mx-auto cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-gold-accent" />
            <span>@om.studio</span>
          </a>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feedData.map((item, idx) => (
            <motion.a
              key={item.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative group block rounded-sm overflow-hidden aspect-square bg-neutral-900 border border-border-color/30 shadow-sm hover:shadow-luxury cursor-pointer"
            >
              <img
                src={item.image}
                alt="Instagram social grid photo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              
              {/* Instagram Hover Stats */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart className="w-4.5 h-4.5 text-gold-accent fill-current" />
                  <span className="text-xs font-semibold">{item.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4.5 h-4.5 text-gold-accent fill-current" />
                  <span className="text-xs font-semibold">{item.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
