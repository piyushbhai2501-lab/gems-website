'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  MessageCircle, 
  Layers, 
  Hammer, 
  Gem, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';
import { CurrencyCode, formatPrice } from '@/lib/currency';

interface CustomJewelryEstimatorProps {
  currency: CurrencyCode;
  onOpenConsultation: () => void;
}

const PIECE_TYPES = [
  { id: 'ring', label: 'Bespoke Ring', baseInr: 45000, icon: '💍', desc: 'Solitaire, halo, or signet setting' },
  { id: 'pendant', label: 'Statement Pendant', baseInr: 35000, icon: '✨', desc: 'Drop pendant or heirloom locket' },
  { id: 'earrings', label: 'Earrings Pair', baseInr: 55000, icon: '💎', desc: 'Studs, drops, or chandeliers' },
  { id: 'necklace', label: 'Royal Choker / Hasli', baseInr: 120000, icon: '👑', desc: 'Jaipur royal necklace architecture' },
  { id: 'bracelet', label: 'Kada / Cuff / Tennis', baseInr: 75000, icon: '⚜️', desc: 'Hinged cuff or tennis setting' },
];

const GEMSTONE_TYPES = [
  { id: 'opal', label: 'Natural Ethiopian Welo Opal', caratRate: 15000, desc: 'Fiery 3D play-of-color' },
  { id: 'emerald', label: 'Zambian / Colombian Emerald', caratRate: 35000, desc: 'Vivid royal green beryl' },
  { id: 'ruby', label: 'Burma / Mozambique Ruby', caratRate: 45000, desc: 'Unheated crimson corundum' },
  { id: 'sapphire', label: 'Ceylon Blue Sapphire', caratRate: 30000, desc: 'Cornflower & royal blue' },
  { id: 'pearl', label: 'South Sea / Basra Pearl', caratRate: 12000, desc: 'Champagne gold & ivory luster' },
];

const METALS = [
  { id: '18k-yellow', label: '18K Royal Yellow Gold', multiplier: 1.0, desc: 'Traditional warm gold luster' },
  { id: '18k-rose', label: '18K Vintage Rose Gold', multiplier: 1.05, desc: 'Warm romantic copper alloy' },
  { id: '18k-white', label: '18K Palladium White Gold', multiplier: 1.1, desc: 'High-polish rhodium finish' },
  { id: 'platinum', label: '950 Pure Platinum', multiplier: 1.35, desc: 'Hypoallergenic dense precious metal' },
  { id: 'silver', label: '925 Sterling Silver', multiplier: 0.35, desc: 'Hand-oxidized artisanal finish' },
];

const ACCENTS = [
  { id: 'none', label: 'Pure Solitaire (No Accents)', addInr: 0 },
  { id: 'diamond-halo', label: 'Natural VS-SI Diamonds (0.35 ct)', addInr: 28000 },
  { id: 'kundan', label: 'Jaipur Kundan Jadau Gold Foil', addInr: 35000 },
  { id: 'baguettes', label: 'Tapered Diamond Baguettes', addInr: 42000 },
];

