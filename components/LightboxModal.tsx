'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { GalleryItem } from '@/data/gemstones';
import { COMPANY_INFO } from '@/data/company';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export default function LightboxModal({
  item,
  items,
  onClose,
  onSelect,
}: LightboxModalProps) {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  const handleInquireWhatsApp = () => {
    const text = `Namaste Ethiopian Gems, I am inquiring about the piece from your gallery: "${item.title}" - ${item.caption}`;
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Close Button */}
      <button
        id="close-lightbox-btn"
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Controls */}
      <button
        id="lightbox-prev-btn"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="lightbox-next-btn"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Modal */}
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full max-h-[75vh] h-[65vh] rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 80vw"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Caption & Inquire Bar */}
        <div className="w-full mt-4 p-4 rounded-xl bg-[#07261D]/90 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[#FAF6EE]">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              JAIPUR ATELIER & GEM ARCHIVE
            </span>
            <h3 className="font-serif-luxury text-xl font-bold text-gold-gradient">
              {item.title}
            </h3>
            <p className="text-xs text-[#FAF6EE]/80 mt-1 max-w-xl">
              {item.caption}
            </p>
          </div>

          <button
            id="lightbox-whatsapp-btn"
            onClick={handleInquireWhatsApp}
            className="shrink-0 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Inquire on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
