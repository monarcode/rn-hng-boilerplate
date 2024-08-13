import { HeaderHero } from '~/modules/products/components/HeaderHero';
declare interface HeaderProps {
  menu: () => void; // Function triggered when the menu button is pressed
  search: () => void; // Function triggered when the search button is pressed
  notification: () => void; // Function triggered when the notification button is pressed
}
interface DateTime {
  date: string; // e.g., '2024-08-12'
  time: string; // e.g., '14:30:00'
}

declare interface HeaderHeroProps {
  title: string;
  goback: () => void; // Function triggered when the Chevron-Left button is pressed
}

interface Review {
  user: string; // Username of the reviewer
  rating: number; // Rating given by the reviewer
  comment: string; // Comment provided by the reviewer
}

interface ProductData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  category: string;
  image: string | null;
  price: number;
  cost_price: number;
  quantity: number;
  size: string;
  stock_status: string;
  deletedAt: string | null;
}

declare interface ProductContentProps {
  data: ProductData;
}
