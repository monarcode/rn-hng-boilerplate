import { ProductProps } from '~/components/product-list/types';

export type CreateProductResponse = {
  message: string;
  error: string;
  status_code: number;
};

export type GetProductResponse = {
  message: string;
  status_code: number;
  data: ProductProps[];
};
