'use client';

import React, { useState } from 'react';
import { Sparkles, Sun, Flame, RotateCcw, Info, Sliders, Eye } from 'lucide-react';
import { OPAL_FIRE_PATTERNS } from '@/data/gemstones';

export default function OpalFireVisualizer() {
  const [tiltAngle, setTiltAngle] = useState(45);
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [lightSource, setLightSource] = useState<'sunlight' | 'halogen' | 'torch'>('sunlight');

  const pattern = OPAL_FIRE_PATTERNS[selectedPattern];

  // Compute dynamic hue shifts based on tiltAngle and lightSource
  const hueShift = (tiltAngle * 2.8) % 360;
  const secondaryHue = (hueShift + 120) % 360;
  const tertiaryHue = (hueShift + 240) % 360;

  const getBackgroundStyle = () => {
    if (pattern.name.includes('Honeycomb')) {
      return `radial-gradient(circle at ${tiltAngle}% ${100 - tiltAngle}%, hsla(${hueShift}, 95%, 60%, 0.85) 0%, hsla(${secondaryHue}, 90%, 55%, 0.6) 35%, hsla(${tertiaryHue}, 85%, 50%, 0.4) 70%, rgba(10, 30, 25, 0.95) 100%)`;
    }
    if (pattern.name.includes('Harlequin')) {
      return `conic-gradient(from ${tiltAngle * 3}deg at 50% 50%, hsla(${hueShift}, 100%, 65%, 0.9), hsla(${secondaryHue}, 95%, 60%, 0.8), hsla(${tertiaryHue}, 100%, 65%, 0.85), hsla(${hueShift}, 100%, 65%, 0.9))`;
    }
    if (pattern.name.includes('Pinfire')) {
      return `radial-gradient(circle at ${50 + Math.sin(tiltAngle) * 30}% ${50 + Math.cos(tiltAngle) * 30}%, hsla(${hueShift}, 90%, 70%, 0.9) 10%, hsla(${secondaryHue}, 85%, 60%, 0.5) 40%, rgba(15, 40, 30, 0.9) 90%)`;
    }
    // Rolling Flash
    return `linear-gradient(${tiltAngle * 2}deg, hsla(${hueShift}, 95%, 65%, 0.9) 0%, hsla(${secondaryHue}, 90%, 60%, 0.6) 50%, hsla(${tertiaryHue}, 85%, 55%, 0.9) 100%)`;
  };

  return (
    <div className="bg-[#051C15] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Shimmer */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-pink-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        {/* Left Side: Interactive Opal Dome */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              INTERACTIVE OPTICAL SIMULATION
            </span>
            <h3 className="font-serif-luxury text-2xl font-bold text-gold-gradient">
              3D &quot;Play-of-Color&quot; Simulator
            </h3>
            <p className="text-xs text-[#FAF6EE]/75 mt-1">
              Move the tilt angle slider to observe diffraction by natural silica spheres
            </p>
          </div>

          {/* Simulated Cabochon */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-3 bg-gradient-to-b from-[#D4AF37] via-[#997718] to-[#453407] shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center">
            {/* The Gem Dome */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden shadow-inner flex items-center justify-center transition-all duration-300"
              style={{
                background: getBackgroundStyle(),
                boxShadow: 'inset 0 10px 30px rgba(255,255,255,0.4), inset 0 -15px 35px rgba(0,0,0,0.7)',
              }}
            >
              {/* Internal Honeycomb / Silk Grid Overlay */}
              {pattern.name.includes('Honeycomb') && (
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 2px)',
                    backgroundSize: '16px 16px',
                  }}
                />
              )}

              {/* Specular Light Reflection */}
              <div
                className="absolute w-20 h-10 rounded-full bg-white/40 blur-md pointer-events-none transform -rotate-45"
                style={{
                  top: `${15 + (tiltAngle / 180) * 20}%`,
                  left: `${20 + (tiltAngle / 180) * 15}%`,
                }}
              />

              <div className="text-center p-4 bg-black/40 backdrop-blur-xs rounded-xl border border-white/20 text-white shadow-lg pointer-events-none">
                <span className="text-[10px] tracking-wider uppercase font-medium text-amber-200 block">
                  Simulated Fire
                </span>
                <span className="text-xs font-serif-luxury font-bold">
                  {pattern.name}
                </span>
                <span className="text-[10px] text-emerald-300 block mt-0.5">
                  Tilt: {tiltAngle}°
                </span>
              </div>
            </div>
          </div>

          {/* Tilt Control Slider */}
          <div className="w-full max-w-xs mt-6 space-y-2">
            <div className="flex justify-between text-xs text-[#FAF6EE]/80">
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
                Incident Light Angle
              </span>
              <span className="font-semibold text-[#D4AF37]">{tiltAngle}°</span>
            </div>
            <input
              id="tilt-angle-slider"
              type="range"
              min="0"
              max="180"
              value={tiltAngle}
              onChange={(e) => setTiltAngle(Number(e.target.value))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
          </div>
        </div>

        {/* Right Side: Optical Controls & Gemological Insights */}
        <div className="w-full lg:w-1/2 space-y-5 text-xs text-[#FAF6EE]/90">
          {/* Pattern Selector */}
          <div>
            <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2.5">
              Select Optical Fire Phenomenon:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {OPAL_FIRE_PATTERNS.map((p, idx) => (
                <button
                  key={idx}
                  id={`pattern-btn-${idx}`}
                  onClick={() => setSelectedPattern(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedPattern === idx
                      ? 'bg-[#0B3D2E] border-[#D4AF37] text-white shadow-md'
                      : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#FAF6EE]">{p.name}</span>
                    <span className="text-[10px] text-amber-300">{p.rarity}</span>
                  </div>
                  <p className="text-[10px] text-[#FAF6EE]/70 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Light Source Switcher */}
          <div>
            <label className="block font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
              Illumination Environment:
            </label>
            <div className="flex gap-2">
              <button
                id="light-sunlight"
                onClick={() => setLightSource('sunlight')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all ${
                  lightSource === 'sunlight'
                    ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                    : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70'
                }`}
              >
                <Sun className="w-3.5 h-3.5 mx-auto mb-1 text-amber-300" />
                <span>Natural Daylight</span>
              </button>
              <button
                id="light-halogen"
                onClick={() => setLightSource('halogen')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all ${
                  lightSource === 'halogen'
                    ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                    : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70'
                }`}
              >
                <Flame className="w-3.5 h-3.5 mx-auto mb-1 text-orange-400" />
                <span>Warm Halogen</span>
              </button>
              <button
                id="light-torch"
                onClick={() => setLightSource('torch')}
                className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all ${
                  lightSource === 'torch'
                    ? 'bg-[#0B3D2E] border-[#D4AF37] text-white'
                    : 'bg-[#07261D] border-[#D4AF37]/20 text-[#FAF6EE]/70'
                }`}
              >
                <Eye className="w-3.5 h-3.5 mx-auto mb-1 text-cyan-300" />
                <span>Gem Torch</span>
              </button>
            </div>
          </div>

          {/* Gemological Science Box */}
          <div className="p-4 rounded-xl bg-[#07261D] border border-[#D4AF37]/25 space-y-2">
            <h5 className="font-serif-luxury text-sm text-gold-gradient font-semibold flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#D4AF37]" />
              Why Ethiopian (Welo) Opal Fire Is Unique
            </h5>
            <p className="text-[11px] text-[#FAF6EE]/80 leading-relaxed">
              Unlike traditional Australian opals formed in sedimentary rock, Ethiopian opals originate from volcanic ignimbrite deposits in the Wollo highlands. This volcanic crystallization creates <strong>hydrophane</strong> silica structures that produce remarkable <strong>3-dimensional color depth</strong>, where neon flashes appear suspended inside crystal water.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
