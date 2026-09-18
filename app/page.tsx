'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Gem, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Search, 
  Filter, 
  MessageCircle, 
  Calendar, 
  ArrowRight, 
  Star, 
  Layers, 
  SlidersHorizontal, 
  CheckCircle2, 
  Compass, 
  Hammer, 
  Eye, 
  ExternalLink,
  RotateCcw,
  Check,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ConsultationModal from '@/components/ConsultationModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import OpalFireVisualizer from '@/components/OpalFireVisualizer';
import CustomJewelryEstimator from '@/components/CustomJewelryEstimator';
import LightboxModal from '@/components/LightboxModal';

import { 
  GEMSTONES_DATA, 
  GALLERY_DATA, 
  TESTIMONIALS_DATA, 
  MILESTONES, 
  CERTIFICATION_LABS, 
  Gemstone, 
  GalleryItem 
} from '@/data/gemstones';
import { COMPANY_INFO, isStoreCurrentlyOpen } from '@/data/company';
import { CurrencyCode, formatPrice } from '@/lib/currency';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Modals state
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationPrefill, setConsultationPrefill] = useState('');
  const [selectedGemstone, setSelectedGemstone] = useState<Gemstone | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Collections filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');

  // Gallery filters
  const [galleryCategory, setGalleryCategory] = useState<string>('all');

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    gemstone: 'Ethiopian Opal',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<string | null>(null);

  // Testimonial carousel active index
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Listen to URL hash on initial load and handle back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['home', 'about', 'collections', 'opal-special', 'services', 'gallery', 'testimonials', 'contact'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    // Subtle initial gold shimmer loader delay
    const timer = setTimeout(() => setIsPageLoading(false), 450);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultationWithStone = (stoneName: string) => {
    setConsultationPrefill(stoneName);
    setConsultationOpen(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactFeedback(null);
    try {
      const res = await fetch('./contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json().catch(() => null);
      if (data && data.message) {
        setContactFeedback(data.message);
      }
    } catch {
      // Fallback gracefully on static or offline previews
    } finally {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }
  };

  const handleWhatsAppContact = () => {
    const text = `Namaste Ethiopian Gems, I am submitting an inquiry from your contact page:\n• Name: ${contactForm.name}\n• Phone: ${contactForm.phone}\n• Email: ${contactForm.email || 'N/A'}\n• Gemstone of Interest: ${contactForm.gemstone}\n• Message: ${contactForm.message || 'I would like to discuss availability in your Badi Chaupar showroom.'}`;
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Filter gemstones
  const filteredGemstones = GEMSTONES_DATA.filter((stone) => {
    const matchesCat = selectedCategory === 'all' || stone.category === selectedCategory;
    const matchesSearch =
      stone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stone.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stone.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.inrPrice - b.inrPrice;
    if (sortOption === 'price-high') return b.inrPrice - a.inrPrice;
    if (sortOption === 'carat-high') return b.carat - a.carat;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  // Filter gallery items
  const filteredGallery = GALLERY_DATA.filter(
    (item) => galleryCategory === 'all' || item.category === galleryCategory
  );

  const storeStatus = isStoreCurrentlyOpen();

  return (
    <div className="min-h-screen flex flex-col bg-[#07261D] text-[#FAF6EE] relative selection:bg-[#D4AF37] selection:text-[#07261D]">
      {/* Loading Screen */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#051C15]"
          >
            <div className="relative w-16 h-16 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center animate-spin">
              <Gem className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <span className="font-serif-luxury text-xl tracking-widest text-gold-gradient mt-4 font-bold">
              ETHIOPIAN GEMS
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]/80 uppercase mt-1">
              JAIPUR
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={navigateTo}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenConsultation={() => {
          setConsultationPrefill('');
          setConsultationOpen(true);
        }}
      />

      {/* Main Multipage View Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* ========================================================= */}
          {/* 1. HOME PAGE */}
          {/* ========================================================= */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-24 pb-20"
            >
              {/* HERO SECTION */}
              <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#051C15] via-[#07261D] to-[#051C15]">
                {/* Subtle Animated Iridescent Opal Shimmer Background */}
                <div className="absolute inset-0 opacity-20 animate-opal-fire pointer-events-none" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Hero Content Container */}
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-12 pb-16">
                  {/* Luxury Eyebrow Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B3D2E]/80 border border-[#D4AF37]/40 shadow-lg text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Direct Importers from Wollo, Ethiopia • Badi Chaupar, Jaipur</span>
                  </div>

                  {/* Main Tagline */}
                  <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gold-gradient leading-[1.15]">
                    Rare Gemstones, <br className="hidden sm:inline" />
                    Timeless Elegance
                  </h1>

                  {/* Subheading */}
                  <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#FAF6EE]/80 leading-relaxed font-sans">
                    Purveyors of natural Ethiopian Welo Opals bursting with 3D play-of-color, Burmese Rubies, Zambian Emeralds, and royal Ceylon Sapphires. Cut with generational lapidary mastery in the heart of Jaipur.
                  </p>

                  {/* Hero CTA Buttons */}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                    <button
                      id="hero-explore-collection-btn"
                      onClick={() => navigateTo('collections')}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <Gem className="w-4 h-4" />
                      Explore Collection
                    </button>

                    <button
                      id="hero-book-consult-btn"
                      onClick={() => setConsultationOpen(true)}
                      className="px-8 py-3.5 bg-[#0B3D2E]/80 hover:bg-[#0B3D2E] text-[#FAF6EE] border border-[#D4AF37]/50 font-semibold text-xs uppercase tracking-widest rounded-full shadow-md hover:border-[#D4AF37] transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      Book Showroom Visit
                    </button>

                    <a
                      id="hero-whatsapp-btn"
                      href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I am visiting your website and would like to see available Ethiopian Opals.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-emerald-900/50 hover:bg-emerald-800/70 text-emerald-200 border border-emerald-500/40 font-semibold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Quick Value Metrics */}
                  <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-[#D4AF37]/20 text-center">
                    {MILESTONES.map((m, idx) => (
                      <div key={idx} className="p-3">
                        <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient block">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-[#FAF6EE]/70 uppercase tracking-wider block mt-0.5">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* BRAND INTRODUCTION / ABOUT SNIPPET */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl group">
                    <Image
                      src="/images/gems/jaipur-artisan.jpg"
                      alt="Jaipur master lapidary polishing natural Ethiopian Opal"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07261D] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#051C15]/90 border border-[#D4AF37]/30 text-xs">
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest block font-semibold">
                        DIRECT MINING & LAPIDARY
                      </span>
                      <p className="text-white font-serif-luxury text-base font-bold">
                        Wollo Plateau to Badi Chaupar, Jaipur
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
                      <Compass className="w-4 h-4 text-[#D4AF37]" />
                      <span>The Jaipur Gemstone Legacy</span>
                    </div>

                    <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                      Generations of Trust in Jaipur&apos;s Historic Gem Bazaar
                    </h2>

                    <p className="text-sm text-[#FAF6EE]/80 leading-relaxed">
                      For over three centuries, the walled city of Jaipur has stood as the gemstone capital of the world. Situated right at <strong>Badi Chaupar</strong> (Opposite Masjid Sheikhan in Jamali Mension), <strong>Ethiopian Gems</strong> bridges the pristine volcanic gemstone mines of Ethiopia directly to the world&apos;s most skilled gem cutters.
                    </p>

                    <p className="text-sm text-[#FAF6EE]/80 leading-relaxed">
                      We specialize in raw and polished <strong>Ethiopian Welo Opals</strong>, celebrated internationally for their fiery honeycomb patterns and neon flashes, alongside untreated Emeralds, Rubies, and royal Sapphires. Every specimen is independently verified with zero artificial fillers or smoke treatments.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        id="about-snippet-learn-more"
                        onClick={() => navigateTo('about')}
                        className="px-6 py-3 rounded-full bg-[#0B3D2E] hover:bg-[#0B3D2E]/80 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
                      >
                        <span>Our Heritage & Values</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        id="about-snippet-opal-deepdive"
                        onClick={() => navigateTo('opal-special')}
                        className="text-xs text-[#FAF6EE]/80 hover:text-[#D4AF37] underline transition-colors"
                      >
                        Why Ethiopian Opal Is Special →
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FEATURED GEMSTONE CATEGORIES */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                    CURATED ATELIER SELECTIONS
                  </span>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                    Featured Gemstone Categories
                  </h2>
                  <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                    Explore collector-grade natural gemstones sourced ethically and certified by premier international gem labs.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Opal */}
                  <div
                    onClick={() => {
                      setSelectedCategory('opal');
                      navigateTo('collections');
                    }}
                    className="group relative h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <Image
                      src="/images/gems/welo-opal.jpg"
                      alt="Ethiopian Welo Fire Opal"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-[#07261D]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 space-y-1 text-[#FAF6EE]">
                      <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-wider block">
                        Signature Specialty
                      </span>
                      <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                        Ethiopian Welo Opal
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 line-clamp-2">
                        Vibrant 3D play-of-color, honeycomb patterns, and crystal water cabochons.
                      </p>
                      <span className="text-xs text-[#D4AF37] font-semibold inline-flex items-center gap-1 pt-1">
                        View Opals <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Emerald */}
                  <div
                    onClick={() => {
                      setSelectedCategory('emerald');
                      navigateTo('collections');
                    }}
                    className="group relative h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <Image
                      src="/images/gems/zambian-emerald.jpg"
                      alt="Jaipur Zambian Emerald"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-[#07261D]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 space-y-1 text-[#FAF6EE]">
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                        Jaipur Heritage
                      </span>
                      <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                        Fine Emeralds
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 line-clamp-2">
                        Deep velvety green Zambian & Colombian beryls with subtle natural jardin.
                      </p>
                      <span className="text-xs text-[#D4AF37] font-semibold inline-flex items-center gap-1 pt-1">
                        View Emeralds <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Ruby & Sapphire */}
                  <div
                    onClick={() => {
                      setSelectedCategory('ruby');
                      navigateTo('collections');
                    }}
                    className="group relative h-80 rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl cursor-pointer"
                  >
                    <Image
                      src="/images/gems/burma-ruby.jpg"
                      alt="Burma Pigeon Blood Ruby"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-[#07261D]/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 space-y-1 text-[#FAF6EE]">
                      <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider block">
                        Precious Corundum
                      </span>
                      <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                        Ruby & Sapphires
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 line-clamp-2">
                        Unheated pigeon blood Burmese rubies and cornflower Ceylon blue sapphires.
                      </p>
                      <span className="text-xs text-[#D4AF37] font-semibold inline-flex items-center gap-1 pt-1">
                        View Corundum <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* OPAL FIRE PREVIEW INTERACTIVE TEASER */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <OpalFireVisualizer />
              </section>

              {/* WHY CHOOSE US SECTION */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#051C15] border border-[#D4AF37]/30 rounded-2xl p-8 sm:p-12 shadow-2xl">
                  <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                    <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                      ETHICS • AUTHENTICITY • VALUE
                    </span>
                    <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                      Why Discerning Collectors Choose Us
                    </h2>
                    <p className="text-xs text-[#FAF6EE]/75">
                      Direct mine relationships without middleman inflation, backed by authoritative gem testing reports.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-xl bg-[#07261D] border border-[#D4AF37]/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif-luxury text-lg font-bold text-white">
                        100% Certified Natural
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                        Every stone is guaranteed untreated. Accompanied by reports from GIA, IGI, or GTL Jaipur.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-[#07261D] border border-[#D4AF37]/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <Compass className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif-luxury text-lg font-bold text-white">
                        Direct Mine Sourcing
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                        Direct imports from Delanta, Wollo, Ethiopia, cutting out multiple layers of broker markups.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-[#07261D] border border-[#D4AF37]/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <Hammer className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif-luxury text-lg font-bold text-white">
                        Jaipur Master Lapidary
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                        Precision cabochon and facet cutting by generational artisans in historic Badi Chaupar.
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-[#07261D] border border-[#D4AF37]/20 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <Award className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif-luxury text-lg font-bold text-white">
                        Global Insured Delivery
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                        Doorstep delivery worldwide via Malca-Amit, Brinks, and FedEx with 100% transit insurance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS CAROUSEL PREVIEW */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                      VERIFIED COLLECTOR REVIEWS
                    </span>
                    <h2 className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                      Voices of Our Global Patrons
                    </h2>
                  </div>

                  <button
                    id="home-view-all-reviews-btn"
                    onClick={() => navigateTo('testimonials')}
                    className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Read All Reviews</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TESTIMONIALS_DATA.slice(0, 2).map((test) => (
                    <div
                      key={test.id}
                      className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 shadow-xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400 gap-1">
                          {[...Array(test.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#D4AF37] font-medium bg-[#0B3D2E] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                          {test.verifiedPurchase}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#FAF6EE]/90 leading-relaxed italic">
                        &quot;{test.quote}&quot;
                      </p>

                      <div className="flex items-center gap-3 pt-2 border-t border-[#D4AF37]/15">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D4AF37]">
                          <Image
                            src={test.avatarUrl}
                            alt={test.clientName}
                            fill
                            className="object-cover"
                            sizes="40px"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif-luxury text-sm font-bold text-white">
                            {test.clientName}
                          </h4>
                          <span className="text-[11px] text-[#FAF6EE]/60 block">
                            {test.location} • {test.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CALL-TO-ACTION BANNER WITH PHONE & WHATSAPP */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-gradient-to-r from-[#0B3D2E] via-[#07261D] to-[#051C15] border-2 border-[#D4AF37] p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] block">
                      VISIT OUR JAIPUR SHOWROOM
                    </span>
                    <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                      Experience Fine Gemstones in Person
                    </h2>
                    <p className="text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed">
                      Located at 1st Floor, Jamali Mension, Opp Masjid Sheikhan, Badi Chaupar, Jaipur. Open Monday to Saturday 11:00 AM – 8:00 PM. Private video viewings available daily for international clients.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto">
                    <a
                      id="home-cta-call"
                      href={`tel:${COMPANY_INFO.phoneClean}`}
                      className="px-6 py-3.5 rounded-full bg-[#07261D] hover:bg-[#07261D]/80 text-[#FAF6EE] border border-[#D4AF37] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>{COMPANY_INFO.phoneDisplay}</span>
                    </a>

                    <a
                      id="home-cta-whatsapp"
                      href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I would like to schedule a private viewing in Badi Chaupar, Jaipur.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 2. ABOUT US PAGE */}
          {/* ========================================================= */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  CENTURIES OF LAPIDARY EXCELLENCE
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  The Heritage of Ethiopian Gems
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed font-sans">
                  From the volcanic cliffs of Wollo, Ethiopia to the vibrant gemstone bazaar of Badi Chaupar, Jaipur — discovering the earth&apos;s most mesmerizing treasures.
                </p>
              </div>

              {/* Story Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4 text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed">
                  <h2 className="font-serif-luxury text-2xl text-gold-gradient font-bold">
                    Rooted in Jaipur&apos;s Royal Gem Capital
                  </h2>
                  <p>
                    Jaipur was founded in 1727 by Maharaja Sawai Jai Singh II as a planned capital where the world&apos;s finest lapidaries, jewelers, and enamelers were invited from all corners of Asia. Within this living history sits <strong>Badi Chaupar</strong>, the historic crossroads of precious stone trading.
                  </p>
                  <p>
                    Established over 18 years ago, <strong>Ethiopian Gems</strong> emerged from a dedicated pursuit: connecting the newly discovered, peerless volcanic opals of the Ethiopian highlands directly to Jaipur&apos;s master lapidary workshops. By maintaining direct ties with artisanal mining cooperatives in Wollo, we eliminate intermediaries, guaranteeing transparent provenance and pristine, untreated quality.
                  </p>
                  <div className="p-4 rounded-xl bg-[#051C15] border border-[#D4AF37]/30 space-y-2 text-xs">
                    <span className="text-[#D4AF37] font-semibold block uppercase tracking-wider">
                      Our Guiding Credo
                    </span>
                    <p className="italic text-white">
                      &quot;Nature spent millions of years weaving fire into silica; our role is solely to honor that beauty with mathematical cut precision and absolute honesty.&quot;
                    </p>
                  </div>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
                  <Image
                    src="/images/gems/jaipur-heritage.jpg"
                    alt="Historic Badi Chaupar gemstone bazaar in Jaipur"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-transparent to-transparent opacity-70" />
                </div>
              </div>

              {/* Milestone Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 text-center">
                {MILESTONES.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-gold-gradient">
                      {m.value}
                    </span>
                    <span className="text-xs text-[#FAF6EE]/75 block uppercase tracking-wider">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lab Certification Partners */}
              <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                    UNCOMPROMISING TRANSPARENCY
                  </span>
                  <h2 className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                    Independent Gemological Testing
                  </h2>
                  <p className="text-xs text-[#FAF6EE]/70">
                    We partner with the world&apos;s leading colored stone laboratories to provide third-party verification of origin, weight, and natural untreated state.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {CERTIFICATION_LABS.map((lab, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#07261D] border border-[#D4AF37]/25 space-y-2 text-center sm:text-left"
                    >
                      <span className="font-serif-luxury text-2xl font-bold text-white block">
                        {lab.name}
                      </span>
                      <h4 className="text-xs text-[#D4AF37] font-semibold">{lab.fullName}</h4>
                      <p className="text-[11px] text-[#FAF6EE]/75 leading-relaxed">
                        {lab.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder / Team Vision */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0B3D2E] via-[#07261D] to-[#051C15] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#07261D] text-[#D4AF37] shrink-0">
                  <Gem className="w-12 h-12" />
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#FAF6EE]/80">
                  <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                    Direct Personal Commitment
                  </h3>
                  <p>
                    Whether you are an international high jewelry brand seeking calibrated parcels or an individual acquiring a rare personal heirloom, our team in Badi Chaupar is committed to individualized curation, microscopic inspection, and worldwide insured dispatch.
                  </p>
                  <div className="pt-2">
                    <button
                      id="about-book-meeting-btn"
                      onClick={() => setConsultationOpen(true)}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider rounded-full shadow-md hover:scale-105 transition-transform"
                    >
                      Schedule Atelier Visit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 3. COLLECTIONS / PRODUCTS PAGE */}
          {/* ========================================================= */}
          {activeTab === 'collections' && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  NATURAL & UNTREATED GEMSTONES
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  The Gemstone Showcase
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                  Hand-selected loose gemstones and finished fine jewelry pieces available for direct acquisition in Jaipur or international insured dispatch.
                </p>
              </div>

              {/* Filter Controls Bar */}
              <div className="p-4 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-4">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
                  {[
                    { id: 'all', label: 'All Gemstones' },
                    { id: 'opal', label: 'Ethiopian Opal' },
                    { id: 'emerald', label: 'Emerald' },
                    { id: 'ruby', label: 'Ruby' },
                    { id: 'sapphire', label: 'Sapphire' },
                    { id: 'pearl', label: 'Pearl' },
                    { id: 'semi-precious', label: 'Semi-Precious' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      id={`filter-cat-${cat.id}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-[#D4AF37] text-[#07261D] font-bold shadow-md'
                          : 'bg-[#07261D] text-[#FAF6EE]/70 hover:text-white border border-[#D4AF37]/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Search & Sort */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="gem-search-input"
                      placeholder="Search by stone name, cut, or origin..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none placeholder:text-[#FAF6EE]/40"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <span className="text-[#FAF6EE]/60 text-xs">Sort:</span>
                    <select
                      id="gem-sort-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 text-[#FAF6EE] outline-none text-xs cursor-pointer"
                    >
                      <option value="featured">Featured First</option>
                      <option value="carat-high">Carat Weight (High to Low)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredGemstones.length === 0 ? (
                <div className="text-center py-16 space-y-3 bg-[#051C15] rounded-2xl border border-[#D4AF37]/20">
                  <Gem className="w-12 h-12 text-[#D4AF37]/40 mx-auto" />
                  <h3 className="font-serif-luxury text-xl font-bold text-white">
                    No Matching Gemstones Found
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/60 max-w-sm mx-auto">
                    Try adjusting your search criteria or contact our Jaipur showroom for custom sourcing requests.
                  </p>
                  <button
                    id="reset-filters-btn"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-lg bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGemstones.map((gem) => (
                    <div
                      key={gem.id}
                      className="group relative rounded-2xl bg-[#051C15] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    >
                      {/* Image Area */}
                      <div
                        onClick={() => setSelectedGemstone(gem)}
                        className="relative aspect-4/3 overflow-hidden cursor-pointer bg-[#07261D]"
                      >
                        <Image
                          src={gem.imageUrl}
                          alt={gem.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-108"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-transparent to-transparent opacity-60" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#051C15]/80 backdrop-blur-sm border border-[#D4AF37]/40 text-[#D4AF37]">
                            {gem.category.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0B3D2E]/90 text-emerald-300 border border-emerald-400/30">
                            {gem.carat} ct
                          </span>
                        </div>

                        {/* Color Play Indicator for Opal */}
                        {gem.colorPlay && (
                          <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded bg-[#051C15]/85 backdrop-blur-xs border border-[#D4AF37]/20 text-[10px] text-[#FAF6EE]/90 line-clamp-1 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span>{gem.colorPlay}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] text-[#FAF6EE]/60 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" />
                            <span>{gem.origin}</span>
                          </div>
                          <h3
                            onClick={() => setSelectedGemstone(gem)}
                            className="font-serif-luxury text-xl font-bold text-gold-gradient cursor-pointer hover:underline"
                          >
                            {gem.name}
                          </h3>
                          <p className="text-xs text-[#FAF6EE]/75 line-clamp-2 mt-1">
                            {gem.description}
                          </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/15">
                          <div>
                            <span className="text-[#FAF6EE]/60 block text-[9px] uppercase">Cut</span>
                            <span className="font-semibold text-white line-clamp-1">{gem.cut}</span>
                          </div>
                          <div>
                            <span className="text-[#FAF6EE]/60 block text-[9px] uppercase">Treatment</span>
                            <span className="font-semibold text-emerald-400 line-clamp-1">{gem.treatment}</span>
                          </div>
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="pt-2 border-t border-[#D4AF37]/15 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[10px] text-[#FAF6EE]/60 uppercase block">Price Guide</span>
                              <span className="text-base font-bold text-[#F4E297]">
                                {formatPrice(gem.inrPrice, currency)}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#D4AF37] font-medium">
                              {gem.certification.split(' ')[0]} Verified
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <button
                              id={`inspect-gem-${gem.id}`}
                              onClick={() => setSelectedGemstone(gem)}
                              className="py-2 px-3 rounded-lg bg-[#07261D] hover:bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              Inspect
                            </button>
                            <a
                              id={`whatsapp-gem-${gem.id}`}
                              href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hello Ethiopian Gems, I am inquiring about ${gem.name} (${gem.carat} ct, ID: ${gem.id}) priced at ${formatPrice(gem.inrPrice, currency)}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 shadow-md"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              Enquire
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 4. ETHIOPIAN OPAL SPECIAL PAGE (Unique Selling Page) */}
          {/* ========================================================= */}
          {activeTab === 'opal-special' && (
            <motion.div
              key="opal-special"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header Hero Banner */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase font-semibold">
                  OUR SIGNATURE SPECIALTY
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-opal-gradient">
                  The Miracle of Ethiopian Welo Opal
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/85 leading-relaxed font-sans">
                  Volcanic silica born in the Wollo highlands of northern Ethiopia. Unmatched for its three-dimensional rolling fire, honeycomb cellular structures, and luminous crystal transparency.
                </p>
              </div>

              {/* Interactive Optical Simulation */}
              <OpalFireVisualizer />

              {/* Educational Content: What Makes It Special */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center font-serif-luxury font-bold text-lg">
                    01
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-gold-gradient">
                    Volcanic Ignimbrite Origin
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Unlike Australian sedimentary opals, Ethiopian opals formed inside rhyolite volcanic ash layers. This unique volcanic hydrothermal formation results in extraordinary crystal clarity and multidirectional 3D color reflection.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center font-serif-luxury font-bold text-lg">
                    02
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-gold-gradient">
                    Hydrophane Nature
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Most Welo opals are <em>hydrophane</em>, meaning they can temporarily absorb water, altering their translucency, and return to their full fiery glory once dry. This confirms their porous, natural silica sphere network.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center font-serif-luxury font-bold text-lg">
                    03
                  </div>
                  <h3 className="font-serif-luxury text-xl font-bold text-gold-gradient">
                    Rare Cellular Patterns
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    From the coveted honeycomb pattern resembling bee hives with glowing chambers to broadflash, rolling flash, and harlequin fire — Wollo opals display patterns never seen in other deposits.
                  </p>
                </div>
              </div>

              {/* Identification Guide: Genuine vs Synthetic */}
              <div className="bg-[#051C15] rounded-2xl border border-[#D4AF37]/30 p-8 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    BUYER AWARENESS & GEM LAB GUIDE
                  </span>
                  <h2 className="font-serif-luxury text-3xl font-bold text-gold-gradient">
                    How to Identify Genuine Natural Ethiopian Opal
                  </h2>
                  <p className="text-xs text-[#FAF6EE]/75">
                    How our Jaipur gemologists verify natural stones versus treated or synthetic imitations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Genuine */}
                  <div className="p-5 rounded-xl bg-[#07261D] border border-emerald-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Natural Untreated Ethiopian Opal</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#FAF6EE]/80">
                      <li>✦ <strong>3D Depth:</strong> Color flashes appear suspended deep inside the body rather than painted on the surface.</li>
                      <li>✦ <strong>Organic Patterning:</strong> Natural silica spheres form slightly irregular, chaotic organic patterns.</li>
                      <li>✦ <strong>Hydrophane Test:</strong> Natural Welo opal absorbs a drop of water quickly, increasing transparency without residue.</li>
                      <li>✦ <strong>Natural Inclusions:</strong> Microscopic host-rock rhyolite traces visible under 10x loupe.</li>
                    </ul>
                  </div>

                  {/* Synthetic / Treated */}
                  <div className="p-5 rounded-xl bg-[#07261D] border border-rose-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <ShieldCheck className="w-5 h-5" />
                      <span>Warning: Synthetic & Smoke Treated Imitations</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#FAF6EE]/80">
                      <li>✦ <strong>Gilson Synthetic:</strong> Displays an unnatural &quot;lizard skin&quot; or columnar pattern under magnification.</li>
                      <li>✦ <strong>Smoke / Sugar-Acid Treatment:</strong> Porous low-grade opals artificially blackened to mimic rare black opals; carbon spots visible in cracks.</li>
                      <li>✦ <strong>Plastic / Resin Imitations:</strong> Too lightweight, warm to the touch, and emits chemical odor when tested.</li>
                      <li>✦ <strong>Dyed Stones:</strong> Magenta or unnaturally uniform blues bleeding onto wet cotton pads.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Care & Maintenance Instructions */}
              <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0B3D2E] via-[#07261D] to-[#051C15] border border-[#D4AF37]/30 space-y-4">
                <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                  Care & Preservation Guide for Ethiopian Opal
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#FAF6EE]/80">
                  <div className="p-3 rounded-lg bg-[#07261D]/80 border border-[#D4AF37]/20 space-y-1">
                    <span className="font-semibold text-white block">1. Avoid Harsh Chemicals</span>
                    <p>Remove opal rings before washing hands with detergent, using perfumes, or applying household bleach.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#07261D]/80 border border-[#D4AF37]/20 space-y-1">
                    <span className="font-semibold text-white block">2. Gentle Microfiber Cleaning</span>
                    <p>Clean simply with a soft, dry lint-free cloth. Never use ultrasonic or steam jewelry cleaning machines.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#07261D]/80 border border-[#D4AF37]/20 space-y-1">
                    <span className="font-semibold text-white block">3. Balanced Humidity Storage</span>
                    <p>Store in a soft cloth pouch away from extreme heat radiators or prolonged direct baking sunlight.</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    id="opal-special-consultation-btn"
                    onClick={() => handleOpenConsultationWithStone('Ethiopian Opal (Welo Fire)')}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                  >
                    Inquire About Rare Parcel Availability
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 5. CUSTOM JEWELRY / SERVICES PAGE */}
          {/* ========================================================= */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  JAIPUR BESPOKE GOLDSMITHING & LAPIDARY
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  Custom Jewelry & Services
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                  Transform rare loose gemstones into one-of-a-kind royal heirlooms crafted in 18K gold or platinum by master artisans in Badi Chaupar, Jaipur.
                </p>
              </div>

              {/* Bespoke Process Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { step: '01', title: 'Stone Selection', desc: 'Choose an untreated Ethiopian opal, emerald, ruby, or sapphire from our inventory.' },
                  { step: '02', title: 'CAD Blueprint', desc: 'Our jewelry designers render precise 3D digital prototypes and metal proportions.' },
                  { step: '03', title: 'Jaipur Goldsmithing', desc: 'Cast and hand-forged in BIS hallmarked 18K yellow, rose, white gold or platinum.' },
                  { step: '04', title: 'Precision Setting', desc: 'Micro-prong, bezel, or traditional Kundan Jadau gold foil gem setting.' },
                  { step: '05', title: 'Lab Certification', desc: 'Independent certification report and insured worldwide priority shipping.' },
                ].map((s, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-2"
                  >
                    <span className="font-serif-luxury text-2xl font-bold text-[#D4AF37]">
                      {s.step}
                    </span>
                    <h4 className="font-serif-luxury text-base font-bold text-white">
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-[#FAF6EE]/75 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Interactive Estimator Component */}
              <CustomJewelryEstimator
                currency={currency}
                onOpenConsultation={() => setConsultationOpen(true)}
              />

              {/* Additional Services */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/25 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                    Certification & Testing
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Facilitation of authoritative laboratory reports through GTL Jaipur, GIA, and IGI for origin, heat treatment, and oiling clarity analysis.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/25 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                    Lapidary Re-polishing
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Restoration of abraded cabochons, faceting rough nodules, and precision re-cutting to enhance light return and brilliance.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/25 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold text-gold-gradient">
                    Wholesale B2B Export
                  </h3>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Supplying calibrated loose parcel lots to international jewelers, ateliers, and auction houses with certified customs clearance.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 6. GALLERY PAGE */}
          {/* ========================================================= */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  CURATED VISUAL ARCHIVE
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  The Gemstone & Atelier Gallery
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                  Click any image to view in high definition with lapidary details and bespoke stories.
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
                {[
                  { id: 'all', label: 'All Creations' },
                  { id: 'opals', label: 'Ethiopian Opals' },
                  { id: 'rings', label: 'Bespoke Rings' },
                  { id: 'loose-stones', label: 'Loose Gemstones' },
                  { id: 'necklaces', label: 'Royal Necklaces' },
                  { id: 'jaipur-craft', label: 'Jaipur Workshop' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    id={`gallery-filter-${cat.id}`}
                    onClick={() => setGalleryCategory(cat.id)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      galleryCategory === cat.id
                        ? 'bg-[#D4AF37] text-[#07261D] font-bold shadow-md'
                        : 'bg-[#051C15] text-[#FAF6EE]/70 hover:text-white border border-[#D4AF37]/20'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Masonry / Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGalleryItem(item)}
                    className="group relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 shadow-xl cursor-pointer bg-[#051C15]"
                  >
                    <div className="relative aspect-4/3 w-full overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051C15] via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-[#07261D]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-full bg-black/60 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold backdrop-blur-sm">
                          Click to View HD
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                        {item.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-gold-gradient transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#FAF6EE]/75 line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 7. TESTIMONIALS / REVIEWS PAGE */}
          {/* ========================================================= */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  WORLDWIDE TRUST & INTEGRITY
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  Collector Reviews & Testimonials
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                  Read firsthand experiences from gemstone collectors, international jewelry designers, and wedding patrons.
                </p>
              </div>

              {/* Rating Summary Banner */}
              <div className="p-8 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 text-center flex flex-col sm:flex-row items-center justify-around gap-6">
                <div>
                  <div className="flex items-center justify-center gap-2 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-serif-luxury text-4xl font-bold text-gold-gradient block mt-1">
                    4.9 / 5.0
                  </span>
                  <span className="text-xs text-[#FAF6EE]/70">
                    Average Patron Satisfaction Rating
                  </span>
                </div>

                <div className="h-12 w-[1px] bg-[#D4AF37]/20 hidden sm:block" />

                <div className="space-y-1">
                  <span className="font-serif-luxury text-3xl font-bold text-white">
                    320+ Verified Reviews
                  </span>
                  <p className="text-xs text-[#FAF6EE]/70">
                    Showroom Visitors in Badi Chaupar & Global Shipped Clients
                  </p>
                </div>

                <div className="h-12 w-[1px] bg-[#D4AF37]/20 hidden sm:block" />

                <div>
                  <a
                    id="leave-review-whatsapp-btn"
                    href={`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent('Hello Ethiopian Gems, I would like to submit a review for my purchase.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-[#0B3D2E]/80 transition-colors"
                  >
                    <span>Share Your Experience</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS_DATA.map((test) => (
                  <div
                    key={test.id}
                    className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400 gap-1">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#D4AF37] bg-[#0B3D2E] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/20">
                        {test.verifiedPurchase}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#FAF6EE]/90 leading-relaxed italic">
                      &quot;{test.quote}&quot;
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-[#D4AF37]/15">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37]">
                        <Image
                          src={test.avatarUrl}
                          alt={test.clientName}
                          fill
                          className="object-cover"
                          sizes="44px"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-base font-bold text-white">
                          {test.clientName}
                        </h4>
                        <span className="text-xs text-[#FAF6EE]/60 block">
                          {test.location} • {test.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 8. CONTACT US PAGE */}
          {/* ========================================================= */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
                  VISIT OUR BADI CHAUPAR BOUTIQUE
                </span>
                <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-gold-gradient">
                  Contact Ethiopian Gems
                </h1>
                <p className="text-xs sm:text-sm text-[#FAF6EE]/75">
                  Plan your visit to Jaipur or reach out for inquiries, wholesale parcel requests, and custom gemstone appointments.
                </p>
              </div>

              {/* Main Contact Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Form */}
                <div className="p-8 rounded-2xl bg-[#051C15] border border-[#D4AF37]/35 shadow-2xl space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                      INQUIRY & CONSULTATION
                    </span>
                    <h2 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                      Send Us a Message
                    </h2>
                    <p className="text-xs text-[#FAF6EE]/75 mt-1">
                      Our gemologists in Jaipur will respond within a few hours.
                    </p>
                  </div>

                  {contactSubmitted ? (
                    <div className="p-6 rounded-xl bg-[#0B3D2E] border border-[#D4AF37]/30 text-center space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                      <h4 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                        Message Sent Successfully
                      </h4>
                      <p className="text-xs text-[#FAF6EE]/80">
                        {contactFeedback || `Thank you, ${contactForm.name}. We have received your inquiry regarding ${contactForm.gemstone}. We will contact you at ${contactForm.phone}.`}
                      </p>
                      <button
                        id="contact-whatsapp-followup"
                        onClick={handleWhatsAppContact}
                        className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 mx-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Continue on WhatsApp
                      </button>
                    </div>
                  ) : (
                    <form action="./contact.php" method="POST" onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                      {/* Anti-spam honeypot */}
                      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div>
                        <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Your Name *</label>
                        <input
                          type="text"
                          required
                          id="contact-form-name"
                          placeholder="Julian Vance"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            id="contact-form-phone"
                            placeholder="+91 82095 44682"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Email Address</label>
                          <input
                            type="email"
                            id="contact-form-email"
                            placeholder="patron@example.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Primary Interest</label>
                        <select
                          id="contact-form-gemstone"
                          value={contactForm.gemstone}
                          onChange={(e) => setContactForm({ ...contactForm, gemstone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white outline-none cursor-pointer"
                        >
                          <option value="Ethiopian Opal (Welo Fire)">Ethiopian Opal (Welo Fire Cabochons)</option>
                          <option value="Colombian / Zambian Emerald">Emerald (Jaipur Cut)</option>
                          <option value="Burmese / Mozambique Ruby">Ruby (Unheated)</option>
                          <option value="Ceylon Blue Sapphire">Ceylon Blue & Yellow Sapphire</option>
                          <option value="Custom Bespoke Jewelry">Custom Bespoke Ring or Necklace</option>
                          <option value="Wholesale Gem Parcels">Wholesale Parcels for Jeweler</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Your Message / Specifics</label>
                        <textarea
                          rows={3}
                          id="contact-form-message"
                          placeholder="Please let us know your preferred carat weight, dimensions, or showroom visit date."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#07261D] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-white outline-none resize-none"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-3">
                        <button
                          type="submit"
                          id="contact-form-submit"
                          disabled={contactSubmitting}
                          className="flex-1 py-3 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5 disabled:opacity-60"
                        >
                          {contactSubmitting ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-[#07261D] border-t-transparent rounded-full animate-spin" />
                              Transmitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              Submit Inquiry
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          id="contact-fast-whatsapp"
                          onClick={handleWhatsAppContact}
                          className="py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp Directly
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Right Column: Address, Hours, & Interactive Location */}
                <div className="space-y-6">
                  {/* Address Card */}
                  <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0B3D2E] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                          SHOWROOM ADDRESS
                        </span>
                        <h3 className="font-serif-luxury text-lg font-bold text-white">
                          Ethiopian Gems
                        </h3>
                        <p className="text-[#FAF6EE]/90 mt-1 leading-relaxed">
                          {COMPANY_INFO.address.floor}, <br />
                          {COMPANY_INFO.address.landmark}, <br />
                          {COMPANY_INFO.address.area}, <br />
                          {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.pincode}, India
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between flex-wrap gap-2">
                      <a
                        id="contact-call-link"
                        href={`tel:${COMPANY_INFO.phoneClean}`}
                        className="flex items-center gap-1.5 text-[#D4AF37] font-semibold hover:underline"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{COMPANY_INFO.phoneDisplay}</span>
                      </a>
                      <a
                        id="contact-maps-link"
                        href={COMPANY_INFO.social.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white underline hover:text-[#D4AF37]"
                      >
                        Get Directions on Google Maps →
                      </a>
                    </div>
                  </div>

                  {/* Trading Hours Card */}
                  <div className="p-6 rounded-2xl bg-[#051C15] border border-[#D4AF37]/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                      <span className="font-serif-luxury text-base font-bold text-gold-gradient flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        Showroom Business Hours
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${storeStatus.isOpen ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-400/40' : 'bg-amber-900/60 text-amber-300 border border-amber-400/40'}`}>
                        {storeStatus.statusText}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-[#FAF6EE]/85">
                      <div className="flex justify-between py-1 border-b border-[#D4AF37]/10">
                        <span>Monday – Saturday:</span>
                        <span className="font-semibold text-white">11:00 AM – 8:00 PM IST</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#D4AF37]/10 text-amber-300/90">
                        <span>Sunday:</span>
                        <span className="font-semibold">Closed</span>
                      </div>
                      <p className="text-[11px] text-[#FAF6EE]/60 pt-1">
                        * Private after-hours viewings and virtual video consultations can be scheduled in advance.
                      </p>
                    </div>
                  </div>

                  {/* Visual Map Representation */}
                  <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-2xl relative h-64 bg-[#07261D]">
                    <iframe
                      title="Ethiopian Gems Location Badi Chaupar Jaipur"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.3486000000004!2d75.8245!3d26.9239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db1445b23d537%3A0x8e833f44606114ec!2sBadi%20Chaupar%2C%20Jaipur%2C%20Rajasthan%20302003!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                      className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#051C15]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1.5 pointer-events-none">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Badi Chaupar Landmark Hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenConsultation={() => {
          setConsultationPrefill('');
          setConsultationOpen(true);
        }}
      />

      {/* Global Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Global Modals */}
      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        prefilledStone={consultationPrefill}
      />

      <ProductDetailModal
        stone={selectedGemstone}
        onClose={() => setSelectedGemstone(null)}
        currency={currency}
        onBookInspection={(stoneName) => handleOpenConsultationWithStone(stoneName)}
      />

      <LightboxModal
        item={selectedGalleryItem}
        items={GALLERY_DATA}
        onClose={() => setSelectedGalleryItem(null)}
        onSelect={(item) => setSelectedGalleryItem(item)}
      />
    </div>
  );
}
