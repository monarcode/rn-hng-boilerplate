import { z } from 'zod';

export const organisationSignupFormSchema = z.object({
  company_name: z.string().min(3, 'Company name must be at least 3 characters'),
  company_email: z.string().email('Please enter a valid email'),
  industry: z.string().array().nonempty('You must select an industry'),
  organisation_type: z.string().array().nonempty('You must select a company type'),
  country: z.string().array().nonempty('You must select a country'),
  state: z.string().array().nonempty('You must select a state'),
  address: z.string().min(3, 'Address must be at least 3 characters'),
  lga: z.string().array().nonempty('You must select a local govt.'),
});
