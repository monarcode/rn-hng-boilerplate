import { z } from 'zod';

export const organisationSignupFormSchema = z.object({
  name: z.string().min(1, "Company's name is required"),
  email: z.string().min(1, "Company's email address is required").email('Invalid email address'),
  description: z.string().min(1, 'Description is required'),
  industry: z.string().min(1, 'Industry selection is required'),
  type: z.string().min(1, 'Organisation type is required'),
  country: z.string().min(1, 'Country selection is required'),
  state: z.string().min(1, "Company's state is required"),
});
