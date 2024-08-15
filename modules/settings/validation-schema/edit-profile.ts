import { z } from 'zod';

export const editProfileFormSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  pronouns: z.string(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(64, 'Bio must not exceed 64 characters').optional(),
  xLink: z.string().url('Invalid URL').optional(),
  instagramLink: z.string().url('Invalid URL').optional(),
  linkedinLink: z.string().url('Invalid URL').optional(),
});
