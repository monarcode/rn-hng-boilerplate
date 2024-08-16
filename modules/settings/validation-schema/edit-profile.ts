import { z } from 'zod';

export const editProfileFormSchema = z.object({
  user_name: z.string().min(3, 'Username must be at least 3 characters'),
  pronoun: z.string().optional(),
  job_title: z.string().optional(),
  department: z.string().optional(),
  bio: z.string().max(64, 'Bio must not exceed 64 characters').optional(),
  twitter_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  facebook_link: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin_link: z.string().url('Invalid URL').optional().or(z.literal('')),
});
