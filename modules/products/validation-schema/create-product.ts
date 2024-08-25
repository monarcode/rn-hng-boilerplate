import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().max(72, 'Description must not exceed 72 characters').optional(),
  category: z.string().min(3, 'Select a category'),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to one decimal place'),
  quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid whole number'),
});
