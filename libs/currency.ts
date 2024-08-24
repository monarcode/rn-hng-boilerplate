interface CurrencyFormatterProps {
  currency?: string;
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
  notation?: 'standard' | 'compact';
  maximumFractionDigits?: number;
}

const defaultOptions: CurrencyFormatterProps = {
  currency: 'USD',
  currencyDisplay: 'symbol',
  notation: 'standard',
  maximumFractionDigits: 2,
};

const currencySymbols: { [key: string]: string } = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

const compactFormat = (value: number): string => {
  if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
  if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
  return value.toString();
};

const formatWithCommas = (value: number, maximumFractionDigits: number = 2): string => {
  const parts = value.toFixed(maximumFractionDigits).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

/**
 * format number to currency display
 *
 * @param value
 * @param opts
 * @returns
 *
 * @example
 * console.log('Test 1:', currency(5000)); // Basic use
 * console.log('Test 2:', currency(5000000)); // Large number, standard notation
 * console.log('Test 3:', currency(5000, { notation: 'compact' }));
 * console.log('Test 4:', currency(5000000, { notation: 'compact' }));
 * console.log('Test 5:', currency(1234567.89, { maximumFractionDigits: 2 }));
 * console.log('Test 6:', currency(1234567.89, { currency: 'EUR' }));
 */
export const currency = (
  value: string | number,
  opts: Partial<CurrencyFormatterProps> = {}
): string => {
  const options = { ...defaultOptions, ...opts };
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  let formattedValue: string;

  if (options.notation === 'compact') {
    formattedValue = compactFormat(numericValue);
  } else {
    formattedValue = formatWithCommas(numericValue, options.maximumFractionDigits);
  }

  const symbol = currencySymbols[options.currency || 'USD'] || '$';

  return `${symbol}${formattedValue}`;
};
