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

interface ProductDetailsProps {
  id: string; // Product ID, using string as per the JSON structure
  name: string; // Name of the product
  price: number; // Price of the product
  description: string; // Detailed description of the product
  images: string[]; // Array of image URLs
  reviews: Review[]; // Array of reviews
  category: string;
  dateTime: DateTime;
  stock: number;
  productId: string;
}

declare interface ProductContentProps {
  data: ProductDetailsProps;
}
