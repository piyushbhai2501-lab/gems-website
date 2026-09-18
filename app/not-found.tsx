'use client';

import Link from 'next/link';
import { Gem, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07261D] text-[#FAF6EE] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-[#051C15] border border-[#D4AF37]/30 rounded-2xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#0B3D2E] border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
          <Gem className="w-8 h-8 animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
            Rare Specimen Not Found
          </span>
          <h1 className="font-serif-luxury text-4xl font-bold text-gold-gradient">
            404
          </h1>
          <p className="text-sm text-[#FAF6EE]/75 leading-relaxed">
            The gemstone parcel or boutique page you are searching for does not exist or has been relocated in our Jaipur catalog.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F4E297] via-[#D4AF37] to-[#C9A227] text-[#07261D] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Atelier Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
