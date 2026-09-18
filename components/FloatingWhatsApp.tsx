'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Clock } from 'lucide-react';
import { COMPANY_INFO, isStoreCurrentlyOpen } from '@/data/company';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const storeStatus = isStoreCurrentlyOpen();

  const quickPrompts = [
    'I would like to inquire about Ethiopian Opals and pricing.',
    'I want to book a private viewing at your Badi Chaupar showroom.',
    'Can I get a custom jewelry design quotation?',
    'Do you have wholesale parcel availability for international shipping?',
  ];

  const handleSendPrompt = (prompt: string) => {
    const url = `${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(prompt)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#07261D] border border-[#D4AF37]/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0B3D2E] to-[#051C15] p-4 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#07261D]" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-base font-bold text-gold-gradient">
                  Ethiopian Gems Jaipur
                </h4>
                <p className="text-[11px] text-[#FAF6EE]/75 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>{storeStatus.statusText}</span>
                </p>
              </div>
            </div>
            <button
              id="close-whatsapp-popover"
              onClick={() => setIsOpen(false)}
              className="text-[#FAF6EE]/60 hover:text-white p-1 rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#07261D]">
            <div className="bg-[#0B3D2E]/80 p-3 rounded-xl border border-[#D4AF37]/20 text-xs text-[#FAF6EE]/90 leading-relaxed">
              <p className="font-semibold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Namaste & Welcome!
              </p>
              How may our Jaipur gemologists assist you today? We can share high-definition videos of natural Ethiopian Opals, emeralds, or arrange a private viewing at our Badi Chaupar boutique.
            </div>

            <p className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
              Quick Inquiries:
            </p>

            <div className="space-y-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  id={`whatsapp-quick-prompt-${idx}`}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-[#051C15] hover:bg-[#0B3D2E] text-[#FAF6EE]/90 hover:text-[#D4AF37] border border-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#D4AF37] shrink-0 ml-2 transition-opacity" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <a
                id="whatsapp-chat-direct"
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I am inquiring from your website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Start Chat (+91 82095 44682)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-3.5 rounded-full bg-emerald-600 text-white shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:bg-emerald-500 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#D4AF37]"
        aria-label="Chat with Ethiopian Gems Jaipur on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="sr-only">Chat on WhatsApp</span>
      </button>
    </div>
  );
}
