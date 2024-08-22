import { z } from 'zod';

export const editProfileFormSchema = z.object({
  user_name: z.string().min(3, 'Username must be at least 3 characters'),
  bio: z.string().max(64, 'Bio must not exceed 64 characters').optional(),
});
