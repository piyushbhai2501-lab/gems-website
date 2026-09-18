import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ethiopian Gems | Natural Ethiopian Opals & Fine Gemstones | Jaipur, India',
  description:
    'Ethiopian Gems is a luxury gemstone & jewelry house in Badi Chaupar, Jaipur, India. Direct purveyor of natural Ethiopian Welo Opals, Emeralds, Rubies, and bespoke handcrafted jewelry.',
  keywords: [
    'Ethiopian Opal Jaipur',
    'Gemstone Store Jaipur',
    'Precious Stones Jaipur',
    'Natural Ethiopian Welo Opal',
    'Badi Chaupar Gemstone Market',
    'Jaipur Gemstone Wholesale',
    'Custom Gemstone Jewelry India',
    'Certified Emerald Ruby Sapphire',
  ],
  authors: [{ name: 'Ethiopian Gems Jaipur' }],
  openGraph: {
    title: 'Ethiopian Gems | Natural Ethiopian Opals & Fine Gemstones | Jaipur',
    description:
      'Discover rare Ethiopian Opals with vibrant fire, fine emeralds, rubies, and handcrafted fine jewelry from the heart of Jaipur’s historic Badi Chaupar gem bazaar.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Ethiopian Gems',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethiopian Gems | Fine Gemstones & Ethiopian Opals Jaipur',
    description:
      'Direct sourcing of rare Ethiopian Opals, precious stones, and bespoke jewelry from Jaipur, India.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: 'Ethiopian Gems',
  image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
  '@id': 'https://ethiopiangemsjaipur.com',
  url: 'https://ethiopiangemsjaipur.com',
  telephone: '+918209544682',
  priceRange: '$$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, H.No. 4477, Jamali Mension, Opp Masjid Sheikhan, Shikhariyo Ka Khurra, Handi Pura, Badi Chaupar',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '302003',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 26.9239,
    longitude: 75.8267,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com',
    'https://www.facebook.com',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#07261D] text-[#FAF6EE] antialiased selection:bg-[#D4AF37] selection:text-[#07261D] min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
