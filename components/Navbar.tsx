'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  MessageCircle, 
  Gem, 
  ChevronRight,
  Globe
} from 'lucide-react';
import { COMPANY_INFO, isStoreCurrentlyOpen } from '@/data/company';
import { CurrencyCode, CURRENCIES } from '@/lib/currency';

interface NavbarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  onOpenConsultation: () => void;
}

export default function Navbar({
  activeTab,
  onNavigate,
  currency,
  onCurrencyChange,
  onOpenConsultation,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeStatus] = useState<{ isOpen: boolean; statusText: string }>(() => isStoreCurrentlyOpen());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'collections', label: 'Collections' },
    { id: 'opal-special', label: 'Ethiopian Opal', badge: 'Special' },
    { id: 'services', label: 'Custom Jewelry' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#051C15] text-[#D4AF37] text-xs py-2 px-4 border-b border-[#D4AF37]/20 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[#FAF6EE]/90">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Badi Chaupar,</span> Jaipur, India
            </span>
            <span className="hidden md:inline-block text-[#D4AF37]/40">|</span>
            <span className="flex items-center gap-1.5 text-[#FAF6EE]/80">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className={`inline-block w-2 h-2 rounded-full ${storeStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{storeStatus.statusText}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 text-xs text-[#FAF6EE]/80 bg-[#0B3D2E]/60 px-2 py-0.5 rounded border border-[#D4AF37]/30">
              <Globe className="w-3 h-3 text-[#D4AF37]" />
              <select
                id="currency-selector"
                aria-label="Select Currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-transparent text-[#FAF6EE] font-medium outline-none cursor-pointer text-xs"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-[#0B3D2E] text-[#FAF6EE]">
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Direct Phone */}
            <a
              id="topbar-call-btn"
              href={`tel:${COMPANY_INFO.phoneClean}`}
              className="hidden lg:flex items-center gap-1.5 text-[#FAF6EE] hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
            </a>

            {/* Quick WhatsApp */}
            <a
              id="topbar-whatsapp-btn"
              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I am inquiring from your website about gemstone availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07261D]/95 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/30 py-3'
            : 'bg-[#07261D]/80 backdrop-blur-sm border-b border-[#D4AF37]/15 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center bg-gradient-to-br from-[#0B3D2E] to-[#051C15] group-hover:border-[#F4E297] transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Gem className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-[#07261D]" />
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-gold-gradient block leading-tight">
                ETHIOPIAN GEMS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#FAF6EE]/70 uppercase block font-sans">
                JAIPUR • SINCE 2008
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-[#FAF6EE]/80 hover:text-[#FAF6EE]'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-400/40 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {/* Animated Gold Underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-transform duration-300 ${
                      isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Actions & Consultation CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-consultation-btn"
              onClick={onOpenConsultation}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#07261D] bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] rounded-full overflow-hidden shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#07261D] group-hover:rotate-45 transition-transform" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF6EE] hover:text-[#D4AF37] rounded-lg border border-[#D4AF37]/20 bg-[#0B3D2E]/50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 bg-[#051C15]/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-2">
              <Gem className="w-6 h-6 text-[#D4AF37]" />
              <span className="font-serif-luxury text-xl text-gold-gradient font-bold">ETHIOPIAN GEMS</span>
            </div>
            <button
              id="mobile-menu-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#FAF6EE]/80 hover:text-white rounded-full bg-[#07261D]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 flex-1 overflow-y-auto space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#0B3D2E] text-[#D4AF37] font-semibold border-l-4 border-[#D4AF37]'
                      : 'text-[#FAF6EE]/80 hover:bg-[#0B3D2E]/40 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-400/40">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}
          </div>

          {/* Mobile Footer CTAs */}
          <div className="pt-4 border-t border-[#D4AF37]/20 space-y-3">
            <button
              id="mobile-book-consultation-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold rounded-xl text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Book Private Consultation
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                id="mobile-call-link"
                href={`tel:${COMPANY_INFO.phoneClean}`}
                className="py-2.5 px-3 bg-[#0B3D2E] rounded-lg text-center text-[#FAF6EE] flex items-center justify-center gap-1.5 border border-[#D4AF37]/20"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                Call Showroom
              </a>
              <a
                id="mobile-whatsapp-link"
                href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I am inquiring from your website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-emerald-900/60 rounded-lg text-center text-emerald-200 flex items-center justify-center gap-1.5 border border-emerald-500/30"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                WhatsApp Us
              </a>
            </div>

            <p className="text-[11px] text-center text-[#FAF6EE]/60 pt-1">
              Badi Chaupar, Jaipur 302003 • Mon–Sat 11 AM–8 PM
            </p>
          </div>
        </div>
      )}
    </>
  );
}
