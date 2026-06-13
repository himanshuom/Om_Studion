import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Clock, Send, Check, AlertCircle, Calendar, MessageSquare } from 'lucide-react';

const serviceOptions = [
  'Wedding Photography',
  'Pre-Wedding Shoot',
  'Event Photography',
  'Birthday Photography',
  'Passport & Visa Photos',
  'Instant Photo Printing',
  'Custom Photo Frames',
  'Photo Restoration & Editing',
  'Family Photoshoot',
  'Corporate Headshots'
];

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = 'Please enter a valid phone number (10-12 digits)';
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) tempErrors.service = 'Please select a service';
    if (!formData.date) tempErrors.date = 'Please select an event date';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleSendToWhatsApp = () => {
    const whatsappNumber = '917301336655';
    const text = `*New Booking Inquiry - OM Studio*
----------------------------------------
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service:* ${formData.service}
*Event Date:* ${formData.date}
*Message:* ${formData.message || 'None'}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSendToEmail = () => {
    const subject = `New Booking Inquiry - OM Studio`;
    const body = `Hi OM Studio,

I would like to submit a booking inquiry. Here are my details:

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.service}
Event Date: ${formData.date}

Message:
${formData.message || 'None'}

Please let me know if this date is available and how we can proceed!

Best regards,
${formData.name}`;

    window.open(`mailto:Omstudio11@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-primary-bg overflow-hidden border-t border-border-color/10 spotlight-glow">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.25em] text-gold-accent uppercase mb-2">
            Booking & Contact
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-4">
            Schedule Your Shoot
          </h2>
          <span className="inline-block w-16 h-[2px] bg-gold-accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          {/* Studio Info (4 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="font-serif text-2xl font-bold text-primary-text">
              Let's craft your visuals.
            </h3>
            <p className="text-xs md:text-sm text-secondary-text leading-relaxed">
              We look forward to hearing your plans! Fill out the booking panel with your preferred details, and our visual coordinator will reply with a detailed price quotation sheet in 24 hours.
            </p>

            <div className="flex flex-col gap-5 border-t border-b border-border-color/60 py-6 my-2 text-sm text-secondary-text">
              <a href="tel:+917301336655" className="flex items-center gap-4 hover:text-gold-accent transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-primary-bg transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-tertiary-text block mb-0.5">Call Us</span>
                  <span className="font-semibold text-primary-text">+91 73013 36655</span>
                </div>
              </a>

              <a href="mailto:Omstudio11@gmail.com" className="flex items-center gap-4 hover:text-gold-accent transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-primary-bg transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-tertiary-text block mb-0.5">Email Us</span>
                  <span className="font-semibold text-primary-text">Omstudio11@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-gold-accent/10 border border-gold-accent/20 flex items-center justify-center text-gold-accent">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-tertiary-text block mb-0.5">Studio Timings</span>
                  <span className="font-semibold text-primary-text">Daily: 10:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Google Map Iframe */}
            <div className="w-full h-60 rounded-sm overflow-hidden border border-border-color shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Om%20Studio%20Dumraon%20Buxar%20Bihar&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-none filter invert-[0.9] dark:invert-0 brightness-[1.05] contrast-[0.9]"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="OM Studio location map"
              ></iframe>
            </div>
          </div>

          {/* Form Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-secondary-bg border border-border-color p-8 rounded-sm shadow-sm relative">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {/* Form Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-primary-bg border px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-border-color'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-primary-bg border px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors ${
                      errors.phone ? 'border-rose-500' : 'border-border-color'
                    }`}
                    placeholder="e.g. +91 9999999999"
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-primary-bg border px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors ${
                    errors.email ? 'border-rose-500' : 'border-border-color'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Form Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Service Select */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="service" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full bg-primary-bg border px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors cursor-pointer appearance-none ${
                      errors.service ? 'border-rose-500' : 'border-border-color'
                    }`}
                  >
                    <option value="">Choose service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.service && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.service}</span>
                    </span>
                  )}
                </div>

                {/* Event Date */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Preferred Shoot Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full bg-primary-bg border px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors cursor-pointer ${
                      errors.date ? 'border-rose-500' : 'border-border-color'
                    }`}
                  />
                  {errors.date && (
                    <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.date}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-widest text-primary-text">Special Requests & Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-primary-bg border border-border-color px-4 py-3 text-xs rounded-sm text-primary-text focus:outline-none focus:border-gold-accent transition-colors resize-none"
                  placeholder="Describe your session requests, locations, framing sizing etc."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 mt-2 bg-gold-accent hover:bg-gold-hover text-primary-bg font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-luxury cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Booking Request</span>
              </button>
            </form>

            {/* Success Modal */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-secondary-bg/95 backdrop-blur-sm flex items-center justify-center p-6 z-10"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    className="max-w-md w-full bg-primary-bg border border-gold-accent p-8 rounded-sm shadow-luxury text-center flex flex-col items-center gap-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold-accent/15 border border-gold-accent/30 flex items-center justify-center text-gold-accent">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="font-serif text-2xl font-bold text-primary-text mb-2">
                        Booking Received!
                      </h4>
                      <p className="text-xs text-secondary-text leading-relaxed">
                        Thank you for choosing OM Studio. Our coordinator has saved your inquiry and will reach out to you within 24 hours.
                      </p>
                    </div>

                    {/* Booking Invoice Summary */}
                    <div className="w-full bg-secondary-bg border border-border-color p-4 rounded-sm text-left text-xs flex flex-col gap-2.5 my-2">
                      <p className="border-b border-border-color pb-1.5 font-semibold text-primary-text uppercase tracking-wider text-[10px]">
                        Session Summary
                      </p>
                      <p><strong className="text-primary-text">Client:</strong> {formData.name}</p>
                      <p><strong className="text-primary-text">Session:</strong> {formData.service}</p>
                      <p><strong className="text-primary-text">Shoot Date:</strong> {formData.date}</p>
                      <p><strong className="text-primary-text">Status:</strong> Pending Approval</p>
                    </div>

                    <div className="flex flex-col gap-3.5 w-full">
                      {/* WhatsApp Confirmation */}
                      <button
                        onClick={handleSendToWhatsApp}
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Confirm via WhatsApp</span>
                      </button>

                      {/* Email Confirmation */}
                      <button
                        onClick={handleSendToEmail}
                        className="w-full py-3 bg-gold-accent hover:bg-gold-hover text-primary-bg text-xs font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                      >
                        <Mail className="w-4.5 h-4.5" />
                        <span>Confirm via Email</span>
                      </button>

                      {/* Close Success */}
                      <button
                        onClick={handleReset}
                        className="w-full py-3 bg-transparent hover:bg-secondary-bg text-secondary-text hover:text-primary-text text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                      >
                        Submit another form
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
