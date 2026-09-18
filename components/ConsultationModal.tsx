'use client';

import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, MapPin, Video, CheckCircle2, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledStone?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  prefilledStone = '',
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    consultationType: 'in-person', // 'in-person' | 'virtual'
    date: '',
    gemstoneInterest: prefilledStone || 'Ethiopian Opal',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const text = `Namaste Ethiopian Gems, I would like to confirm a consultation:\n• Name: ${formData.name || 'Collector'}\n• Phone: ${formData.phone}\n• Type: ${formData.consultationType === 'in-person' ? 'Showroom Visit (Badi Chaupar Jaipur)' : 'Virtual HD Video Inspection'}\n• Preferred Date: ${formData.date || 'Earliest available'}\n• Interest: ${formData.gemstoneInterest}\n• Notes: ${formData.notes || 'None'}`;
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#07261D] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden text-[#FAF6EE]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B3D2E] to-[#051C15] p-6 border-b border-[#D4AF37]/25 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase font-semibold block">
              JAIPUR GEMSTONE ATELIER
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
              Book Private Gem Consultation
            </h3>
          </div>
          <button
            id="close-consultation-modal"
            onClick={onClose}
            className="p-1.5 text-[#FAF6EE]/60 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
                Consultation Request Received
              </h4>
              <p className="text-sm text-[#FAF6EE]/80 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name || 'esteemed collector'}. Our master gemologist in Badi Chaupar, Jaipur will review your request and contact you at <span className="text-[#D4AF37] font-semibold">{formData.phone}</span> within 2 business hours.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  id="consultation-confirm-whatsapp-btn"
                  onClick={handleWhatsAppBooking}
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Fast-Track on WhatsApp
                </button>
                <button
                  id="consultation-done-btn"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-[#0B3D2E] hover:bg-[#0B3D2E]/80 border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Type Selection */}
              <div>
                <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                  Select Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    id="consult-type-inperson"
                    onClick={() => setFormData({ ...formData, consultationType: 'in-person' })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      formData.consultationType === 'in-person'
                        ? 'bg-[#0B3D2E] border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#051C15]/70 border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-sm">Jaipur Showroom</span>
                      <span className="text-[11px] opacity-80">1st Floor, Jamali Mension, Badi Chaupar</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    id="consult-type-virtual"
                    onClick={() => setFormData({ ...formData, consultationType: 'virtual' })}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      formData.consultationType === 'virtual'
                        ? 'bg-[#0B3D2E] border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-[#051C15]/70 border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-sm">Live HD Video Call</span>
                      <span className="text-[11px] opacity-80">Microscopic opal & gem inspection</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    id="consult-input-name"
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    id="consult-input-phone"
                    placeholder="+91 82095 44682"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none"
                  />
                </div>
              </div>

              {/* Email & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    id="consult-input-email"
                    placeholder="collector@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Preferred Date</label>
                  <input
                    type="date"
                    id="consult-input-date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none"
                  />
                </div>
              </div>

              {/* Gemstone Interest */}
              <div>
                <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Gemstone or Jewelry Focus</label>
                <select
                  id="consult-select-interest"
                  value={formData.gemstoneInterest}
                  onChange={(e) => setFormData({ ...formData, gemstoneInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none"
                >
                  <option value="Ethiopian Opal (Welo Fire)">Ethiopian Opal (Welo Fire / Honeycomb)</option>
                  <option value="Colombian / Zambian Emerald">Zambian / Colombian Emerald</option>
                  <option value="Burmese / Mozambique Ruby">Burmese / Mozambique Ruby</option>
                  <option value="Ceylon Blue Sapphire">Ceylon Blue & Yellow Sapphire</option>
                  <option value="Bespoke Custom Jewelry">Bespoke Custom Jewelry Making (Rings, Necklaces)</option>
                  <option value="Astrological Vedic Stones">Astrological Vedic Unheated Stones</option>
                  <option value="Wholesale Loose Parcels">Wholesale Parcels for Jewelry Designers</option>
                </select>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[#FAF6EE]/80 mb-1 font-medium">Special Requirements / Carat Range</label>
                <textarea
                  rows={2}
                  id="consult-input-notes"
                  placeholder="e.g., Looking for a 7-10 carat untreated Ethiopian opal cabochon with strong red fire for a ring."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#051C15] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-[#FAF6EE] outline-none resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="consult-submit-btn"
                  className="w-full py-3.5 bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Confirm Private Appointment Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
