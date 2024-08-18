export type ProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  updated_at: string;
  image: string;
  quantity: number;
  size: string;
  status: string;
  cost_price: number;
  delete_at: string;
};

export type CategoryProps = {
  name: string;
  products: ProductProps[];
};
