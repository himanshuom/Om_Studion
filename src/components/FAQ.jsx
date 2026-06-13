import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a photoshoot session?',
    answer: 'You can submit the Online Booking Form below, call us directly at +91 99999 99999, or click the WhatsApp button to chat. We recommend booking weddings 3–6 months in advance and portrait sessions 1–2 weeks in advance.'
  },
  {
    question: 'What is your turnaround time for photos?',
    answer: 'Passport and Visa photos are printed instantly (under 10 minutes). Family shoots and corporate headshots take 3–5 working days. Weddings take up to 14 working days for the digital gallery, and an additional 10 days for custom leather album layouts.'
  },
  {
    question: 'Can you build frames for my existing digital or printed photos?',
    answer: 'Absolutely! You can bring in your physical prints to our studio, or email us high-resolution digital files. We will print them on premium paper and custom-cut the wooden, acrylic, or canvas borders to your exact size specifications.'
  },
  {
    question: 'What cameras and equipment do you use?',
    answer: 'We utilize state-of-the-art Hasselblad and Sony high-resolution full-frame bodies paired with premium GM prime lenses. This ensures ultimate sharpness, rich color depth, and large format print capability.'
  },
  {
    question: 'Do you charge extra for outdoor pre-wedding locations?',
    answer: 'Our package pricing includes our photographers, gears, and editing. However, entry fees, shooting permissions, and travel expenses for specific private venues (like heritage palaces or resorts) are covered by the client.'
  }
];

function FAQItem({ faq, idx }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-color/60 py-5 text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 text-primary-text hover:text-gold-accent transition-colors duration-300 focus:outline-none cursor-pointer"
      >
        <span className="font-serif text-base md:text-lg font-bold">
          {faq.question}
        </span>
        <div className="w-8 h-8 rounded-full bg-secondary-bg flex items-center justify-center border border-border-color flex-shrink-0 text-gold-accent">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-secondary-text leading-relaxed mt-4 bg-secondary-bg/30 p-4 border-l-2 border-gold-accent rounded-r-sm">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Questions
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Frequently Asked Queries
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        {/* Accordions */}
        <div className="flex flex-col border-t border-border-color/60">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} faq={faq} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
