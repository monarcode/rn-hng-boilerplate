/**
 * Interface defining the properties for currency formatting options.
 */
interface CurrencyFormatterProps {
  currency?: string | undefined; // Currency code, e.g., NGN for Nigerian Naira or USD for US Dollar.
  currencyDisplay?: 'symbol' | 'narrowSymbol' | 'code' | 'name'; // How to display the currency in format.
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact'; // Notation to use in formatting.
}

/**
 * Default options for currency formatting.
 */
const defaultOptions: CurrencyFormatterProps = {
  currency: 'USD', // Default currency code.
  currencyDisplay: 'symbol', // Default display as full name.
  notation: undefined, // Default notation, let Intl decide based on value.
};

/**
 * Formats a number or string to a specified currency format.
 *
 * @param value The numeric value to format as a string or number.
 * @param opts (Optional) Custom formatting options to override default settings.
 * @returns Formatted currency string.
 */
export const currency = (
  value: string | number,
  opts: CurrencyFormatterProps = defaultOptions
): string => {
  // Merge user options with default options
  const options = { ...defaultOptions, ...opts };

  // Create Intl.NumberFormat instance with merged options
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: options.currency,
    currencyDisplay: options.currencyDisplay,
    notation: options.notation,
  });

  // Format and return the value
  return formatter.format(Number(value));
};
