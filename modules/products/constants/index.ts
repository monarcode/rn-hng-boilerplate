import ProductImage from './../../../assets/images/image.png';

export { ProductImage };

export const ProductDetails = {
  id: '1',
  name: 'Product 01',
  price: 29,
  description:
    'A fusion of ripe bananas, pure honey, and succulent raspberries with our bread. Crafted to perfection.',
  images: [ProductImage, ProductImage],
  reviews: [
    {
      user: 'User1',
      rating: 4,
      comment: 'Great product!',
    },
    {
      user: 'User2',
      rating: 5,
      comment: 'Exceeded expectations!',
    },
  ],
  category: 'Appetizers',
  dateTime: {
    date: '2024-08-12',
    time: '14:30:00',
  },
  stock: 100,
  productId: 'P002',
};

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
