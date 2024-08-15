import { z } from 'zod';
import { createProductSchema } from '../validation-schema/create-product';

export type CreateProductSchema = z.infer<typeof createProductSchema>;
