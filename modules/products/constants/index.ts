import ProductImage from './../../../assets/images/image.png';
import CakeImage from './../../../assets/images/cakecream.png';
import CheeseCake from './../../../assets/images/cheesecake.png';

export { ProductImage, CakeImage, CheeseCake };

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
