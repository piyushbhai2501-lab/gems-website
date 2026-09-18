export const COMPANY_INFO = {
  name: 'Ethiopian Gems',
  tagline: 'Rare Ethiopian Opals & Precious Gemstones of Jaipur',
  subTagline: 'Curated direct from Ethiopian mines, cut with generational lapidary mastery in Badi Chaupar, Jaipur.',
  phoneDisplay: '+91 82095 44682',
  phoneClean: '+918209544682',
  whatsappUrl: 'https://wa.me/918209544682',
  email: 'inquiry@ethiopiangemsjaipur.com',
  address: {
    floor: '1st Floor, H.No. 4477, Jamali Mension',
    landmark: 'Opp Masjid Sheikhan, Shikhariyo Ka Khurra',
    area: 'Handi Pura, Badi Chaupar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302003',
    country: 'India',
    fullFormatted:
      '1st Floor, H.No. 4477, Jamali Mension, Opp Masjid Sheikhan, Shikhariyo Ka Khurra, Handi Pura, Badi Chaupar, Jaipur, Rajasthan 302003, India',
  },
  businessHours: {
    weekdays: 'Monday – Saturday: 11:00 AM – 8:00 PM',
    sunday: 'Sunday: Closed',
    summary: 'Mon–Sat 11:00 AM – 8:00 PM | Sun Closed',
    daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    openHour: 11,
    closeHour: 20,
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    googleMaps: 'https://maps.google.com/?q=Badi+Chaupar+Jaipur+Rajasthan+302003',
  },
};

export function isStoreCurrentlyOpen(): { isOpen: boolean; statusText: string } {
  try {
    // Check IST time (UTC + 5:30)
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istTime = new Date(utcTime + 3600000 * 5.5);

    const day = istTime.getDay(); // 0 is Sunday
    const hour = istTime.getHours();
    const minute = istTime.getMinutes();

    if (day === 0) {
      return { isOpen: false, statusText: 'Closed Today (Sunday)' };
    }

    const currentDecimal = hour + minute / 60;
    if (currentDecimal >= 11 && currentDecimal < 20) {
      return { isOpen: true, statusText: 'Open Now until 8:00 PM IST' };
    } else if (currentDecimal < 11) {
      return { isOpen: false, statusText: 'Opens at 11:00 AM IST' };
    } else {
      return { isOpen: false, statusText: 'Closed for today • Opens 11:00 AM' };
    }
  } catch {
    return { isOpen: true, statusText: 'Mon–Sat: 11 AM – 8 PM IST' };
  }
}
