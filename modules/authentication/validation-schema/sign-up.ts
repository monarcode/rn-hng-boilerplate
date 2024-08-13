import { z } from 'zod';

export const signUpFormSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  first_name: z.string().min(3, 'First name must be at least 3 characters'),
  last_name: z.string().min(3, 'Last name must be at least 3 characters'),
});
