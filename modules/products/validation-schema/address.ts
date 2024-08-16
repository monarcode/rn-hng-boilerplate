import { z } from 'zod';

export const createAddressSchema = z.object({
  address: z.string().min(5, 'enter a valid address '),
});
