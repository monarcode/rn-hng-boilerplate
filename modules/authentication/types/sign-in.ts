import { z } from 'zod';

import { signInFormSchema } from '../validation-schema/sign-in';

export type SigninFormSchema = z.infer<typeof signInFormSchema>;
