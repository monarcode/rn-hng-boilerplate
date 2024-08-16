export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export const stateCityMapping: Record<string, string[]> = {
  'New York': ['New York City', 'Buffalo', 'Rochester'],
  California: ['Los Angeles', 'San Francisco', 'San Diego'],
  Texas: ['Houston', 'Dallas', 'Austin'],
  Florida: ['Miami', 'Orlando', 'Tampa'],
  Illinois: ['Chicago', 'Springfield', 'Naperville'],
};

export function convertImageToArray(image: string | undefined): string[] {
  if (!image) return [];
  return [image];
}

export const createUniqueId = (productName: string, productId: string): string => {
  const firstName = productName.split(' ')[0];

  const firstTwo = productId.substring(0, 2);
  const lastTwo = productId.slice(-2);

  return `${firstName}${firstTwo}${lastTwo}`;
};