export default function CustomJewelryEstimator({
  currency,
  onOpenConsultation,
}: CustomJewelryEstimatorProps) {
  const [selectedPiece, setSelectedPiece] = useState(PIECE_TYPES[0]);
  const [selectedGem, setSelectedGem] = useState(GEMSTONE_TYPES[0]);
  const [caratWeight, setCaratWeight] = useState(5.0);
  const [selectedMetal, setSelectedMetal] = useState(METALS[0]);
  const [selectedAccent, setSelectedAccent] = useState(ACCENTS[1]);

  // Compute calculated estimate
  const metalLaborBase = selectedPiece.baseInr * selectedMetal.multiplier;
  const gemstoneCost = selectedGem.caratRate * caratWeight;
  const totalInrEstimate = Math.round(metalLaborBase + gemstoneCost + selectedAccent.addInr);

  const handleWhatsAppSend = () => {
    const formatted = formatPrice(totalInrEstimate, currency);
    const text = `Namaste Ethiopian Gems Atelier, I created a custom jewelry estimate on your website:\n• Piece: ${selectedPiece.label}\n• Gemstone: ${selectedGem.label} (~${caratWeight} ct)\n• Metal: ${selectedMetal.label}\n• Accent: ${selectedAccent.label}\n• Estimated Value: ~${formatted}\n\nPlease share design sketches / CAD portfolio and gemstone options available in Badi Chaupar showroom.`;
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-[#051C15] border border-[#D4AF37]/35 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
            JAIPUR BESPOKE JEWELRY ATELIER
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-gold-gradient mt-1">
            Bespoke Creation & Price Estimator
          </h3>
          <p className="text-xs text-[#FAF6EE]/80 mt-2">
            Configure your custom heirloom piece crafted by Jaipur&apos;s master goldsmiths and gem-setters.
          </p>
        </div>

        {/* 4-Step Interactive Form */}
        <div className="space-y-6 text-xs">
          {/* Step 1: Piece Type */}
          <div>
            <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2.5">
              1. Choose Jewelry Silhouette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {PIECE_TYPES.map((p) => (
                <button
                  key={p.id}
                  id={`estimator-piece-${p.id}`}
                  onClick={() => setSelectedPiece(p)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedPiece.id === p.id
                      ? 'bg-[#0B3D2E] border-[#D4AF37] text-white shadow-md ring-1 ring-[#D4AF37]'
                      : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <span className="text-2xl block mb-1">{p.icon}</span>
                  <span className="font-semibold block text-xs">{p.label}</span>
                  <span className="text-[10px] text-[#FAF6EE]/60 block mt-0.5">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Gemstone & Carat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                2. Center Gemstone Selection
              </label>
              <div className="space-y-1.5">
                {GEMSTONE_TYPES.map((g) => (
                  <button
                    key={g.id}
                    id={`estimator-gem-${g.id}`}
                    onClick={() => setSelectedGem(g)}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                      selectedGem.id === g.id
                        ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                        : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block">{g.label}</span>
                      <span className="text-[10px] text-[#FAF6EE]/60">{g.desc}</span>
                    </div>
                    {selectedGem.id === g.id && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                Center Gemstone Carat Weight: <span className="text-white font-bold">{caratWeight} ct</span>
              </label>
              <div className="p-4 rounded-xl bg-[#07261D] border border-[#D4AF37]/20 space-y-4">
                <input
                  id="estimator-carat-slider"
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.5"
                  value={caratWeight}
                  onChange={(e) => setCaratWeight(parseFloat(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#FAF6EE]/60">
                  <span>2.0 ct (Delicate)</span>
                  <span>7.0 ct (Cocktail)</span>
                  <span>15.0 ct (Royal Collector)</span>
                </div>
                <p className="text-[11px] text-[#FAF6EE]/80 leading-relaxed bg-[#051C15] p-2.5 rounded-lg border border-[#D4AF37]/15">
                  ✦ Sourced untreated from Wollo, Ethiopia or royal global mines. Certified with complete origin verification.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 & 4: Metal & Accents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                3. Metal Setting (BIS Hallmarked)
              </label>
              <div className="space-y-1.5">
                {METALS.map((m) => (
                  <button
                    key={m.id}
                    id={`estimator-metal-${m.id}`}
                    onClick={() => setSelectedMetal(m)}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                      selectedMetal.id === m.id
                        ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                        : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-xs block">{m.label}</span>
                      <span className="text-[10px] text-[#FAF6EE]/60">{m.desc}</span>
                    </div>
                    {selectedMetal.id === m.id && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                4. Halo & Accent Embellishment
              </label>
              <div className="space-y-1.5">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    id={`estimator-accent-${a.id}`}
                    onClick={() => setSelectedAccent(a)}
                    className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                      selectedAccent.id === a.id
                        ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                        : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <span className="font-semibold text-xs block">{a.label}</span>
                    {selectedAccent.id === a.id && <Check className="w-4 h-4 text-[#D4AF37]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Calculated Estimate Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B3D2E] via-[#07261D] to-[#051C15] border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#D4AF37] block">
              Estimated Total Investment
            </span>
            <div className="text-3xl sm:text-4xl font-serif-luxury font-bold text-gold-gradient mt-1">
              {formatPrice(totalInrEstimate, currency)}
            </div>
            <p className="text-xs text-[#FAF6EE]/70 mt-1">
              Includes certified natural stone, {selectedMetal.label}, CAD blueprint, artisan setting & insured shipping.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              id="estimator-whatsapp-submit"
              onClick={handleWhatsAppSend}
              className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Discuss on WhatsApp (+91 82095 44682)
            </button>
            <button
              id="estimator-book-consult-btn"
              onClick={onOpenConsultation}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              Book Design Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
