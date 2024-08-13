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
  title: string;
}

interface Review {
  user: string; // Username of the reviewer
  rating: number; // Rating given by the reviewer
  comment: string; // Comment provided by the reviewer
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fc6b8d1 (Add product details feature)
interface ProductData {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
<<<<<<< HEAD
  category: string;
  images: string | null | string[]; // An image can be a single URL, null, or an array of URLs
  price: number;
  cost_price: number;
  quantity: number;
  size: string;
  stock_status: string;
  deletedAt: string | null;
}

interface ProductContentProps extends TitleProps {
  data: ProductData;
<<<<<<< HEAD
<<<<<<< HEAD
=======
interface ProductDetailsProps {
  id: string; // Product ID, using string as per the JSON structure
  name: string; // Name of the product
  price: number; // Price of the product
  description: string; // Detailed description of the product
  images: string[]; // Array of image URLs
  reviews: Review[]; // Array of reviews
=======
>>>>>>> fc6b8d1 (Add product details feature)
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
<<<<<<< HEAD
  data: ProductDetailsProps;
>>>>>>> 36f173b (Add product details ui screen implementation)
=======
  data: ProductData;
>>>>>>> fc6b8d1 (Add product details feature)
=======
  title: 'user' | 'Organizational'; // Added title property with specific union types
>>>>>>> 9508895 (implement product details ui and update related components)
=======
>>>>>>> b705a1b (implemented new changes made on the ui design)
}

interface ProductDetailProps extends TitleProps {}
