export interface Gemstone {
  id: string;
  name: string;
  category: 'opal' | 'emerald' | 'ruby' | 'sapphire' | 'pearl' | 'semi-precious';
  carat: number;
  origin: string;
  cut: string;
  dimensions: string;
  clarity: string;
  treatment: string;
  inrPrice: number;
  featured?: boolean;
  colorPlay?: string;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  certification: string;
  stockStatus: 'In Stock' | 'Bespoke Order' | 'Reserved';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'opals' | 'rings' | 'loose-stones' | 'necklaces' | 'jaipur-craft';
  imageUrl: string;
  caption: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  rating: number;
  date: string;
  verifiedPurchase: string;
  quote: string;
  avatarUrl: string;
  jewelryType?: string;
}

export const GEMSTONES_DATA: Gemstone[] = [
  {
    id: 'eg-opal-01',
    name: 'Royal Welo Fire Opal Cabochon',
    category: 'opal',
    carat: 8.45,
    origin: 'Wollo Province, Ethiopia',
    cut: 'High Dome Oval Cabochon',
    dimensions: '16.2 x 12.8 x 7.4 mm',
    clarity: 'Crystal Transparent with Vivid Fire',
    treatment: '100% Natural, Untreated & Unheated',
    inrPrice: 125000,
    featured: true,
    colorPlay: 'Intense 3D Harlequin & Neon Green-Red-Violet flash',
    description:
      'A museum-grade natural Ethiopian Welo Opal displaying electric multicolor play-of-color from every angle. Sourced directly from Delanta plateau mines in Wollo, expertly hand-polished in our Jaipur lapidary.',
    imageUrl: '/images/gems/welo-opal.jpg',
    additionalImages: [
      '/images/gems/honeycomb-opal.jpg',
      '/images/gems/rough-opal-mined.jpg',
    ],
    certification: 'IGI & GIA Certified Authenticity',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-opal-02',
    name: 'Honeycomb Pattern Honey Welo Opal',
    category: 'opal',
    carat: 12.80,
    origin: 'Wollo, Ethiopia',
    cut: 'Cushion Cabochon',
    dimensions: '18.5 x 14.1 x 8.6 mm',
    clarity: 'Semi-Translucent Warm Honey Base',
    treatment: 'Natural Hydrophane, Untreated',
    inrPrice: 210000,
    featured: true,
    colorPlay: 'Rare Hexagonal Honeycomb Fire with Emerald & Scarlet flares',
    description:
      'The coveted honeycomb structure is among the rarest visual phenomena in the gemstone kingdom. Perfectly proportioned for an heirloom statement ring or bespoke pendant.',
    imageUrl: '/images/gems/honeycomb-opal.jpg',
    additionalImages: [
      '/images/gems/welo-opal.jpg',
    ],
    certification: 'GTL Jaipur & Lab Certified',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-emerald-01',
    name: 'Jaipur Heritage Zambian Emerald',
    category: 'emerald',
    carat: 5.62,
    origin: 'Kagem Mine, Zambia',
    cut: 'Traditional Octagonal Emerald Cut',
    dimensions: '11.4 x 9.8 x 6.2 mm',
    clarity: 'Minor Jardin (Natural inclusions characteristic of fine beryl)',
    treatment: 'Insignificant Traditional Cedarwood Oil',
    inrPrice: 285000,
    featured: true,
    description:
      'A deep, velvety green emerald exhibiting high saturation and luminous crystal luster. Cut with mathematical precision by 4th-generation Jaipur master gemstone cutters.',
    imageUrl: '/images/gems/zambian-emerald.jpg',
    additionalImages: [
      '/images/gems/kundan-necklace.jpg',
    ],
    certification: 'GIA Verified Natural Beryl',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-ruby-01',
    name: 'Pigeon Blood Royal Burma Ruby',
    category: 'ruby',
    carat: 4.18,
    origin: 'Mogok Valley, Myanmar',
    cut: 'Oval Brilliant / Step Cut',
    dimensions: '10.2 x 8.4 x 5.8 mm',
    clarity: 'Transparent Crystal, Vivid Saturation',
    treatment: 'No Heat Detected, 100% Unheated',
    inrPrice: 420000,
    featured: true,
    description:
      'A majestic untreated ruby boasting the celebrated "pigeon blood" crimson hue with intense internal red fluorescence under daylight.',
    imageUrl: '/images/gems/burma-ruby.jpg',
    certification: 'Gübelin & IGI Heritage Report',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-sapphire-01',
    name: 'Cornflower Blue Ceylon Sapphire',
    category: 'sapphire',
    carat: 6.74,
    origin: 'Ratnapura, Sri Lanka',
    cut: 'Cushion Mixed Cut',
    dimensions: '12.1 x 10.5 x 6.9 mm',
    clarity: 'Eye Clean (VVS)',
    treatment: 'Unheated Natural Corundum',
    inrPrice: 340000,
    featured: true,
    description:
      'Velvety royal cornflower blue tone with exceptional brilliance and crystal clarity. Ideal for a timeless engagement or royal cocktail ring.',
    imageUrl: '/images/gems/ceylon-sapphire.jpg',
    certification: 'GIA & GRS Certified Royal Blue',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-opal-03',
    name: 'Sunset Nebula Black Ethiopian Opal',
    category: 'opal',
    carat: 7.15,
    origin: 'Shewa Province, Ethiopia',
    cut: 'Teardrop Pear Cabochon',
    dimensions: '15.8 x 10.2 x 6.5 mm',
    clarity: 'Smoky Dark Body Color',
    treatment: 'Natural Chocolate/Dark Base',
    inrPrice: 165000,
    featured: false,
    colorPlay: 'Electric Magenta, Amber & Cobalt blue rolling flash',
    description:
      'A rare dark-bodied Ethiopian opal displaying fiery rolling flashes of magenta and cobalt. The contrast against the smoky body makes this piece truly mesmerizing.',
    imageUrl: '/images/gems/dark-smoke-opal.jpg',
    certification: 'IGI Lab Certified',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-pearl-01',
    name: 'Lustrous South Sea Golden Pearl',
    category: 'pearl',
    carat: 14.2, // ~13.5mm
    origin: 'Palawan Waters, Philippines',
    cut: 'Perfect Spherical (13.8 mm)',
    dimensions: '13.8 mm Diameter',
    clarity: 'Flawless Mirror Luster',
    treatment: '100% Natural Color, Untreated',
    inrPrice: 95000,
    featured: false,
    description:
      'Deep 24k champagne-gold tone with thick nacre and radiant mirror-like surface reflection. Set or kept loose for custom luxury pieces.',
    imageUrl: '/images/gems/south-sea-pearl.jpg',
    certification: 'Jaipur Gemological Certificate',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-semi-01',
    name: 'Bi-Color Paraiba & Chrome Tourmaline',
    category: 'semi-precious',
    carat: 9.30,
    origin: 'Mozambique & Rajasthan',
    cut: 'Baguette Bar Cut',
    dimensions: '16.0 x 7.5 x 5.2 mm',
    clarity: 'VVS Eye Clean',
    treatment: 'Untreated',
    inrPrice: 88000,
    featured: false,
    description:
      'Striking zoning between neon blue-green and deep forest hues, custom faceted in Jaipur with architectural pavilion steps.',
    imageUrl: '/images/gems/bicolor-tourmaline.jpg',
    certification: 'Authenticity Guarantee Card',
    stockStatus: 'In Stock',
  },
  {
    id: 'eg-opal-04',
    name: 'Crystal Fire Opal Solitaire Ring (18K Gold)',
    category: 'opal',
    carat: 5.2,
    origin: 'Wollo Ethiopia / Handcrafted in Jaipur',
    cut: 'Oval Cabochon with Diamond Halo',
    dimensions: 'Ring Size: Adjustable / 14-18',
    clarity: 'Eye Clean Crystal Base',
    treatment: 'Natural Stone, 18K Hallmarked Yellow Gold',
    inrPrice: 175000,
    featured: true,
    colorPlay: 'Vivid Neon Red & Peacock Green flash',
    description:
      'A completed bespoke creation featuring a 5.20 ct Ethiopian Opal framed by 0.45 ct round brilliant diamonds in solid 18K antique-finished yellow gold.',
    imageUrl: '/images/gems/opal-gold-ring.jpg',
    certification: 'BIS Hallmarked Gold + IGI Stone Card',
    stockStatus: 'In Stock',
  },
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'High-Dome Ethiopian Opal Fire',
    category: 'opals',
    imageUrl: '/images/gems/welo-opal.jpg',
    caption: '10.5 carat untreated Wollo opal showing electric 3D red and green fire play under direct sunlight.',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-2',
    title: 'Bespoke 18K Opal & Diamond Ring',
    category: 'rings',
    imageUrl: '/images/gems/opal-gold-ring.jpg',
    caption: 'Handcrafted cocktail ring designed for an international collector in London, set in recycled 18K yellow gold.',
    aspectRatio: 'square',
  },
  {
    id: 'gal-3',
    title: 'Precision Lapidary in Badi Chaupar',
    category: 'jaipur-craft',
    imageUrl: '/images/gems/jaipur-artisan.jpg',
    caption: 'Master artisan in our Jaipur workshop shaping rough Ethiopian opal nodules with diamond water wheels.',
    aspectRatio: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Royal Zambian Emerald Specimen',
    category: 'loose-stones',
    imageUrl: '/images/gems/zambian-emerald.jpg',
    caption: 'A vivid green octagonal step-cut emerald exhibiting high crystal saturation and natural jardin.',
    aspectRatio: 'square',
  },
  {
    id: 'gal-5',
    title: 'Opal & Pearl Kundan Meenakari Choker',
    category: 'necklaces',
    imageUrl: '/images/gems/kundan-necklace.jpg',
    caption: 'Traditional Rajasthani Kundan craftsmanship fused with natural Ethiopian Welo opals and Basra seed pearls.',
    aspectRatio: 'portrait',
  },
  {
    id: 'gal-6',
    title: 'Natural Rough Opal Parcel Inspection',
    category: 'opals',
    imageUrl: '/images/gems/rough-opal-mined.jpg',
    caption: 'Direct ethical parcel arriving from Delanta mines to our Badi Chaupar gem sorting room.',
    aspectRatio: 'landscape',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'rev-1',
    clientName: 'Julian Vance-Moreau',
    location: 'Geneva, Switzerland',
    rating: 5,
    date: 'February 2026',
    verifiedPurchase: '11.4ct Welo Opal Cabochon & Custom Ring',
    quote:
      'Finding true, untreated Ethiopian opals with genuine honeycomb pattern is notoriously difficult. Ethiopian Gems in Jaipur provided full IGI certification, macroeconomic transparency, and the fire in the stone is beyond anything photos can convey. The WhatsApp video inspection process was flawless.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    jewelryType: 'Custom 18K Platinum-Gold Ring',
  },
  {
    id: 'rev-2',
    clientName: 'Sunita & Rajesh Singhania',
    location: 'Mumbai & Dubai',
    rating: 5,
    date: 'January 2026',
    verifiedPurchase: 'Royal Emerald & Ethiopian Opal Bridal Suite',
    quote:
      'We visited their showroom on the 1st Floor of Jamali Mension in Badi Chaupar during our Jaipur trip. The warmth, deep gemological knowledge, and fair pricing without retail markups made our wedding jewelry purchase an unforgettable experience.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    jewelryType: 'Bridal Choker & Earrings Suite',
  },
  {
    id: 'rev-3',
    clientName: 'Elena Rostova',
    location: 'Milan, Italy',
    rating: 5,
    date: 'December 2025',
    verifiedPurchase: 'Loose Gemstones Wholesale Parcel',
    quote:
      'As a high jewelry designer in Milan, sourcing dependable, unheated stones with exact dimensions is critical. Ethiopian Gems has been our most trusted partner in India for Ethiopian opals and Ceylon sapphires. Delivery with insured courier was under 5 days.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    jewelryType: 'Bespoke Atelier Supply',
  },
  {
    id: 'rev-4',
    clientName: 'Dr. Anandvardhan Verma',
    location: 'Jaipur & Delhi',
    rating: 5,
    date: 'November 2025',
    verifiedPurchase: 'Astrological Unheated Yellow Sapphire & Ruby',
    quote:
      'For Vedic astrology, natural unheated purity is paramount. The team gave complete testing certificates from GTL Jaipur, showing zero thermal treatment. Exceptional honesty in a market filled with synthetic glass treatments.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    jewelryType: 'Vedic Talisman Rings',
  },
];

