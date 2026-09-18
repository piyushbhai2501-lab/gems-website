'use client';

import React from 'react';
import { 
  Gem, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  Compass, 
  MessageCircle, 
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { COMPANY_INFO, isStoreCurrentlyOpen } from '@/data/company';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenConsultation: () => void;
}

export default function Footer({ onNavigate, onOpenConsultation }: FooterProps) {
  const storeStatus = isStoreCurrentlyOpen();

  const handleNav = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051C15] text-[#FAF6EE] border-t border-[#D4AF37]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Gold Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0B3D2E]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/20">
          {/* Column 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#07261D]">
                <Gem className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-bold tracking-wider text-gold-gradient block">
                  ETHIOPIAN GEMS
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#FAF6EE]/70 uppercase block">
                  BADI CHAUPAR • JAIPUR
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
              Direct purveyors of untreated natural Ethiopian Welo Opals, Colombian & Zambian Emeralds, Burmese Rubies, and royal Ceylon Sapphires. Rooted in Jaipur&apos;s centuries-old lapidary heritage.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% Certified Untreated Stones
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg text-gold-gradient font-semibold tracking-wide border-b border-[#D4AF37]/20 pb-2">
              Boutique Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6EE]/80">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Home & Showcase</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Jaipur Heritage & Story</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-collections"
                  onClick={() => handleNav('collections')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Gemstone Collections</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-opal-special"
                  onClick={() => handleNav('opal-special')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[#F4E297]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Ethiopian Opal Deep Dive</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => handleNav('services')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Custom Jewelry & Lapidary</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-gallery"
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Gemstone & Atelier Gallery</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-testimonials"
                  onClick={() => handleNav('testimonials')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Collector Reviews</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => handleNav('contact')}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>Visit Showroom & Map</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Address & Showroom Hours */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg text-gold-gradient font-semibold tracking-wide border-b border-[#D4AF37]/20 pb-2">
              Jaipur Showroom
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF6EE]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FAF6EE]">{COMPANY_INFO.address.floor}</p>
                  <p>{COMPANY_INFO.address.landmark}</p>
                  <p>{COMPANY_INFO.address.area}</p>
                  <p>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.pincode}, India</p>
                  <a
                    id="footer-directions-link"
                    href={COMPANY_INFO.social.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline mt-1 font-medium"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#FAF6EE]">Trading Hours (IST):</p>
                  <p>{COMPANY_INFO.businessHours.weekdays}</p>
                  <p className="text-amber-300/90">{COMPANY_INFO.businessHours.sunday}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                    <span className="text-[11px] font-semibold text-[#D4AF37]">{storeStatus.statusText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Direct Inquiries & VIP Access */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-lg text-gold-gradient font-semibold tracking-wide border-b border-[#D4AF37]/20 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                id="footer-call-action"
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0B3D2E]/60 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-[#FAF6EE]"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <div>
                  <span className="text-[10px] text-[#FAF6EE]/60 block uppercase">Call or WhatsApp</span>
                  <span className="font-medium text-sm">{COMPANY_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                id="footer-whatsapp-action"
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I am visiting your website and would like a private consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-900/40 border border-emerald-500/40 hover:bg-emerald-900/60 transition-all text-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-[10px] text-emerald-300/70 block uppercase">Instant Response</span>
                  <span className="font-medium text-sm">Chat on WhatsApp</span>
                </div>
              </a>
            </div>

            <button
              id="footer-book-consultation"
              onClick={onOpenConsultation}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:scale-[1.02] transition-transform"
            >
              Request Private Gem Viewing
            </button>
          </div>
        </div>

        {/* Certifications Banner */}
        <div className="py-6 border-b border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#FAF6EE]/70">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Independent Lab Testing & Certification:</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="px-2.5 py-1 rounded bg-[#07261D] border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">GIA (Gemological Institute of America)</span>
            <span className="px-2.5 py-1 rounded bg-[#07261D] border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">IGI (International Gemological Institute)</span>
            <span className="px-2.5 py-1 rounded bg-[#07261D] border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">GTL Jaipur (GJEPC India)</span>
            <span className="px-2.5 py-1 rounded bg-[#07261D] border border-[#D4AF37]/20 text-[#D4AF37] font-semibold">SGL Certified</span>
          </div>
        </div>

        {/* Bottom Copyright & Location Context */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF6EE]/60 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Ethiopian Gems. All Rights Reserved. Located in Badi Chaupar, Jaipur&apos;s Historic Gemstone Bazaar.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Natural Guarantee</span>
            <span>•</span>
            <span>Worldwide Insured Delivery</span>
            <span>•</span>
            <span>Bespoke Jewelry Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
