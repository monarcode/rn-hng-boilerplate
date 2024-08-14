import { z } from 'zod';

import { forgotPasswordSchema } from '../validation-schema/forgot-password';

export type forgotpasswordSchema = z.infer<typeof forgotPasswordSchema>;
