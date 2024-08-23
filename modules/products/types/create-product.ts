import { z } from 'zod';

import { createProductSchema } from '../validation-schema/create-product';

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export type ProductDetailType = {
  category: string;
  description: string;
  name: string;
  price: string;
  quantity: string;
};
