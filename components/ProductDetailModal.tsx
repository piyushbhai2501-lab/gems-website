'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  MessageCircle, 
  Calendar, 
  Check, 
  Share2, 
  Layers, 
  Scale, 
  MapPin, 
  Award,
  Maximize2
} from 'lucide-react';
import { Gemstone } from '@/data/gemstones';
import { COMPANY_INFO } from '@/data/company';
import { CurrencyCode, formatPrice } from '@/lib/currency';

interface ProductDetailModalProps {
  stone: Gemstone | null;
  onClose: () => void;
  currency: CurrencyCode;
  onBookInspection: (stoneName: string) => void;
}

export default function ProductDetailModal({
  stone,
  onClose,
  currency,
  onBookInspection,
}: ProductDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!stone) return null;

  const images = [stone.imageUrl, ...(stone.additionalImages || [])];
  const currentImage = images[activeImageIndex] || stone.imageUrl;

  const handleWhatsAppInquiry = () => {
    const formattedPrice = formatPrice(stone.inrPrice, currency);
    const text = `Namaste Ethiopian Gems, I am inquiring about this gemstone from your website:\n• Item: ${stone.name}\n• Weight: ${stone.carat} Carats\n• Origin: ${stone.origin}\n• Cut: ${stone.cut}\n• Price: ${formattedPrice}\n\nPlease share HD video of this stone or let me know availability in your Badi Chaupar showroom.`;
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#07261D] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          id="close-product-detail-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-[#FAF6EE] border border-[#D4AF37]/30 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Imagery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#051C15] border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-inner group">
            <Image
              src={currentImage}
              alt={stone.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              referrerPolicy="no-referrer"
            />
            {stone.colorPlay && (
              <div className="absolute bottom-3 left-3 right-3 bg-[#051C15]/90 backdrop-blur-sm p-2 rounded-lg border border-[#D4AF37]/30 text-[11px] text-[#FAF6EE] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="line-clamp-1">{stone.colorPlay}</span>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  id={`thumbnail-${idx}`}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-105'
                      : 'border-[#D4AF37]/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${stone.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Verification Badge */}
          <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs text-[#FAF6EE]/80">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{stone.certification}</span>
            </div>
            <button
              id="share-gemstone-link"
              onClick={handleShare}
              className="flex items-center gap-1 text-[#D4AF37] hover:underline cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto space-y-5 bg-[#07261D] text-[#FAF6EE]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] px-2 py-0.5 rounded bg-[#0B3D2E] border border-[#D4AF37]/30">
                {stone.category.toUpperCase()}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                ● {stone.stockStatus}
              </span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient">
              {stone.name}
            </h2>
            <div className="mt-2 text-xl font-bold text-[#F4E297] flex items-baseline gap-2">
              <span>{formatPrice(stone.inrPrice, currency)}</span>
              <span className="text-xs font-normal text-[#FAF6EE]/60">
                (Price on Request / Carat Rate)
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed">
            {stone.description}
          </p>

          {/* Detailed Gemological Specifications */}
          <div className="rounded-xl bg-[#051C15] p-4 border border-[#D4AF37]/25 space-y-2.5 text-xs">
            <h4 className="font-serif-luxury text-sm text-gold-gradient font-semibold tracking-wider flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-1.5">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              Gemological Specifications
            </h4>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[#FAF6EE]/90">
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Carat Weight</span>
                <span className="font-semibold text-white">{stone.carat} ct</span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Origin</span>
                <span className="font-semibold text-white">{stone.origin}</span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Cut & Shape</span>
                <span className="font-semibold text-white">{stone.cut}</span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Dimensions</span>
                <span className="font-semibold text-white">{stone.dimensions}</span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Clarity / Body</span>
                <span className="font-semibold text-white">{stone.clarity}</span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/60 block text-[10px] uppercase">Treatment</span>
                <span className="font-semibold text-emerald-400">{stone.treatment}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              id="modal-inquire-whatsapp-btn"
              onClick={handleWhatsAppInquiry}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Inquire on WhatsApp (+91 82095 44682)
            </button>

            <button
              id="modal-book-inspection-btn"
              onClick={() => {
                onClose();
                onBookInspection(stone.name);
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0B3D2E] hover:bg-[#0B3D2E]/80 text-[#D4AF37] border border-[#D4AF37]/40 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book Viewing at Badi Chaupar Showroom
            </button>
          </div>

          <p className="text-[11px] text-center text-[#FAF6EE]/60">
            Showroom Location: 1st Floor, Jamali Mension, Opp Masjid Sheikhan, Badi Chaupar, Jaipur
          </p>
        </div>
      </div>
    </div>
  );
}
