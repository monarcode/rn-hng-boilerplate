import { z } from 'zod';

import { signUpFormSchema } from '../validation-schema/sign-up';

export type SignupFormSchema = z.infer<typeof signUpFormSchema>;
