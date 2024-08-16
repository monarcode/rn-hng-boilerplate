import { ProductDetails } from './../constants/index';
import { HeaderHero } from '~/modules/products/components/HeaderHero';

interface TitleProps {
  title: 'user' | 'Organizational'; // Specific union types for title property
}

interface HeaderProps {
  menu: () => void; // Function triggered when the menu button is pressed
  search: () => void; // Function triggered when the search button is pressed
  notification: () => void; // Function triggered when the notification button is pressed
}

interface DateTime {
  date: string; // e.g., '2024-08-12'
  time: string; // e.g., '14:30:00'
}

interface HeaderHeroProps {
  goback: () => void; // Function triggered when the Chevron-Left button is pressed
  title: string; // Title of the hero section
}

interface Review {
  user: string; // Username of the reviewer
  rating: number; // Rating given by the reviewer
  comment: string; // Comment provided by the reviewer
}

interface ProductData {
  products: any;
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  category: string;
  images: string | null | string[]; // An image can be a single URL, null, or an array of URLs
  price: number;
  cost_price: number;
  quantity: number;
  size: string;
  stock_status: string;
  deletedAt: string | null;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string; // ISO date string
  updated_at: string | null; // ISO date string or null
  image: string; // URL string
  quantity: number;
  size: string;
  status: string;
  cost_price: number;
  delete_at: string | null; // ISO date string or null
}
interface ProductContentProps extends TitleProps {
  data: Product;
}

interface ProductDetailProps extends TitleProps {}
