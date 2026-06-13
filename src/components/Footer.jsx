import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Send } from 'lucide-react';

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Facebook = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const Youtube = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
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
    <footer className="bg-secondary-bg border-t border-border-color pt-20 pb-8 text-secondary-text">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="flex flex-col gap-6">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="OM Studio Logo"
              className="h-20 w-auto object-contain brightness-110 drop-shadow-md"
            />
          </a>
          <p className="text-sm leading-relaxed text-secondary-text">
            Capturing premium cinematic visual stories since 1996. Specialized in wedding, event, portfolio portraiture, and handcrafted museum-grade framing services.
          </p>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border-color hover:border-gold-accent hover:text-gold-accent transition-colors duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border-color hover:border-gold-accent hover:text-gold-accent transition-colors duration-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border-color hover:border-gold-accent hover:text-gold-accent transition-colors duration-300">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border-color hover:border-gold-accent hover:text-gold-accent transition-colors duration-300">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-base font-bold text-primary-text tracking-wide uppercase border-b border-border-color/30 pb-2">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            {['Home', 'About', 'Services', 'Portfolio', 'Frames', 'Pricing', 'Testimonials'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                  className="hover:text-gold-accent transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-base font-bold text-primary-text tracking-wide uppercase border-b border-border-color/30 pb-2">
            Our Services
          </h4>
          <ul className="flex flex-col gap-3.5 text-sm">
            <li>Wedding & Pre-Wedding Shoots</li>
            <li>Event & Birthday Photography</li>
            <li>Portrait & Corporate Headshots</li>
            <li>Passport & Visa Photos</li>
            <li>Instant Photo Printing</li>
            <li>Custom Wooden & Acrylic Frames</li>
            <li>Photo Editing & Restoration</li>
          </ul>
        </div>

        {/* Contact & Newsletter Column */}
        <div className="flex flex-col gap-6">
          <h4 className="font-serif text-base font-bold text-primary-text tracking-wide uppercase border-b border-border-color/30 pb-2">
            Get In Touch
          </h4>
          <div className="flex flex-col gap-4 text-sm">
            <a href="tel:+917301336655" className="flex items-center gap-3 hover:text-gold-accent transition-colors">
              <Phone className="w-4.5 h-4.5 text-gold-accent flex-shrink-0" />
              <span>+91 73013 36655</span>
            </a>
            <a href="mailto:Omstudio11@gmail.com" className="flex items-center gap-3 hover:text-gold-accent transition-colors">
              <Mail className="w-4.5 h-4.5 text-gold-accent flex-shrink-0" />
              <span>Omstudio11@gmail.com</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-gold-accent flex-shrink-0 mt-0.5" />
              <span>Om Studio, Dumraon, Buxar, Bihar</span>
            </div>
          </div>

          <div className="mt-2">
            <p className="text-xs font-semibold text-primary-text uppercase tracking-widest mb-3">Newsletter</p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary-bg border border-border-color px-4 py-2.5 text-xs text-primary-text rounded-sm focus:outline-none focus:border-gold-accent transition-colors duration-300"
              />
              <button
                type="submit"
                className="absolute right-1 p-2 bg-transparent text-gold-accent hover:text-gold-hover transition-colors"
                aria-label="Submit Newsletter"
              >
                {subscribed ? <span className="text-xs font-semibold text-emerald-500">Sent!</span> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-border-color/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-tertiary-text">
        <p>© {new Date().getFullYear()} OM Studio. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-gold-accent transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold-accent transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gold-accent transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
