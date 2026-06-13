import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

export default function WhatsAppButton() {
  const [showChat, setShowChat] = useState(false);

  const whatsappNumber = '917301336655';
  const message = 'Hello OM Studio, I would like to inquire about your photography and framing services.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Mini Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-76 glass rounded-lg overflow-hidden shadow-luxury border border-card-border"
          >
            {/* Chat Header */}
            <div className="bg-gold-accent px-4 py-3 text-primary-bg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full bg-primary-bg/20 flex items-center justify-center font-bold text-sm">
                  OM
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gold-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs leading-tight">OM Studio</span>
                  <span className="text-[9px] opacity-80 leading-none">Online • Typically replies instantly</span>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-primary-bg/85 hover:text-primary-bg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-secondary-bg text-secondary-text text-xs leading-relaxed flex flex-col gap-3">
              <div className="bg-primary-bg p-3 rounded-r-lg rounded-bl-lg border border-border-color shadow-sm self-start max-w-[85%]">
                Hello there! 👋 
                <br />
                How can we help you create beautiful memories today?
              </div>
            </div>

            {/* Chat Footer */}
            <div className="p-3 bg-primary-bg border-t border-border-color flex items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowChat(false)}
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Button */}
      <motion.button
        onClick={() => setShowChat(!showChat)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center rounded-full shadow-luxury cursor-pointer focus:outline-none z-50"
        aria-label="Contact on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Pulsing indicator */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </motion.button>
    </div>
  );
}