export const MILESTONES = [
  { label: 'Years of Jaipur Heritage', value: '18+' },
  { label: 'Carats of Opals Sourced', value: '85,000+' },
  { label: 'Global Clients Worldwide', value: '14,500+' },
  { label: 'Independent Certifications', value: '100%' },
];

export const CERTIFICATION_LABS = [
  {
    name: 'GIA',
    fullName: 'Gemological Institute of America',
    description: 'World benchmark for colored stone identification & origin verification.',
  },
  {
    name: 'IGI',
    fullName: 'International Gemological Institute',
    description: 'Premier lab certification for diamond & fine colored gemstone grading.',
  },
  {
    name: 'GTL Jaipur',
    fullName: 'Gem Testing Laboratory (GJEPC Jaipur)',
    description: 'India’s most authoritative governmental gem testing authority in Rajasthan.',
  },
  {
    name: 'SGL',
    fullName: 'Solitaire Gemological Laboratories',
    description: 'International grading service for bespoke gemstone & jewelry authentication.',
  },
];

export const OPAL_FIRE_PATTERNS = [
  {
    name: 'Harlequin Pattern',
    rarity: 'Ultra Rare (<1%)',
    description: 'Mosaic-like square or diamond patches of brilliant color that shift like stained glass.',
    colorAccent: '#FF4D6D',
  },
  {
    name: 'Honeycomb Pattern',
    rarity: 'Very Rare (~3%)',
    description: 'Distinct hexagonal cellular network resembling natural bee honeycomb with intense fire cores.',
    colorAccent: '#F59E0B',
  },
  {
    name: 'Pinfire Pattern',
    rarity: 'Classic (~25%)',
    description: 'Tiny, pinpoint specks of vivid color flashing dynamically in constellation clusters.',
    colorAccent: '#10B981',
  },
  {
    name: 'Rolling Flash / Broadflash',
    rarity: 'Sought After (~15%)',
    description: 'Broad sheets of undulating light that roll smoothly across the cabochon curvature as tilted.',
    colorAccent: '#3B82F6',
  },
];
