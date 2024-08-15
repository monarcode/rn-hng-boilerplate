import { ProductProps } from "~/components/product-list/types";


export type CreateProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  updated_at: string;
};


export type GetProductResponse={
  message:string,
  status_code:number,
  data:ProductProps[]
}

