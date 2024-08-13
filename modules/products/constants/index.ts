import ProductImage from './../../../assets/images/image.png';
import CakeImage from './../../../assets/images/cakecream.png';
import CheeseCake from './../../../assets/images/cheesecake.png';
import { ProductData } from '../types';

export { ProductImage, CakeImage, CheeseCake };

export const ProductDetails: ProductData = {
  id: '1',
  created_at: '2024-08-12T14:30:00Z', // Example ISO date-time string
  updated_at: '2024-08-12T14:30:00Z', // Example ISO date-time string
  name: 'Product 01',
  description:
    'A fusion of ripe bananas, pure honey, and succulent raspberries with our bread. Crafted to perfection.',
  category: 'Appetizers',
  images: [ProductImage, CakeImage, CheeseCake], // Array of images
  price: 29,
  cost_price: 20, // Example cost price
  quantity: 100,
  size: 'Medium', // Example size
  stock_status: 'In Stock', // Example stock status
  deletedAt: null, // Example deletedAt value
};

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
