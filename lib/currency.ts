export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to INR
  name: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1, name: 'Indian Rupee' },
  USD: { code: 'USD', symbol: '$', rate: 0.0117, name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.0110, name: 'Euro' },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.0430, name: 'UAE Dirham' },
};

export function formatPrice(inrAmount: number, currency: CurrencyCode = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = inrAmount * config.rate;

  if (currency === 'INR') {
    return `${config.symbol}${inrAmount.toLocaleString('en-IN')}`;
  }

  return `${config.symbol}${Math.round(converted).toLocaleString('en-US')}`;
}
